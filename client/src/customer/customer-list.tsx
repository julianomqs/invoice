import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import ButtonColumn from "../component/button-column";
import { InputText } from "../component/component";
import Form from "../component/form";
import FormField from "../component/form-field";
import { useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import { Customer } from "../graphql/graphql";
import { useToast } from "../use-toast";
import {
  FIND_MANY_CUSTOMER_QUERY,
  REMOVE_CUSTOMER_MUTATION
} from "./customer-query";

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
            placeholder="Search customers by name or document"
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
  value: Customer[];
  onChange: () => void;
}) => {
  const toastRef = useToast();

  const [removeCustomer] = useMutation(REMOVE_CUSTOMER_MUTATION);

  return (
    <DataTable
      value={value}
      paginator
      rows={10}
      emptyMessage="No customers found"
    >
      <Column
        field="id"
        header="ID"
        sortable
        align="center"
        alignHeader="center"
      />
      <Column field="name" header="Name" sortable />
      <Column field="document" header="Document" sortable />
      <Column
        body={(rowData: Customer) => (
          <ButtonColumn
            edit={{
              url: `/customer/${rowData.id}`
            }}
            remove={{
              message: `Do you want to delete customer ${rowData.name}?`,
              action: async () => {
                await removeCustomer({
                  variables: { input: { id: rowData.id } }
                });

                toastRef.current.show({
                  severity: "success",
                  summary: "Info",
                  detail: "Customer removed with success!",
                  life: 5000
                });

                onChange();
              }
            }}
          />
        )}
        align="center"
        alignHeader="center"
      />
    </DataTable>
  );
};

const CustomerList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useQuery(FIND_MANY_CUSTOMER_QUERY);

  const handleSearch = async (filter?: { name: string }) => {
    await refetch(
      filter
        ? {
            input: {
              filter: {
                or: [
                  {
                    name: {
                      startsWith: filter.name
                    }
                  },
                  {
                    document: {
                      startsWith: filter.name
                    }
                  }
                ]
              }
            }
          }
        : undefined
    );
  };

  return (
    <>
      <Panel header="Customers">
        <div className="flex flex-col gap-5">
          <Button
            label="New Customer"
            onClick={() => navigate("/customer")}
            icon="pi pi-plus"
            className="self-start"
          />

          <SearchForm onChange={handleSearch} />

          <Table
            value={data?.customers.results ?? []}
            onChange={handleSearch}
          />
        </div>
      </Panel>
    </>
  );
};

export default CustomerList;
