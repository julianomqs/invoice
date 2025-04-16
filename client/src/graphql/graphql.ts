/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
};

export type CreateCustomerInput = {
  document: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateInvoiceInput = {
  customer: Scalars['ID']['input'];
  dateTime: Scalars['Date']['input'];
  items?: Array<CreateInvoiceItemInput>;
};

export type CreateInvoiceItemInput = {
  amount: Scalars['Float']['input'];
  product: Scalars['ID']['input'];
  unitValue: Scalars['Float']['input'];
};

export type CreateProductInput = {
  name: Scalars['String']['input'];
};

export type Customer = {
  document: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type DateOperators = {
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  ge?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  le?: InputMaybe<Scalars['Date']['input']>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  notBetween?: InputMaybe<DateRange>;
  notIn?: InputMaybe<Array<Scalars['Date']['input']>>;
};

export type DateRange = {
  end: Scalars['Date']['input'];
  start: Scalars['Date']['input'];
};

export type FindCustomerFilter = {
  and?: InputMaybe<Array<FindCustomerFilter2>>;
  document?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  name?: InputMaybe<StringOperators>;
  not?: InputMaybe<Array<FindCustomerFilter2>>;
  or?: InputMaybe<Array<FindCustomerFilter2>>;
};

export type FindCustomerFilter2 = {
  document?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  name?: InputMaybe<StringOperators>;
};

export type FindCustomerSort = {
  document?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type FindInvoiceFilter = {
  and?: InputMaybe<Array<FindInvoiceFilter2>>;
  customer_name?: InputMaybe<StringOperators>;
  dateTime?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  not?: InputMaybe<Array<FindInvoiceFilter2>>;
  or?: InputMaybe<Array<FindInvoiceFilter2>>;
  product_id?: InputMaybe<IdOperators>;
};

export type FindInvoiceFilter2 = {
  customer_name?: InputMaybe<StringOperators>;
  dateTime?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  product_id?: InputMaybe<IdOperators>;
};

export type FindInvoiceSort = {
  customer_name?: InputMaybe<SortOrder>;
  dateTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type FindManyCustomerInput = {
  filter?: InputMaybe<FindCustomerFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FindCustomerSort>;
};

export type FindManyCustomerPayload = {
  results: Array<Customer>;
  total: Scalars['Float']['output'];
};

export type FindManyInvoiceInput = {
  filter?: InputMaybe<FindInvoiceFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FindInvoiceSort>;
};

export type FindManyInvoicePayload = {
  results: Array<Invoice>;
  total: Scalars['Float']['output'];
};

export type FindManyProductInput = {
  filter?: InputMaybe<FindProductFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FindProductSort>;
};

export type FindManyProductPayload = {
  results: Array<Product>;
  total: Scalars['Float']['output'];
};

export type FindOneCustomerInput = {
  filter: FindCustomerFilter;
};

export type FindOneInvoiceInput = {
  filter: FindInvoiceFilter;
};

export type FindOneProductInput = {
  filter: FindProductFilter;
};

export type FindProductFilter = {
  and?: InputMaybe<Array<FindProductFilter2>>;
  id?: InputMaybe<IdOperators>;
  name?: InputMaybe<StringOperators>;
  not?: InputMaybe<Array<FindProductFilter2>>;
  or?: InputMaybe<Array<FindProductFilter2>>;
};

export type FindProductFilter2 = {
  id?: InputMaybe<IdOperators>;
  name?: InputMaybe<StringOperators>;
};

export type FindProductSort = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type GenerateInvoiceReportInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IdOperators = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Invoice = {
  customer: Customer;
  dateTime: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  items: Array<InvoiceItem>;
};

export type InvoiceItem = {
  amount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  unitValue: Scalars['Float']['output'];
};

export type ModifyInvoiceItemInput = {
  create?: InputMaybe<Array<CreateInvoiceItemInput>>;
  remove?: InputMaybe<Array<Scalars['ID']['input']>>;
  update?: InputMaybe<Array<UpdateInvoiceItemInput>>;
};

export type Mutation = {
  createCustomer: Customer;
  createInvoice: Invoice;
  createProduct: Product;
  removeCustomer: Customer;
  removeInvoice: Invoice;
  removeProduct: Product;
  updateCustomer: Customer;
  updateInvoice: Invoice;
  updateProduct: Product;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationRemoveCustomerArgs = {
  input: RemoveCustomerInput;
};


export type MutationRemoveInvoiceArgs = {
  input: RemoveInvoiceInput;
};


export type MutationRemoveProductArgs = {
  input: RemoveProductInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

export type Product = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  findManyCustomer: FindManyCustomerPayload;
  findManyInvoice: FindManyInvoicePayload;
  findManyProduct: FindManyProductPayload;
  findOneCustomer?: Maybe<Customer>;
  findOneInvoice?: Maybe<Invoice>;
  findOneProduct?: Maybe<Product>;
  generateInvoiceReport: ReportPayload;
};


export type QueryFindManyCustomerArgs = {
  input?: InputMaybe<FindManyCustomerInput>;
};


export type QueryFindManyInvoiceArgs = {
  input?: InputMaybe<FindManyInvoiceInput>;
};


export type QueryFindManyProductArgs = {
  input?: InputMaybe<FindManyProductInput>;
};


export type QueryFindOneCustomerArgs = {
  input: FindOneCustomerInput;
};


export type QueryFindOneInvoiceArgs = {
  input: FindOneInvoiceInput;
};


export type QueryFindOneProductArgs = {
  input: FindOneProductInput;
};


export type QueryGenerateInvoiceReportArgs = {
  input?: InputMaybe<GenerateInvoiceReportInput>;
};

export type RemoveCustomerInput = {
  id: Scalars['ID']['input'];
};

export type RemoveInvoiceInput = {
  id: Scalars['ID']['input'];
};

export type RemoveProductInput = {
  id: Scalars['ID']['input'];
};

export type ReportPayload = {
  report: Scalars['String']['output'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperators = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  document?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInvoiceInput = {
  customer?: InputMaybe<Scalars['ID']['input']>;
  dateTime?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['ID']['input'];
  items?: InputMaybe<ModifyInvoiceItemInput>;
};

export type UpdateInvoiceItemInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  product?: InputMaybe<Scalars['ID']['input']>;
  unitValue?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProductInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;


export type CreateCustomerMutation = { customer: { id: string } };

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { customer: { id: string } };

export type RemoveCustomerMutationVariables = Exact<{
  input: RemoveCustomerInput;
}>;


export type RemoveCustomerMutation = { customer: { id: string } };

export type FindOneCustomerQueryVariables = Exact<{
  input: FindOneCustomerInput;
}>;


export type FindOneCustomerQuery = { customer?: { id: string, name: string, document: string } | null };

export type FindManyCustomerQueryVariables = Exact<{
  input?: InputMaybe<FindManyCustomerInput>;
}>;


export type FindManyCustomerQuery = { customers: { total: number, results: Array<{ id: string, name: string, document: string }> } };

export type CreateInvoiceMutationVariables = Exact<{
  input: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { invoice: { id: string } };

export type UpdateInvoiceMutationVariables = Exact<{
  input: UpdateInvoiceInput;
}>;


export type UpdateInvoiceMutation = { invoice: { id: string } };

export type RemoveInvoiceMutationVariables = Exact<{
  input: RemoveInvoiceInput;
}>;


export type RemoveInvoiceMutation = { invoice: { id: string } };

export type FindOneInvoiceQueryVariables = Exact<{
  input: FindOneInvoiceInput;
}>;


export type FindOneInvoiceQuery = { invoice?: { id: string, dateTime: Date, customer: { id: string, name: string }, items: Array<{ id: string, amount: number, unitValue: number, product: { name: string } }> } | null };

export type FindManyInvoiceQueryVariables = Exact<{
  input?: InputMaybe<FindManyInvoiceInput>;
}>;


export type FindManyInvoiceQuery = { invoices: { total: number, results: Array<{ id: string, dateTime: Date, customer: { id: string, name: string } }> } };

export type GenerateInvoiceReportQueryVariables = Exact<{
  input?: InputMaybe<GenerateInvoiceReportInput>;
}>;


export type GenerateInvoiceReportQuery = { report: { report: string } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { product: { id: string } };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { product: { id: string } };

export type RemoveProductMutationVariables = Exact<{
  input: RemoveProductInput;
}>;


export type RemoveProductMutation = { product: { id: string } };

export type FindOneProductQueryVariables = Exact<{
  input: FindOneProductInput;
}>;


export type FindOneProductQuery = { product?: { id: string, name: string } | null };

export type FindManyProductQueryVariables = Exact<{
  input?: InputMaybe<FindManyProductInput>;
}>;


export type FindManyProductQuery = { products: { total: number, results: Array<{ id: string, name: string }> } };


export const CreateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"customer"},"name":{"kind":"Name","value":"createCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"customer"},"name":{"kind":"Name","value":"updateCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const RemoveCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"customer"},"name":{"kind":"Name","value":"removeCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveCustomerMutation, RemoveCustomerMutationVariables>;
export const FindOneCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindOneCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"customer"},"name":{"kind":"Name","value":"findOneCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}}]} as unknown as DocumentNode<FindOneCustomerQuery, FindOneCustomerQueryVariables>;
export const FindManyCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindManyCustomerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"customers"},"name":{"kind":"Name","value":"findManyCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindManyCustomerQuery, FindManyCustomerQueryVariables>;
export const CreateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInvoiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"invoice"},"name":{"kind":"Name","value":"createInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInvoiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"invoice"},"name":{"kind":"Name","value":"updateInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const RemoveInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveInvoiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"invoice"},"name":{"kind":"Name","value":"removeInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveInvoiceMutation, RemoveInvoiceMutationVariables>;
export const FindOneInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindOneInvoiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"invoice"},"name":{"kind":"Name","value":"findOneInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unitValue"}}]}}]}}]}}]} as unknown as DocumentNode<FindOneInvoiceQuery, FindOneInvoiceQueryVariables>;
export const FindManyInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindManyInvoiceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"invoices"},"name":{"kind":"Name","value":"findManyInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindManyInvoiceQuery, FindManyInvoiceQueryVariables>;
export const GenerateInvoiceReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateInvoiceReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateInvoiceReportInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"report"},"name":{"kind":"Name","value":"generateInvoiceReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"report"}}]}}]}}]} as unknown as DocumentNode<GenerateInvoiceReportQuery, GenerateInvoiceReportQueryVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"product"},"name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"product"},"name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"product"},"name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveProductMutation, RemoveProductMutationVariables>;
export const FindOneProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOneProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindOneProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"product"},"name":{"kind":"Name","value":"findOneProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindOneProductQuery, FindOneProductQueryVariables>;
export const FindManyProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FindManyProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"products"},"name":{"kind":"Name","value":"findManyProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindManyProductQuery, FindManyProductQueryVariables>;