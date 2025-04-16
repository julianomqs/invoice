import { GraphQLResolveInfo } from "graphql";
import { inject } from "inversify";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import { z } from "zod";
import getFields from "../graphql/get-fields.js";
import { findManySchema } from "../graphql/util.js";
import { id } from "../util/validation.js";
import { ZodValidator } from "../util/zod-validator.js";
import { CustomerDomain } from "./customer-domain.js";
import {
  CreateCustomerInput,
  Customer,
  FindManyCustomerInput,
  FindManyCustomerPayload,
  FindOneCustomerInput,
  RemoveCustomerInput,
  UpdateCustomerInput
} from "./customer-schema.js";
import { CustomerService } from "./customer-service.js";

@Resolver(Customer)
export class CustomerResolver {
  constructor(
    @inject(CustomerService) private readonly service: CustomerService
  ) {}

  @Mutation(() => Customer)
  @ZodValidator(
    z.object({
      name: z.string().max(255),
      document: z.string().max(255)
    })
  )
  async createCustomer(
    @Arg("input") input: CreateCustomerInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    const customerDomain = new CustomerDomain();
    customerDomain.name = input.name;
    customerDomain.document = input.document;

    return this.service.save(customerDomain, fields);
  }

  @Mutation(() => Customer)
  @ZodValidator(
    z.object({
      id: id("customer"),
      name: z.string().max(255).optional(),
      document: z.string().max(255).optional()
    })
  )
  async updateCustomer(
    @Arg("input") input: UpdateCustomerInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    const existingCustomer = (await this.service.findOne({
      filter: { id: { eq: input.id } }
    })) as CustomerDomain;

    if (input.name) {
      existingCustomer.name = input.name;
    }

    if (input.document) {
      existingCustomer.document = input.document;
    }

    return this.service.save(existingCustomer, fields);
  }

  @Mutation(() => Customer)
  @ZodValidator(z.object({ id: id("customer") }))
  async removeCustomer(
    @Arg("input") input: RemoveCustomerInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.remove(input.id, fields);
  }

  @Query(() => Customer, { nullable: true })
  async findOneCustomer(
    @Arg("input") input: FindOneCustomerInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.findOne({ ...input, fields });
  }

  @Query(() => FindManyCustomerPayload)
  @ZodValidator(findManySchema)
  async findManyCustomer(
    @Arg("input", { nullable: true }) input: FindManyCustomerInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.findMany({ ...input, fields });
  }
}
