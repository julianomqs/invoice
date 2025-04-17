import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import ButtonBar from "../component/button-bar";
import ButtonColumn from "../component/button-column";
import { DateRange, InputText } from "../component/component";
import Form from "../component/form";
import FormField from "../component/form-field";
import { useLazyQuery, useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import useReport from "../component/use-report";
import { FindInvoiceFilter, Invoice } from "../graphql/graphql";
import { useToast } from "../use-toast";
import {
  FIND_MANY_INVOICE_QUERY,
  GENERATE_INVOICE_REPORT_QUERY,
  REMOVE_INVOICE_MUTATION
} from "./invoice-query";

interface SearchFilter {
  dateTime?: { start: Date; end: Date };
  name?: string;
}

const SearchForm = ({
  onChange
}: {
  onChange: (filter: SearchFilter) => void;
}) => {
  const schema = z.object({
    dateTime: z.object({ start: z.date(), end: z.date() }).optional(),
    name: z.string().max(255).optional()
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: { dateTime: undefined, name: "" },
    schema
  });

  const onSubmit = form.handleSubmit(onChange);

  return (
    <Card>
      <Form form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <FormField name="dateTime" label="DateTime">
                <DateRange className="w-full" />
              </FormField>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <FormField name="name" label="Name">
                <InputText
                  className="w-full"
                  placeholder="Search invoices by customer name"
                />
              </FormField>
            </div>
          </div>

          <ButtonBar>
            <Button
              label="Find"
              type="submit"
              icon="pi pi-search"
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
              outlined
            />
          </ButtonBar>
        </div>
      </Form>
    </Card>
  );
};

const Table = ({
  value,
  onChange
}: {
  value: Invoice[];
  onChange: () => void;
}) => {
  const toastRef = useToast();

  const [removeInvoice] = useMutation(REMOVE_INVOICE_MUTATION);

  return (
    <DataTable
      value={value}
      paginator
      rows={10}
      emptyMessage="No invoices found"
    >
      <Column
        field="id"
        header="ID"
        sortable
        align="center"
        alignHeader="center"
      />
      <Column
        field="dateTime"
        header="DateTime"
        sortable
        body={(rowData: Invoice) =>
          rowData.dateTime.toLocaleDateString("pt-BR")
        }
      />
      <Column field="customer.name" header="Customer" sortable />
      <Column
        body={(rowData: Invoice) => (
          <ButtonColumn
            edit={{
              url: `/invoice/${rowData.id}`
            }}
            remove={{
              message: `Do you want to delete invoice ${rowData.id}?`,
              action: async () => {
                await removeInvoice({
                  variables: { input: { id: rowData.id } }
                });

                toastRef.current.show({
                  severity: "success",
                  summary: "Info",
                  detail: "Invoice removed with success!",
                  life: 5000
                });

                onChange();
              }
            }}
          />
        )}
      />
    </DataTable>
  );
};

const InvoiceList = () => {
  const toastRef = useToast();

  const navigate = useNavigate();

  const { data, refetch } = useQuery(FIND_MANY_INVOICE_QUERY);

  const [filter, setFilter] = useState<SearchFilter>();

  const setReport = useReport("invoice");

  const [generateInvoiceReport] = useLazyQuery(GENERATE_INVOICE_REPORT_QUERY);

  const handleSearch = async (searchFilter?: SearchFilter) => {
    setFilter(searchFilter);

    const filter: FindInvoiceFilter = {};

    if (searchFilter?.dateTime) {
      filter.dateTime = { between: searchFilter.dateTime };
    }

    if (searchFilter?.name) {
      filter.customer_name = { startsWith: searchFilter.name };
    }

    await refetch({ input: { filter } });
  };

  return (
    <>
      <Panel header="Invoices">
        <div className="flex flex-col gap-5">
          <Button
            label="New Invoice"
            onClick={() => navigate("/invoice")}
            icon="pi pi-plus"
            className="self-start"
          />

          <SearchForm onChange={handleSearch} />

          <Button
            label="Generate report"
            onClick={async () => {
              const { data } = await generateInvoiceReport({
                variables: filter ? { input: filter } : undefined
              });

              if (data?.report.report) {
                setReport(data.report.report);
              } else {
                toastRef.current.show({
                  severity: "warn",
                  summary: "Aviso",
                  detail: "Sem dados para emitir!",
                  life: 5000
                });
              }
            }}
            icon="pi pi-file"
            className="self-start"
            outlined
          />

          <Table
            value={(data?.invoices.results ?? []) as Invoice[]}
            onChange={handleSearch}
          />
        </div>
      </Panel>
    </>
  );
};

export default InvoiceList;
