import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import ButtonColumn from "../component/button-column";
import { InputText } from "../component/component";
import Form from "../component/form";
import FormField from "../component/form-field";
import { useLazyQuery, useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import useReport from "../component/use-report";
import { Invoice } from "../graphql/graphql";
import { useToast } from "../use-toast";
import {
  FIND_MANY_INVOICE_QUERY,
  GENERATE_INVOICE_REPORT_QUERY,
  REMOVE_INVOICE_MUTATION
} from "./invoice-query";

const SearchForm = ({
  onChange
}: {
  onChange: (data: { name: string }) => void;
}) => {
  const schema = z.object({
    name: z.string().max(255)
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: { name: "" },
    schema
  });

  const debouncedSubmit = useDebouncedCallback(() => {
    form.handleSubmit((data: FormData) => onChange(data))();
  }, 300);

  const nameValue = form.watch("name");

  useEffect(() => {
    debouncedSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue]);

  return (
    <Card>
      <Form form={form}>
        <FormField name="name" label="Name">
          <InputText
            className="w-full"
            placeholder="Search invoices by customer name"
          />
        </FormField>
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

  const [filter, setFilter] = useState<{ name: string }>();

  const setReport = useReport("invoice");

  const [generateInvoiceReport] = useLazyQuery(GENERATE_INVOICE_REPORT_QUERY);

  const handleSearch = async (filter?: { name: string }) => {
    if (filter?.name) {
      setFilter({ name: filter.name });
    }

    await refetch(
      filter
        ? {
            input: {
              filter: {
                customer_name: {
                  startsWith: filter.name
                }
              }
            }
          }
        : undefined
    );
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
