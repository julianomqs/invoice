import { injectable } from "inversify";
import {
  IDOperators,
  Repository,
  StringOperators
} from "../database/repository.js";
import { SortOrder } from "../graphql/schema.js";
import { ProductDomain } from "./product-domain.js";

export interface FindOneProduct {
  filter: FindProductFilter;
  fields?: string[];
  fetch?: object;
}

export interface FindManyProduct {
  filter?: FindProductFilter;
  sort?: FindProductSort;
  offset?: number;
  limit?: number;
  fields?: string[];
  fetch?: object;
}

export interface FindProductSort {
  id?: SortOrder;
  name?: SortOrder;
}

export interface FindProductFilter {
  id?: IDOperators;
  name?: StringOperators;
  and?: FindProductFilter2[];
  or?: FindProductFilter2[];
  not?: FindProductFilter2[];
}

export interface FindProductFilter2 {
  id?: IDOperators;
  name?: StringOperators;
}

@injectable()
export class ProductRepository extends Repository<
  ProductDomain,
  FindOneProduct,
  FindManyProduct
> {
  constructor() {
    super("product");
  }
}
