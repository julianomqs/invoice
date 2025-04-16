import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { IdScalar } from "./id-scalar-type.js";
import { DateScalar } from "./date-scalar-type.js";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}

registerEnumType(SortOrder, { name: "SortOrder" });

@InputType()
export class IDOperators {
  @Field(() => IdScalar, { nullable: true })
  eq?: number;

  @Field(() => IdScalar, { nullable: true })
  ne?: number;

  @Field(() => [IdScalar], { nullable: true })
  in?: number[];

  @Field(() => [IdScalar], { nullable: true })
  notIn?: number[];
}

@InputType()
export class StringOperators {
  @Field({ nullable: true })
  eq?: string;

  @Field({ nullable: true })
  ne?: string;

  @Field({ nullable: true })
  startsWith?: string;

  @Field({ nullable: true })
  notStartsWith?: string;

  @Field({ nullable: true })
  endsWith?: string;

  @Field({ nullable: true })
  notEndsWith?: string;

  @Field({ nullable: true })
  contains?: string;

  @Field({ nullable: true })
  notContains?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];

  @Field(() => [String], { nullable: true })
  notIn?: string[];
}

@InputType()
export class DateRange {
  @Field(() => DateScalar)
  start!: Date;

  @Field(() => DateScalar)
  end!: Date;
}

@InputType()
export class DateOperators {
  @Field(() => DateScalar, { nullable: true })
  eq?: Date;

  @Field(() => DateScalar, { nullable: true })
  ne?: Date;

  @Field(() => DateRange, { nullable: true })
  between?: DateRange;

  @Field(() => DateRange, { nullable: true })
  notBetween?: DateRange;

  @Field(() => DateScalar, { nullable: true })
  gt?: Date;

  @Field(() => DateScalar, { nullable: true })
  ge?: Date;

  @Field(() => DateScalar, { nullable: true })
  lt?: Date;

  @Field(() => DateScalar, { nullable: true })
  le?: Date;

  @Field(() => [DateScalar], { nullable: true })
  in?: Date[];

  @Field(() => [DateScalar], { nullable: true })
  notIn?: Date[];
}

@ObjectType()
export class ReportPayload {
  @Field()
  report!: string;
}
