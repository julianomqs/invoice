import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IdScalar } from "../graphql/id-scalar-type.js";
import { IDOperators, SortOrder, StringOperators } from "../graphql/schema.js";

@ObjectType()
export class Customer {
  @Field(() => IdScalar)
  id!: number;

  @Field()
  name!: string;

  @Field()
  document!: string;
}

@ObjectType()
export class FindManyCustomerPayload {
  @Field(() => [Customer])
  results!: Customer[];

  @Field()
  total!: number;
}

@InputType()
export class CreateCustomerInput {
  @Field()
  name!: string;

  @Field()
  document!: string;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => IdScalar)
  id!: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  document?: string;
}

@InputType()
export class RemoveCustomerInput {
  @Field(() => IdScalar)
  id!: number;
}

@InputType()
export class FindCustomerFilter {
  @Field(() => IDOperators, { nullable: true })
  id?: IDOperators;

  @Field(() => StringOperators, { nullable: true })
  name?: StringOperators;

  @Field(() => StringOperators, { nullable: true })
  document?: StringOperators;

  @Field(() => [FindCustomerFilter2], { nullable: true })
  and?: FindCustomerFilter2[];

  @Field(() => [FindCustomerFilter2], { nullable: true })
  or?: FindCustomerFilter2[];

  @Field(() => [FindCustomerFilter2], { nullable: true })
  not?: FindCustomerFilter2[];
}

@InputType()
export class FindCustomerFilter2 {
  @Field(() => IDOperators, { nullable: true })
  id?: IDOperators;

  @Field(() => StringOperators, { nullable: true })
  name?: StringOperators;

  @Field(() => StringOperators, { nullable: true })
  document?: StringOperators;
}

@InputType()
export class FindOneCustomerInput {
  @Field(() => FindCustomerFilter)
  filter!: FindCustomerFilter;
}

@InputType()
export class FindCustomerSort {
  @Field(() => SortOrder, { nullable: true })
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  document?: SortOrder;
}

@InputType()
export class FindManyCustomerInput {
  @Field(() => FindCustomerFilter, { nullable: true })
  filter?: FindCustomerFilter;

  @Field(() => FindCustomerSort, { nullable: true })
  sort?: FindCustomerSort;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  limit?: number;
}
