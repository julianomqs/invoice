import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import ButtonBar from "../component/button-bar";
import { InputText } from "../component/component";
import Form from "../component/form";
import FormField from "../component/form-field";
import LoadingScreen from "../component/loading-screen";
import { useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import { useToast } from "../use-toast";
import {
  CREATE_CUSTOMER_MUTATION,
  FIND_ONE_CUSTOMER_QUERY,
  UPDATE_CUSTOMER_MUTATION
} from "./customer-query";

const CustomerForm = () => {
  const schema = z.object({
    name: z
      .string()
      .max(255)
      .superRefine((val, ctx) => {
        if (val.trim().length === 0) {
          ctx.addIssue({ code: "custom", message: "Required" });
        }
      }),
    document: z
      .string()
      .max(255)
      .superRefine((val, ctx) => {
        if (val.trim().length === 0) {
          ctx.addIssue({ code: "custom", message: "Required" });
        }
      })
  });

  type FormData = z.infer<typeof schema>;

  const navigate = useNavigate();

  const toastRef = useToast();

  const params = useParams();

  const { loading, error, data } = useQuery(FIND_ONE_CUSTOMER_QUERY, {
    variables: {
      input: { filter: { id: { eq: params.id as string } } }
    },
    skip: !params.id
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION);

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER_MUTATION);

  useEffect(() => {
    if (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load customer",
        life: 5000
      });
    }
  }, [error, toastRef]);

  const [submitButton, setSubmitButton] = useState("");

  const form = useForm<FormData>({
    values: data?.customer as FormData,
    defaultValues: { name: "", document: "" },
    schema
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateCustomer({
          variables: { input: { id: params.id, ...data } }
        });
      } else {
        await createCustomer({
          variables: { input: data }
        });
      }

      toastRef.current?.show({
        severity: "success",
        summary: "Info",
        detail: `Customer ${params.id ? "updated" : "created"} with success!`,
        life: 5000
      });

      if (submitButton === "save") {
        navigate("/customers");
      } else {
        form.reset();
        form.setFocus("name");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error saving the customer";

      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 5000
      });
    }
  });

  return (
    <LoadingScreen loading={loading}>
      <Form form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <FormField name="name" label="Name">
                <InputText className="w-full" />
              </FormField>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-2">
              <FormField name="document" label="Document">
                <InputText className="w-full" />
              </FormField>
            </div>
          </div>

          <ButtonBar>
            <Button
              name="save"
              label="Save"
              type="submit"
              onClick={() => setSubmitButton("save")}
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
            />

            {!params.id && (
              <Button
                name="create"
                label="Save and create"
                type="submit"
                onClick={() => setSubmitButton("create")}
                disabled={form.formState.isSubmitting}
                loading={form.formState.isSubmitting}
                outlined
              />
            )}

            <Button
              label="Cancel"
              type="button"
              onClick={() => navigate("/customers")}
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
              outlined
            />
          </ButtonBar>
        </div>
      </Form>
    </LoadingScreen>
  );
};

const CustomerEdit = () => {
  const params = useParams();

  return (
    <Panel header={params.id ? `Customer ${params.id}` : "New Customer"}>
      <CustomerForm />
    </Panel>
  );
};

export default CustomerEdit;
