import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";

const FormField = ({
  name,
  label,
  children
}: {
  name: string;
  label: string;
  children: ReactNode;
}) => {
  const {
    formState: { errors }
  } = useFormContext();

  const id = uuidv7();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      {isValidElement(children) &&
        cloneElement(
          children as ReactElement<{
            id: string;
            name: string;
            invalid: boolean;
          }>,
          {
            id,
            name,
            invalid: Boolean(errors[name])
          }
        )}
      {errors[name] && (
        <small className="p-error">{errors[name].message as string}</small>
      )}
    </div>
  );
};

export default FormField;
