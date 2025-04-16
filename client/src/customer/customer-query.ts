import { graphql } from "../graphql";

export const CREATE_CUSTOMER_MUTATION = graphql(`
  mutation createCustomer($input: CreateCustomerInput!) {
    customer: createCustomer(input: $input) {
      id
    }
  }
`);

export const UPDATE_CUSTOMER_MUTATION = graphql(`
  mutation updateCustomer($input: UpdateCustomerInput!) {
    customer: updateCustomer(input: $input) {
      id
    }
  }
`);

export const REMOVE_CUSTOMER_MUTATION = graphql(`
  mutation removeCustomer($input: RemoveCustomerInput!) {
    customer: removeCustomer(input: $input) {
      id
    }
  }
`);

export const FIND_ONE_CUSTOMER_QUERY = graphql(`
  query findOneCustomer($input: FindOneCustomerInput!) {
    customer: findOneCustomer(input: $input) {
      id
      name
      document
    }
  }
`);

export const FIND_MANY_CUSTOMER_QUERY = graphql(`
  query findManyCustomer($input: FindManyCustomerInput) {
    customers: findManyCustomer(input: $input) {
      results {
        id
        name
        document
      }
      total
    }
  }
`);
