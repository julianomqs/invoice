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

  const getErrorMessage = () => {
    const error = errors[name];

    if (!error) {
      return null;
    }

    if ("message" in error) {
      return error.message as string;
    }

    const nestedError = Object.values(error)[0];

    if (
      nestedError &&
      typeof nestedError === "object" &&
      "message" in nestedError
    ) {
      return (nestedError as { message?: string }).message ?? null;
    }

    return null;
  };

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
      {errors[name] && <small className="p-error">{getErrorMessage()}</small>}
    </div>
  );
};

export default FormField;
