import { Field, Float, InputType, Int, ObjectType } from "type-graphql";
import { Customer } from "../customer/customer-schema.js";
import { DateScalar } from "../graphql/date-scalar-type.js";
import { IdScalar } from "../graphql/id-scalar-type.js";
import {
  DateOperators,
  DateRange,
  IDOperators,
  SortOrder,
  StringOperators
} from "../graphql/schema.js";
import { Product } from "../product/product-schema.js";

@ObjectType()
export class Invoice {
  @Field(() => IdScalar)
  id!: number;

  @Field(() => DateScalar)
  dateTime!: Date;

  @Field(() => Customer)
  customer!: Customer;

  @Field(() => [InvoiceItem])
  items!: InvoiceItem[];
}

@ObjectType()
export class InvoiceItem {
  @Field(() => IdScalar)
  id!: number;

  @Field(() => Float)
  amount!: number;

  @Field(() => Float)
  unitValue!: number;

  @Field(() => Product)
  product!: Product;
}

@ObjectType()
export class FindManyInvoicePayload {
  @Field(() => [Invoice])
  results!: Invoice[];

  @Field()
  total!: number;
}

@InputType()
export class CreateInvoiceInput {
  @Field(() => DateScalar)
  dateTime!: Date;

  @Field(() => IdScalar)
  customer!: number;

  @Field(() => [CreateInvoiceItemInput], { defaultValue: [] })
  items!: CreateInvoiceItemInput[];
}

@InputType()
export class CreateInvoiceItemInput {
  @Field(() => Float)
  amount!: number;

  @Field(() => Float)
  unitValue!: number;

  @Field(() => IdScalar)
  product!: number;
}

@InputType()
export class ModifyInvoiceItemInput {
  @Field(() => [CreateInvoiceItemInput], { nullable: true, defaultValue: [] })
  create?: CreateInvoiceItemInput[];

  @Field(() => [UpdateInvoiceItemInput], { nullable: true, defaultValue: [] })
  update?: UpdateInvoiceItemInput[];

  @Field(() => [IdScalar], { nullable: true, defaultValue: [] })
  remove?: number[];
}

@InputType()
export class UpdateInvoiceInput {
  @Field(() => IdScalar)
  id!: number;

  @Field(() => DateScalar, { nullable: true })
  dateTime?: Date;

  @Field(() => IdScalar, { nullable: true })
  customer?: number;

  @Field(() => ModifyInvoiceItemInput, { nullable: true, defaultValue: {} })
  items?: ModifyInvoiceItemInput;
}

@InputType()
export class UpdateInvoiceItemInput {
  @Field(() => IdScalar)
  id!: number;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => Float, { nullable: true })
  unitValue?: number;

  @Field(() => IdScalar, { nullable: true })
  product?: number;
}

@InputType()
export class RemoveInvoiceInput {
  @Field(() => IdScalar)
  id!: number;
}

@InputType()
export class FindInvoiceFilter {
  @Field(() => IDOperators, { nullable: true })
  id?: IDOperators;

  @Field(() => DateOperators, { nullable: true })
  dateTime?: DateOperators;

  @Field(() => StringOperators, { nullable: true })
  customer_name?: StringOperators;

  @Field(() => IDOperators, { nullable: true })
  product_id?: IDOperators;

  @Field(() => [FindInvoiceFilter2], { nullable: true })
  and?: FindInvoiceFilter2[];

  @Field(() => [FindInvoiceFilter2], { nullable: true })
  or?: FindInvoiceFilter2[];

  @Field(() => [FindInvoiceFilter2], { nullable: true })
  not?: FindInvoiceFilter2[];
}

@InputType()
export class FindInvoiceFilter2 {
  @Field(() => IDOperators, { nullable: true })
  id?: IDOperators;

  @Field(() => DateOperators, { nullable: true })
  dateTime?: DateOperators;

  @Field(() => StringOperators, { nullable: true })
  customer_name?: StringOperators;

  @Field(() => IDOperators, { nullable: true })
  product_id?: IDOperators;
}

@InputType()
export class FindOneInvoiceInput {
  @Field(() => FindInvoiceFilter)
  filter!: FindInvoiceFilter;
}

@InputType()
export class FindInvoiceSort {
  @Field(() => SortOrder, { nullable: true })
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  dateTime?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  customer_name?: SortOrder;
}

@InputType()
export class FindManyInvoiceInput {
  @Field(() => FindInvoiceFilter, { nullable: true })
  filter?: FindInvoiceFilter;

  @Field(() => FindInvoiceSort, { nullable: true })
  sort?: FindInvoiceSort;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  limit?: number;
}

@InputType()
export class GenerateInvoiceReportInput {
  @Field(() => DateRange, { nullable: true })
  dateTime?: DateRange;

  @Field({ nullable: true })
  name?: string;
}
