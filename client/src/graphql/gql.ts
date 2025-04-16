/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation createCustomer($input: CreateCustomerInput!) {\n    customer: createCustomer(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateCustomerDocument,
    "\n  mutation updateCustomer($input: UpdateCustomerInput!) {\n    customer: updateCustomer(input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateCustomerDocument,
    "\n  mutation removeCustomer($input: RemoveCustomerInput!) {\n    customer: removeCustomer(input: $input) {\n      id\n    }\n  }\n": typeof types.RemoveCustomerDocument,
    "\n  query findOneCustomer($input: FindOneCustomerInput!) {\n    customer: findOneCustomer(input: $input) {\n      id\n      name\n      document\n    }\n  }\n": typeof types.FindOneCustomerDocument,
    "\n  query findManyCustomer($input: FindManyCustomerInput) {\n    customers: findManyCustomer(input: $input) {\n      results {\n        id\n        name\n        document\n      }\n      total\n    }\n  }\n": typeof types.FindManyCustomerDocument,
    "\n  mutation createInvoice($input: CreateInvoiceInput!) {\n    invoice: createInvoice(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateInvoiceDocument,
    "\n  mutation updateInvoice($input: UpdateInvoiceInput!) {\n    invoice: updateInvoice(input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateInvoiceDocument,
    "\n  mutation removeInvoice($input: RemoveInvoiceInput!) {\n    invoice: removeInvoice(input: $input) {\n      id\n    }\n  }\n": typeof types.RemoveInvoiceDocument,
    "\n  query findOneInvoice($input: FindOneInvoiceInput!) {\n    invoice: findOneInvoice(input: $input) {\n      id\n      dateTime\n      customer {\n        id\n        name\n      }\n      items {\n        id\n        product {\n          name\n        }\n        amount\n        unitValue\n      }\n    }\n  }\n": typeof types.FindOneInvoiceDocument,
    "\n  query findManyInvoice($input: FindManyInvoiceInput) {\n    invoices: findManyInvoice(input: $input) {\n      results {\n        id\n        dateTime\n        customer {\n          id\n          name\n        }\n      }\n      total\n    }\n  }\n": typeof types.FindManyInvoiceDocument,
    "\n  query generateInvoiceReport($input: GenerateInvoiceReportInput) {\n    report: generateInvoiceReport(input: $input) {\n      report\n    }\n  }\n": typeof types.GenerateInvoiceReportDocument,
    "\n  mutation createProduct($input: CreateProductInput!) {\n    product: createProduct(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateProductDocument,
    "\n  mutation updateProduct($input: UpdateProductInput!) {\n    product: updateProduct(input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateProductDocument,
    "\n  mutation removeProduct($input: RemoveProductInput!) {\n    product: removeProduct(input: $input) {\n      id\n    }\n  }\n": typeof types.RemoveProductDocument,
    "\n  query findOneProduct($input: FindOneProductInput!) {\n    product: findOneProduct(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.FindOneProductDocument,
    "\n  query findManyProduct($input: FindManyProductInput) {\n    products: findManyProduct(input: $input) {\n      results {\n        id\n        name\n      }\n      total\n    }\n  }\n": typeof types.FindManyProductDocument,
};
const documents: Documents = {
    "\n  mutation createCustomer($input: CreateCustomerInput!) {\n    customer: createCustomer(input: $input) {\n      id\n    }\n  }\n": types.CreateCustomerDocument,
    "\n  mutation updateCustomer($input: UpdateCustomerInput!) {\n    customer: updateCustomer(input: $input) {\n      id\n    }\n  }\n": types.UpdateCustomerDocument,
    "\n  mutation removeCustomer($input: RemoveCustomerInput!) {\n    customer: removeCustomer(input: $input) {\n      id\n    }\n  }\n": types.RemoveCustomerDocument,
    "\n  query findOneCustomer($input: FindOneCustomerInput!) {\n    customer: findOneCustomer(input: $input) {\n      id\n      name\n      document\n    }\n  }\n": types.FindOneCustomerDocument,
    "\n  query findManyCustomer($input: FindManyCustomerInput) {\n    customers: findManyCustomer(input: $input) {\n      results {\n        id\n        name\n        document\n      }\n      total\n    }\n  }\n": types.FindManyCustomerDocument,
    "\n  mutation createInvoice($input: CreateInvoiceInput!) {\n    invoice: createInvoice(input: $input) {\n      id\n    }\n  }\n": types.CreateInvoiceDocument,
    "\n  mutation updateInvoice($input: UpdateInvoiceInput!) {\n    invoice: updateInvoice(input: $input) {\n      id\n    }\n  }\n": types.UpdateInvoiceDocument,
    "\n  mutation removeInvoice($input: RemoveInvoiceInput!) {\n    invoice: removeInvoice(input: $input) {\n      id\n    }\n  }\n": types.RemoveInvoiceDocument,
    "\n  query findOneInvoice($input: FindOneInvoiceInput!) {\n    invoice: findOneInvoice(input: $input) {\n      id\n      dateTime\n      customer {\n        id\n        name\n      }\n      items {\n        id\n        product {\n          name\n        }\n        amount\n        unitValue\n      }\n    }\n  }\n": types.FindOneInvoiceDocument,
    "\n  query findManyInvoice($input: FindManyInvoiceInput) {\n    invoices: findManyInvoice(input: $input) {\n      results {\n        id\n        dateTime\n        customer {\n          id\n          name\n        }\n      }\n      total\n    }\n  }\n": types.FindManyInvoiceDocument,
    "\n  query generateInvoiceReport($input: GenerateInvoiceReportInput) {\n    report: generateInvoiceReport(input: $input) {\n      report\n    }\n  }\n": types.GenerateInvoiceReportDocument,
    "\n  mutation createProduct($input: CreateProductInput!) {\n    product: createProduct(input: $input) {\n      id\n    }\n  }\n": types.CreateProductDocument,
    "\n  mutation updateProduct($input: UpdateProductInput!) {\n    product: updateProduct(input: $input) {\n      id\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation removeProduct($input: RemoveProductInput!) {\n    product: removeProduct(input: $input) {\n      id\n    }\n  }\n": types.RemoveProductDocument,
    "\n  query findOneProduct($input: FindOneProductInput!) {\n    product: findOneProduct(input: $input) {\n      id\n      name\n    }\n  }\n": types.FindOneProductDocument,
    "\n  query findManyProduct($input: FindManyProductInput) {\n    products: findManyProduct(input: $input) {\n      results {\n        id\n        name\n      }\n      total\n    }\n  }\n": types.FindManyProductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCustomer($input: CreateCustomerInput!) {\n    customer: createCustomer(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createCustomer($input: CreateCustomerInput!) {\n    customer: createCustomer(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCustomer($input: UpdateCustomerInput!) {\n    customer: updateCustomer(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateCustomer($input: UpdateCustomerInput!) {\n    customer: updateCustomer(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeCustomer($input: RemoveCustomerInput!) {\n    customer: removeCustomer(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeCustomer($input: RemoveCustomerInput!) {\n    customer: removeCustomer(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findOneCustomer($input: FindOneCustomerInput!) {\n    customer: findOneCustomer(input: $input) {\n      id\n      name\n      document\n    }\n  }\n"): (typeof documents)["\n  query findOneCustomer($input: FindOneCustomerInput!) {\n    customer: findOneCustomer(input: $input) {\n      id\n      name\n      document\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findManyCustomer($input: FindManyCustomerInput) {\n    customers: findManyCustomer(input: $input) {\n      results {\n        id\n        name\n        document\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query findManyCustomer($input: FindManyCustomerInput) {\n    customers: findManyCustomer(input: $input) {\n      results {\n        id\n        name\n        document\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createInvoice($input: CreateInvoiceInput!) {\n    invoice: createInvoice(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createInvoice($input: CreateInvoiceInput!) {\n    invoice: createInvoice(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateInvoice($input: UpdateInvoiceInput!) {\n    invoice: updateInvoice(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateInvoice($input: UpdateInvoiceInput!) {\n    invoice: updateInvoice(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeInvoice($input: RemoveInvoiceInput!) {\n    invoice: removeInvoice(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeInvoice($input: RemoveInvoiceInput!) {\n    invoice: removeInvoice(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findOneInvoice($input: FindOneInvoiceInput!) {\n    invoice: findOneInvoice(input: $input) {\n      id\n      dateTime\n      customer {\n        id\n        name\n      }\n      items {\n        id\n        product {\n          name\n        }\n        amount\n        unitValue\n      }\n    }\n  }\n"): (typeof documents)["\n  query findOneInvoice($input: FindOneInvoiceInput!) {\n    invoice: findOneInvoice(input: $input) {\n      id\n      dateTime\n      customer {\n        id\n        name\n      }\n      items {\n        id\n        product {\n          name\n        }\n        amount\n        unitValue\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findManyInvoice($input: FindManyInvoiceInput) {\n    invoices: findManyInvoice(input: $input) {\n      results {\n        id\n        dateTime\n        customer {\n          id\n          name\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query findManyInvoice($input: FindManyInvoiceInput) {\n    invoices: findManyInvoice(input: $input) {\n      results {\n        id\n        dateTime\n        customer {\n          id\n          name\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query generateInvoiceReport($input: GenerateInvoiceReportInput) {\n    report: generateInvoiceReport(input: $input) {\n      report\n    }\n  }\n"): (typeof documents)["\n  query generateInvoiceReport($input: GenerateInvoiceReportInput) {\n    report: generateInvoiceReport(input: $input) {\n      report\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProduct($input: CreateProductInput!) {\n    product: createProduct(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createProduct($input: CreateProductInput!) {\n    product: createProduct(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProduct($input: UpdateProductInput!) {\n    product: updateProduct(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateProduct($input: UpdateProductInput!) {\n    product: updateProduct(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeProduct($input: RemoveProductInput!) {\n    product: removeProduct(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeProduct($input: RemoveProductInput!) {\n    product: removeProduct(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findOneProduct($input: FindOneProductInput!) {\n    product: findOneProduct(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query findOneProduct($input: FindOneProductInput!) {\n    product: findOneProduct(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findManyProduct($input: FindManyProductInput) {\n    products: findManyProduct(input: $input) {\n      results {\n        id\n        name\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query findManyProduct($input: FindManyProductInput) {\n    products: findManyProduct(input: $input) {\n      results {\n        id\n        name\n      }\n      total\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;