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
import { useEffect, useRef, useState } from "react";
import { Controller, RefCallBack, useFormContext } from "react-hook-form";

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

export type DateRangeProps = Omit<CalendarProps, "value" | "onChange"> & {
  value?: { start?: Date; end?: Date };
  onChange?: (value: { start?: Date; end?: Date }) => void;
  ref?: RefCallBack;
};

const DateRangeInner = ({ id, name, ...props }: DateRangeProps) => {
  const startRef = useRef<PrimeReactCalendar>(null);
  const endRef = useRef<PrimeReactCalendar>(null);

  const {
    formState: { errors }
  } = useFormContext();

  useEffect(() => {
    if (name) {
      const error = errors[name];

      if (error && "start" in error && startRef.current) {
        startRef.current.focus();
      } else if (error && "end" in error && endRef.current) {
        endRef.current.focus();
      }
    }
  }, [errors, name]);

  return (
    <div className="flex gap-2">
      <PrimeReactCalendar
        {...props}
        ref={startRef}
        id={id}
        name={name}
        value={props.value?.start}
        onChange={(e) =>
          props.onChange?.({
            start: e.value as Date,
            end: props.value?.end
          })
        }
        mask="99/99/9999"
        showOnFocus={false}
        monthNavigator={true}
        showButtonBar={true}
        showIcon={true}
        yearNavigator={true}
        dateFormat="dd/mm/yy"
      />

      <PrimeReactCalendar
        {...props}
        ref={endRef}
        name={name}
        value={props.value?.end}
        onChange={(e) =>
          props.onChange?.({
            start: props.value?.start,
            end: e.value as Date
          })
        }
        mask="99/99/9999"
        showOnFocus={false}
        monthNavigator={true}
        showButtonBar={true}
        showIcon={true}
        yearNavigator={true}
        dateFormat="dd/mm/yy"
      />
    </div>
  );
};

export const DateRange = (props: CalendarProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name as string}
      control={control}
      render={({ field }) => <DateRangeInner {...props} {...field} />}
    />
  );
};
