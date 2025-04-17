import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import ButtonBar from "../component/button-bar";
import { InputText } from "../component/component";
import Form from "../component/form";
import FormField from "../component/form-field";
import { useMutation, useQuery } from "../component/use-apollo";
import useForm from "../component/use-form";
import { useToast } from "../use-toast";
import {
  CREATE_PRODUCT_MUTATION,
  FIND_ONE_PRODUCT_QUERY,
  UPDATE_PRODUCT_MUTATION
} from "./product-query";

const ProductForm = () => {
  const schema = z.object({
    name: z
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

  const { data } = useQuery(FIND_ONE_PRODUCT_QUERY, {
    variables: {
      input: { filter: { id: { eq: params.id as string } } }
    },
    skip: !params.id
  });

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  const [submitButton, setSubmitButton] = useState("");

  const form = useForm<FormData>({
    values: data?.product as FormData,
    defaultValues: { name: "" },
    schema
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateProduct({
          variables: { input: { id: params.id, ...data } }
        });
      } else {
        await createProduct({
          variables: { input: data }
        });
      }

      toastRef.current.show({
        severity: "success",
        summary: "Info",
        detail: `Product ${params.id ? "updated" : "created"} with success!`,
        life: 5000
      });

      if (submitButton === "save") {
        navigate("/products");
      } else {
        form.reset();
        form.setFocus("name");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error saving the product";

      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 5000
      });
    }
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <FormField name="name" label="Name">
              <InputText className="w-full" />
            </FormField>
          </div>
        </div>

        <ButtonBar>
          <Button
            name="save"
            label="Save"
            type="submit"
            icon="pi pi-save"
            onClick={() => setSubmitButton("save")}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          />

          {!params.id && (
            <Button
              name="create"
              label="Save and create"
              type="submit"
              icon="pi pi-file-plus"
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
            onClick={() => navigate("/products")}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            outlined
          />
        </ButtonBar>
      </div>
    </Form>
  );
};

const ProductEdit = () => {
  const params = useParams();

  return (
    <Panel header={params.id ? `Product ${params.id}` : "New Product"}>
      <ProductForm />
    </Panel>
  );
};

export default ProductEdit;
