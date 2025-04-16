import { graphql } from "../graphql";

export const CREATE_PRODUCT_MUTATION = graphql(`
  mutation createProduct($input: CreateProductInput!) {
    product: createProduct(input: $input) {
      id
    }
  }
`);

export const UPDATE_PRODUCT_MUTATION = graphql(`
  mutation updateProduct($input: UpdateProductInput!) {
    product: updateProduct(input: $input) {
      id
    }
  }
`);

export const REMOVE_PRODUCT_MUTATION = graphql(`
  mutation removeProduct($input: RemoveProductInput!) {
    product: removeProduct(input: $input) {
      id
    }
  }
`);

export const FIND_ONE_PRODUCT_QUERY = graphql(`
  query findOneProduct($input: FindOneProductInput!) {
    product: findOneProduct(input: $input) {
      id
      name
    }
  }
`);

export const FIND_MANY_PRODUCT_QUERY = graphql(`
  query findManyProduct($input: FindManyProductInput) {
    products: findManyProduct(input: $input) {
      results {
        id
        name
      }
      total
    }
  }
`);
