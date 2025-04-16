/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  useForm as rhfUseForm,
  UseFormProps,
  UseFormReturn
} from "react-hook-form";
import { z } from "zod";

const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues
>(
  props?: UseFormProps<TFieldValues, TContext, TTransformedValues> & {
    schema?: z.ZodSchema;
  }
): UseFormReturn<TFieldValues, TContext, TTransformedValues> =>
  rhfUseForm({
    ...props,
    resolver: props?.schema ? zodResolver(props.schema) : undefined
  });

export default useForm;
