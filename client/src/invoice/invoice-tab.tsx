import { UseFormReturn } from "react-hook-form";
import { Calendar, GraphqlAutoComplete } from "../component/component";
import Form from "../component/form";
import FormField from "../component/form-field";
import { useLazyQuery } from "../component/use-apollo";
import { FIND_MANY_CUSTOMER_QUERY } from "../customer/customer-query";

const InvoiceTab = ({
  form,
  onSubmit
}: {
  form: UseFormReturn<{
    dateTime: Date;
    customer: {
      id: string;
    };
  }>;
  onSubmit: (value: {
    dateTime: Date;
    customer: {
      id: string;
    };
  }) => void;
}) => {
  const [findManyCustomer] = useLazyQuery(FIND_MANY_CUSTOMER_QUERY);

  return (
    <Form id="invoiceForm" form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <FormField name="dateTime" label="DateTime">
              <Calendar className="w-full" />
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <FormField name="customer" label="Customer">
              <GraphqlAutoComplete
                className="w-full"
                query={(query) =>
                  findManyCustomer({
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
      </div>
    </Form>
  );
};

export default InvoiceTab;
