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
import LoadingScreen from "../component/loading-screen";
import { useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import useShowError from "../component/use-show-error";
import { Product } from "../graphql/graphql";
import { useToast } from "../use-toast";
import {
  FIND_MANY_PRODUCT_QUERY,
  REMOVE_PRODUCT_MUTATION
} from "./product-query";

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
          <InputText className="w-full" placeholder="Search products by name" />
        </FormField>
      </Form>
    </Card>
  );
};

const Table = ({
  value,
  onChange
}: {
  value: Product[];
  onChange: () => void;
}) => {
  const toastRef = useToast();

  const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT_MUTATION);

  useShowError(error);

  return (
    <DataTable
      value={value}
      paginator
      rows={10}
      emptyMessage="No products found"
    >
      <Column
        field="id"
        header="ID"
        sortable
        align="center"
        alignHeader="center"
      />
      <Column field="name" header="Name" sortable />
      <Column
        body={(rowData: Product) => (
          <ButtonColumn
            edit={{
              url: `/product/${rowData.id}`
            }}
            remove={{
              message: `Do you want to delete product ${rowData.name}?`,
              action: async () => {
                await removeProduct({
                  variables: { input: { id: rowData.id } }
                });

                toastRef.current?.show({
                  severity: "success",
                  summary: "Info",
                  detail: "Product removed with success!",
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

const ProductList = () => {
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(FIND_MANY_PRODUCT_QUERY);

  const handleSearch = async (filter?: { name: string }) => {
    await refetch(
      filter
        ? {
            input: {
              filter: {
                name: {
                  startsWith: filter.name
                }
              }
            }
          }
        : undefined
    );
  };

  useShowError(error);

  return (
    <>
      <Panel header="Products">
        <LoadingScreen loading={loading}>
          <div className="flex flex-col gap-5">
            <Button
              label="New Product"
              onClick={() => navigate("/product")}
              icon="pi pi-plus"
              className="self-start"
            />

            <SearchForm onChange={handleSearch} />

            <Table
              value={data?.products.results ?? []}
              onChange={handleSearch}
            />
          </div>
        </LoadingScreen>
      </Panel>
    </>
  );
};

export default ProductList;
