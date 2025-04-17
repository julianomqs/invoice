import { GraphQLResolveInfo } from "graphql";
import { inject } from "inversify";
import { Arg, Info, Mutation, Query, Resolver } from "type-graphql";
import { z } from "zod";
import { CustomerDomain } from "../customer/customer-domain.js";
import getFields from "../graphql/get-fields.js";
import { findManySchema } from "../graphql/util.js";
import { ProductDomain } from "../product/product-domain.js";
import { id } from "../util/validation.js";
import { ZodValidator } from "../util/zod-validator.js";
import { InvoiceDomain, InvoiceItemDomain } from "./invoice-domain.js";
import {
  CreateInvoiceInput,
  FindManyInvoiceInput,
  FindManyInvoicePayload,
  FindOneInvoiceInput,
  GenerateInvoiceReportInput,
  Invoice,
  RemoveInvoiceInput,
  UpdateInvoiceInput
} from "./invoice-schema.js";
import { InvoiceService } from "./invoice-service.js";
import { ReportPayload } from "../graphql/schema.js";
import { generatePDF } from "../util/util.js";

@Resolver(Invoice)
export class InvoiceResolver {
  constructor(
    @inject(InvoiceService) private readonly service: InvoiceService
  ) {}

  @Mutation(() => Invoice)
  @ZodValidator(
    z.object({
      dateTime: z.date(),
      customer: id("customer"),
      items: z.array(
        z.object({
          amount: z.number().min(0),
          unitValue: z.number().min(0),
          product: id("product")
        })
      )
    })
  )
  async createInvoice(
    @Arg("input") input: CreateInvoiceInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    const invoiceDomain = new InvoiceDomain();

    invoiceDomain.dateTime = input.dateTime;

    invoiceDomain.customer = new CustomerDomain();
    invoiceDomain.customer.id = input.customer;

    invoiceDomain.items = input.items.map((i) => {
      const item = new InvoiceItemDomain();

      item.amount = i.amount;
      item.unitValue = i.unitValue;

      item.product = new ProductDomain();
      item.product.id = i.product;

      return item;
    });

    return this.service.save(invoiceDomain, fields);
  }

  @Mutation(() => Invoice)
  @ZodValidator(
    z.object({
      dateTime: z.date().optional(),
      customer: id("customer").optional(),
      items: z.object({
        create: z.array(
          z.object({
            amount: z.number().min(0),
            unitValue: z.number().min(0),
            product: id("product")
          })
        ),
        update: z.array(
          z.object({
            id: id("invoiceItem"),
            amount: z.number().min(0).optional(),
            unitValue: z.number().min(0).optional(),
            product: id("product").optional()
          })
        ),
        remove: z.array(id("invoiceItem"))
      })
    })
  )
  async updateInvoice(
    @Arg("input") input: UpdateInvoiceInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    const existingInvoice = (await this.service.findOne({
      filter: { id: { eq: input.id } },
      fetch: {
        items: {
          select: { id: true, amount: true, unitValue: true, product: true }
        }
      }
    })) as InvoiceDomain;

    if (input.dateTime) {
      existingInvoice.dateTime = input.dateTime;
    }

    if (input.customer) {
      existingInvoice.customer = new CustomerDomain();
      existingInvoice.customer.id = input.customer;
    }

    const itemsToRemove = input.items?.remove ?? [];

    const updatedItems = existingInvoice.items
      .filter((i) => !itemsToRemove.includes(i.id))
      .map((item) => {
        const updateData = input.items?.update?.find((i) => i.id === item.id);

        const product = new ProductDomain();

        if (updateData && updateData.product) {
          product.id = updateData.product;
        }

        return updateData ? { ...item, ...updateData, product } : item;
      });

    const createdItems =
      input.items?.create?.map((i) => {
        const item = new InvoiceItemDomain();

        item.amount = i.amount;
        item.unitValue = i.unitValue;

        item.product = new ProductDomain();
        item.product.id = i.product;

        return item;
      }) ?? [];

    existingInvoice.items = [...updatedItems, ...createdItems];

    return this.service.save(existingInvoice, fields);
  }

  @Mutation(() => Invoice)
  @ZodValidator(z.object({ id: id("invoice") }))
  async removeInvoice(
    @Arg("input") input: RemoveInvoiceInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.remove(input.id, fields);
  }

  @Query(() => Invoice, { nullable: true })
  async findOneInvoice(
    @Arg("input") input: FindOneInvoiceInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.findOne({ ...input, fields });
  }

  @Query(() => FindManyInvoicePayload)
  async findManyInvoice(
    @Arg("input", { nullable: true }) input: FindManyInvoiceInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const fields = getFields(info);

    return this.service.findMany({ ...input, fields });
  }

  @Query(() => ReportPayload)
  @ZodValidator(
    z
      .object({
        dateTime: z
          .object({
            start: z.date(),
            end: z.date()
          })
          .optional()
          .nullable(),
        name: z.string().optional().nullable()
      })
      .optional()
      .nullable()
  )
  async generateInvoiceReport(
    @Arg("input", { nullable: true }) input: GenerateInvoiceReportInput
  ) {
    const filters: string[] = [];

    if (input.name) {
      filters.push(`Name: ${input.name}`);
    }

    return {
      report: await generatePDF({
        url: "invoice",
        param: {
          TITLE: "Invoices",
          FILTERS: filters,
          DATE: input.dateTime
            ? `${input.dateTime.start.toLocaleDateString("pt-BR")} to ${input.dateTime.end.toLocaleDateString("pt-BR")}`
            : undefined
        },
        data: await this.service.generateReport(input)
      })
    };
  }
}
