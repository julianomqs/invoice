import { injectable } from "inversify";
import {
  IDOperators,
  Repository,
  StringOperators
} from "../database/repository.js";
import { SortOrder } from "../graphql/schema.js";
import { CustomerDomain } from "./customer-domain.js";

export interface FindOneCustomer {
  filter: FindCustomerFilter;
  fields?: string[];
  fetch?: object;
}

export interface FindManyCustomer {
  filter?: FindCustomerFilter;
  sort?: FindCustomerSort;
  offset?: number;
  limit?: number;
  fields?: string[];
  fetch?: object;
}

export interface FindCustomerSort {
  id?: SortOrder;
  name?: SortOrder;
  document?: SortOrder;
}

export interface FindCustomerFilter {
  id?: IDOperators;
  name?: StringOperators;
  document?: StringOperators;
  and?: FindCustomerFilter2[];
  or?: FindCustomerFilter2[];
  not?: FindCustomerFilter2[];
}

export interface FindCustomerFilter2 {
  id?: IDOperators;
  name?: StringOperators;
  document?: StringOperators;
}

@injectable()
export class CustomerRepository extends Repository<
  CustomerDomain,
  FindOneCustomer,
  FindManyCustomer
> {
  constructor() {
    super("customer");
  }
}
