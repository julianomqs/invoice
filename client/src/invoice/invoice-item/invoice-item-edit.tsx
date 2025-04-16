import { Button } from "primereact/button";
import { Path, UseFormReturn } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";
import ButtonBar from "../../component/button-bar";
import { GraphqlAutoComplete, InputNumber } from "../../component/component";
import Form from "../../component/form";
import FormField from "../../component/form-field";
import { InvoiceItem } from "../../graphql/graphql";
import useForm from "../../component/use-form";
import { useState } from "react";
import { FIND_MANY_PRODUCT_QUERY } from "../../product/product-query";
import { useLazyQuery } from "../../component/use-apollo";

const InvoiceItemEdit = ({
  value,
  onChange,
  onCancel
}: {
  value?: InvoiceItem;
  onChange: (
    value: InvoiceItem,
    submitButton: string,
    fieldToFocus: Path<InvoiceItem>,
    form: UseFormReturn<InvoiceItem>
  ) => void;
  onCancel: () => void;
}) => {
  const schema = z.object({
    id: z.string(),
    product: z.object({ id: z.string(), name: z.string() }),
    amount: z.number(),
    unitValue: z.number()
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    values: value,
    defaultValues: {
      id: value?.id ?? uuidv7(),
      product: undefined,
      amount: undefined,
      unitValue: undefined
    },
    schema
  });

  const [submitButton, setSubmitButton] = useState("");

  const [findManyProduct] = useLazyQuery(FIND_MANY_PRODUCT_QUERY);

  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit((data) =>
        onChange(
          data as InvoiceItem,
          submitButton,
          "product",
          form as unknown as UseFormReturn<InvoiceItem>
        )
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <FormField name="product" label="Product">
              <GraphqlAutoComplete
                className="w-full"
                query={(query) =>
                  findManyProduct({
                    variables: {
                      input: {
                        filter: {
                          name: {
                            startsWith: query
                          }
                        }
                      }
                    }
                  })
                }
                field="name"
              />
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <FormField name="amount" label="Amount">
              <InputNumber className="w-full" />
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <FormField name="unitValue" label="Unit value">
              <InputNumber className="w-full" />
            </FormField>
          </div>
        </div>

        <ButtonBar>
          <Button
            label="Save"
            type="submit"
            onClick={() => setSubmitButton("save")}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          />
          <Button
            label="Save and create"
            type="submit"
            onClick={() => setSubmitButton("create")}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            outlined
          />
          <Button
            label="Cancel"
            type="button"
            onClick={onCancel}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            outlined
          />
        </ButtonBar>
      </div>
    </Form>
  );
};

export default InvoiceItemEdit;
