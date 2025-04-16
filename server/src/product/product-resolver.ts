import { GraphQLResolveInfo } from "graphql";
import { inject } from "inversify";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import { z } from "zod";
import getFields from "../graphql/get-fields.js";
import { findManySchema } from "../graphql/util.js";
import { id } from "../util/validation.js";
import { ZodValidator } from "../util/zod-validator.js";
import { ProductDomain } from "./product-domain.js";
import {
  CreateProductInput,
  FindManyProductInput,
  FindManyProductPayload,
  FindOneProductInput,
  Product,
  RemoveProductInput,
  UpdateProductInput
} from "./product-schema.js";
import { ProductService } from "./product-service.js";

@Resolver(Product)
export class ProductResolver {
  constructor(
    @inject(ProductService) private readonly service: ProductService
  ) {}

  @Mutation(() => Product)
  @ZodValidator(
    z.object({
      name: z.string().max(255)
    })
  )
  async createProduct(
    @Arg("input") input: CreateProductInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    const productDomain = new ProductDomain();
    productDomain.name = input.name;

    return this.service.save(productDomain, fields);
  }

  @Mutation(() => Product)
  @ZodValidator(
    z.object({
      id: id("product"),
      name: z.string().max(255).optional()
    })
  )
  async updateProduct(
    @Arg("input") input: UpdateProductInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    const existingProduct = (await this.service.findOne({
      filter: { id: { eq: input.id } }
    })) as ProductDomain;

    if (input.name) {
      existingProduct.name = input.name;
    }

    return this.service.save(existingProduct, fields);
  }

  @Mutation(() => Product)
  @ZodValidator(z.object({ id: id("product") }))
  async removeProduct(
    @Arg("input") input: RemoveProductInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.remove(input.id, fields);
  }

  @Query(() => Product, { nullable: true })
  async findOneProduct(
    @Arg("input") input: FindOneProductInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.findOne({ ...input, fields });
  }

  @Query(() => FindManyProductPayload)
  @ZodValidator(findManySchema)
  async findManyProduct(
    @Arg("input", { nullable: true }) input: FindManyProductInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.findMany({ ...input, fields });
  }
}
