/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete, AutoCompleteProps } from "primereact/autocomplete";
import {
  CalendarProps,
  Calendar as PrimeReactCalendar
} from "primereact/calendar";
import {
  InputNumberProps,
  InputNumber as PrimeReactInputNumber
} from "primereact/inputnumber";
import {
  InputTextProps,
  InputText as PrimeReactInputText
} from "primereact/inputtext";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const InputText = (props: InputTextProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name as string}
      control={control}
      render={({ field }) => <PrimeReactInputText {...props} {...field} />}
    />
  );
};

export const Calendar = (props: CalendarProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name as string}
      control={control}
      render={({ field }) => (
        <PrimeReactCalendar
          {...props}
          {...field}
          onChange={(e) => field.onChange(e.value)}
          mask="99/99/9999"
          showOnFocus={false}
          monthNavigator={true}
          showButtonBar={true}
          showIcon={true}
          yearNavigator={true}
          dateFormat="dd/mm/yy"
        />
      )}
    />
  );
};

export interface GraphqlAutoCompleteProps extends AutoCompleteProps {
  query: (query: string) => Promise<any>;
}

export const GraphqlAutoComplete = ({
  query,
  ...props
}: GraphqlAutoCompleteProps) => {
  const [suggestions, setSuggestions] = useState<unknown[]>([]);
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name as string}
      control={control}
      render={({ field }) => (
        <AutoComplete
          {...props}
          {...field}
          dropdown={true}
          forceSelection={true}
          suggestions={suggestions}
          completeMethod={async (e) => {
            const { data } = await query(e.query);
            const keys = Object.keys(data);

            setSuggestions(data[keys[0]].results);
          }}
          onChange={(e) => field.onChange(e.value)}
        />
      )}
    />
  );
};

export const InputNumber = (props: InputNumberProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name as string}
      control={control}
      render={({ field }) => (
        <PrimeReactInputNumber
          {...props}
          {...field}
          onChange={(e) => field.onChange(e.value)}
        />
      )}
    />
  );
};
