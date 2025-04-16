import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import ButtonBar from "../component/button-bar";
import LoadingScreen from "../component/loading-screen";
import { useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import useShowError from "../component/use-show-error";
import useSubrecord from "../component/use-subrecord";
import { InvoiceItem } from "../graphql/graphql";
import { useToast } from "../use-toast";
import InvoiceItemTab from "./invoice-item/invoice-item-tab";
import {
  CREATE_INVOICE_MUTATION,
  FIND_ONE_INVOICE_QUERY,
  UPDATE_INVOICE_MUTATION
} from "./invoice-query";
import InvoiceTab from "./invoice-tab";

const InvoiceForm = () => {
  const navigate = useNavigate();

  const toastRef = useToast();

  const params = useParams();

  const [createInvoice] = useMutation(CREATE_INVOICE_MUTATION);

  const [updateInvoice] = useMutation(UPDATE_INVOICE_MUTATION);

  const { loading, error, data } = useQuery(FIND_ONE_INVOICE_QUERY, {
    variables: {
      input: { filter: { id: { eq: params.id as string } } }
    },
    skip: !params.id
  });

  const [items, setItems, itemsCreate, itemsUpdate, itemsRemove] = useSubrecord(
    data?.invoice?.items as InvoiceItem[],
    {
      createMapFn: ({ product, ...item }) => ({
        ...item,
        product: product.id
      }),
      updateMapFn: ({ product, ...item }) => ({ ...item, product: product.id })
    }
  );

  useShowError(error);

  const [submitButton, setSubmitButton] = useState("");

  const schema = z.object({
    dateTime: z.date(),
    customer: z.object({ id: z.string() })
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    values: data?.invoice as FormData,
    defaultValues: { dateTime: undefined, customer: undefined },
    schema
  });

  return (
    <LoadingScreen loading={loading}>
      <div className="flex flex-col gap-5">
        <TabView renderActiveOnly={false}>
          <TabPanel header="Invoice">
            <InvoiceTab
              form={form}
              onSubmit={async (data) => {
                try {
                  if (params.id) {
                    await updateInvoice({
                      variables: {
                        input: {
                          id: params.id,
                          dateTime: data.dateTime,
                          customer: data.customer.id,
                          items: {
                            create: itemsCreate(),
                            update: itemsUpdate(),
                            remove: itemsRemove()
                          }
                        }
                      }
                    });
                  } else {
                    await createInvoice({
                      variables: {
                        input: {
                          dateTime: data.dateTime,
                          customer: data.customer.id,
                          items: itemsCreate()
                        }
                      }
                    });
                  }

                  toastRef.current.show({
                    severity: "success",
                    summary: "Info",
                    detail: `Invoice ${
                      params.id ? "updated" : "created"
                    } with success!`,
                    life: 5000
                  });

                  if (submitButton === "save") {
                    navigate("/invoices");
                  } else {
                    form.reset();
                    form.setFocus("dateTime");
                    setItems([]);
                  }
                } catch (error) {
                  const message =
                    error instanceof Error
                      ? error.message
                      : "Error saving the invoice";

                  toastRef.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: message,
                    life: 5000
                  });
                }
              }}
            />
          </TabPanel>

          <TabPanel header="Items">
            <InvoiceItemTab
              value={items}
              onChange={(items) => setItems(items)}
            />
          </TabPanel>
        </TabView>

        <ButtonBar>
          <Button
            label="Save"
            type="submit"
            icon="pi pi-save"
            form="invoiceForm"
            onClick={() => setSubmitButton("save")}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          />

          {!params.id && (
            <Button
              label="Save and create"
              type="submit"
              icon="pi pi-file-plus"
              form="invoiceForm"
              onClick={() => setSubmitButton("create")}
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
              outlined
            />
          )}

          <Button
            label="Cancel"
            type="button"
            icon="pi pi-times"
            onClick={() => navigate("/invoices")}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            outlined
          />
        </ButtonBar>
      </div>
    </LoadingScreen>
  );
};

const InvoiceEdit = () => {
  const params = useParams();

  return (
    <Panel header={params.id ? `Invoice ${params.id}` : "New Invoice"}>
      <InvoiceForm />
    </Panel>
  );
};

export default InvoiceEdit;
