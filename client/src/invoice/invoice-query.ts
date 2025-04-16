import { graphql } from "../graphql";

export const CREATE_INVOICE_MUTATION = graphql(`
  mutation createInvoice($input: CreateInvoiceInput!) {
    invoice: createInvoice(input: $input) {
      id
    }
  }
`);

export const UPDATE_INVOICE_MUTATION = graphql(`
  mutation updateInvoice($input: UpdateInvoiceInput!) {
    invoice: updateInvoice(input: $input) {
      id
    }
  }
`);

export const REMOVE_INVOICE_MUTATION = graphql(`
  mutation removeInvoice($input: RemoveInvoiceInput!) {
    invoice: removeInvoice(input: $input) {
      id
    }
  }
`);

export const FIND_ONE_INVOICE_QUERY = graphql(`
  query findOneInvoice($input: FindOneInvoiceInput!) {
    invoice: findOneInvoice(input: $input) {
      id
      dateTime
      customer {
        id
        name
      }
      items {
        id
        product {
          name
        }
        amount
        unitValue
      }
    }
  }
`);

export const FIND_MANY_INVOICE_QUERY = graphql(`
  query findManyInvoice($input: FindManyInvoiceInput) {
    invoices: findManyInvoice(input: $input) {
      results {
        id
        dateTime
        customer {
          id
          name
        }
      }
      total
    }
  }
`);

export const GENERATE_INVOICE_REPORT_QUERY = graphql(`
  query generateInvoiceReport($input: GenerateInvoiceReportInput) {
    report: generateInvoiceReport(input: $input) {
      report
    }
  }
`);
