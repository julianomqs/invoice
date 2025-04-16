import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

const useSubrecordTab = <T extends FieldValues>(
  value: T[],
  onChange: (value: T[]) => void,
  {
    customAddFn,
    customValidateFn = () => true
  }: {
    customAddFn?: (value: T[], values: T) => T[];
    customValidateFn?: (
      value: T[],
      values: T,
      form: UseFormReturn<T>
    ) => boolean;
  } = {}
) => {
  const [record, setRecord] = useState<T>();
  const [pos, setPos] = useState<number>();
  const [mode, setMode] = useState("list");

  return {
    record,
    mode,
    onNew: () => {
      setRecord(undefined);
      setPos(undefined);
      setMode("edit");
    },
    onEdit: (value: T, index: number) => {
      setRecord(value);
      setPos(index);
      setMode("edit");
    },
    onEditChange: (
      values: T,
      submitButton: string,
      fieldToFocus: Path<T>,
      form: UseFormReturn<T>
    ) => {
      let newValue = [...value];

      if (customValidateFn(value, values, form)) {
        if (pos === undefined) {
          newValue = customAddFn
            ? customAddFn(newValue, values)
            : [...newValue, values];
        } else {
          newValue[pos] = values;
        }

        onChange(newValue);

        if (submitButton === "save") {
          setMode("list");
        } else {
          form.reset();
          form.setFocus(fieldToFocus);
        }
      }
    },
    onCancel: () => setMode("list"),
    onRemove: (index: number) => {
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange(newValue);
    }
  };
};

export default useSubrecordTab;
