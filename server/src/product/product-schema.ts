import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IdScalar } from "../graphql/id-scalar-type.js";
import { IDOperators, SortOrder, StringOperators } from "../graphql/schema.js";

@ObjectType()
export class Product {
  @Field(() => IdScalar)
  id!: number;

  @Field()
  name!: string;
}

@ObjectType()
export class FindManyProductPayload {
  @Field(() => [Product])
  results!: Product[];

  @Field()
  total!: number;
}

@InputType()
export class CreateProductInput {
  @Field()
  name!: string;
}

@InputType()
export class UpdateProductInput {
  @Field(() => IdScalar)
  id!: number;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class RemoveProductInput {
  @Field(() => IdScalar)
  id!: number;
}

@InputType()
export class FindProductFilter {
  @Field(() => IDOperators, { nullable: true })
  id?: IDOperators;

  @Field(() => StringOperators, { nullable: true })
  name?: StringOperators;

  @Field(() => [FindProductFilter2], { nullable: true })
  and?: FindProductFilter2[];

  @Field(() => [FindProductFilter2], { nullable: true })
  or?: FindProductFilter2[];

  @Field(() => [FindProductFilter2], { nullable: true })
  not?: FindProductFilter2[];
}

@InputType()
export class FindProductFilter2 {
  @Field(() => IDOperators, { nullable: true })
  id?: IDOperators;

  @Field(() => StringOperators, { nullable: true })
  name?: StringOperators;
}

@InputType()
export class FindOneProductInput {
  @Field(() => FindProductFilter)
  filter!: FindProductFilter;
}

@InputType()
export class FindProductSort {
  @Field(() => SortOrder, { nullable: true })
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;
}

@InputType()
export class FindManyProductInput {
  @Field(() => FindProductFilter, { nullable: true })
  filter?: FindProductFilter;

  @Field(() => FindProductSort, { nullable: true })
  sort?: FindProductSort;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  limit?: number;
}
