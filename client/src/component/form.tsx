import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
} & React.FormHTMLAttributes<HTMLFormElement>;

const Form = <T extends FieldValues>({ form, ...props }: FormProps<T>) => (
  <FormProvider {...form}>
    <form {...props} />
  </FormProvider>
);

export default Form;
