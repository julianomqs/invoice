/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloCache,
  useMutation as apolloUseMutation,
  useQuery as apolloUseQuery,
  useLazyQuery as apolloUseLazyQuery,
  DefaultContext,
  DocumentNode,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  LazyQueryHookOptions,
  LazyQueryResultTuple
} from "@apollo/client";

const parseDates = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(parseDates) as unknown as T;
  }

  const parsedObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as any)[key];

      if (typeof value === "string" && isISODateString(value)) {
        parsedObj[key] = new Date(value);
      } else {
        parsedObj[key] = parseDates(value);
      }
    }
  }

  return parsedObj;
};

const isISODateString = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/.test(value);
};

const stringifyDates = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(stringifyDates) as unknown as T;
  }

  const parsedObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as any)[key];

      if (value instanceof Date) {
        parsedObj[key] = value.toISOString();
      } else {
        parsedObj[key] = stringifyDates(value);
      }
    }
  }

  return parsedObj;
};

export const useQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>
): QueryResult<TData, TVariables> => {
  const processedOptions = {
    ...options,
    variables: options?.variables
      ? stringifyDates(options.variables)
      : options?.variables
  };

  const result = apolloUseQuery<TData, TVariables>(query, processedOptions);

  const parsedData = result.data ? parseDates(result.data) : result.data;

  return {
    ...result,
    data: parsedData
  };
};

export const useMutation = <
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<
    NoInfer<TData>,
    NoInfer<TVariables>,
    TContext,
    TCache
  >
): MutationTuple<TData, TVariables, TContext, TCache> => {
  const processedOptions = {
    ...options,
    variables: options?.variables
      ? stringifyDates(options.variables)
      : options?.variables
  };

  const [result, mutationResult] = apolloUseMutation<
    TData,
    TVariables,
    TContext,
    TCache
  >(mutation, processedOptions);

  const parsedData = mutationResult.data
    ? parseDates(mutationResult.data)
    : mutationResult.data;

  return [result, { ...mutationResult, data: parsedData }];
};

export const useLazyQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: LazyQueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>
): LazyQueryResultTuple<TData, TVariables> => {
  const processedOptions = {
    ...options,
    variables: options?.variables
      ? stringifyDates(options.variables)
      : options?.variables
  };

  const [result, queryResult] = apolloUseLazyQuery<TData, TVariables>(
    query,
    processedOptions
  );

  const parsedData = queryResult.data
    ? parseDates(queryResult.data)
    : queryResult.data;

  return [result, { ...queryResult, data: parsedData }];
};
