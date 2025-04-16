import { injectable } from "inversify";
import { sql } from "kysely";
import { db } from "../database/kysely.js";
import {
  buildSelect,
  DateOperators,
  IDOperators,
  Repository,
  StringOperators
} from "../database/repository.js";
import { SortOrder } from "../graphql/schema.js";
import { prisma } from "../prisma.js";
import { InvoiceDomain } from "./invoice-domain.js";

export interface FindOneInvoice {
  filter: FindInvoiceFilter;
  fields?: string[];
  fetch?: object;
}

export interface FindManyInvoice {
  filter?: FindInvoiceFilter;
  sort?: FindInvoiceSort;
  offset?: number;
  limit?: number;
  fields?: string[];
  fetch?: object;
}

export interface FindInvoiceSort {
  id?: SortOrder;
  dateTime?: SortOrder;
  customer_name?: SortOrder;
}

export interface FindInvoiceFilter {
  id?: IDOperators;
  dateTime?: DateOperators;
  customer_name?: StringOperators;
  product_id?: IDOperators;
  and?: FindInvoiceFilter2[];
  or?: FindInvoiceFilter2[];
  not?: FindInvoiceFilter2[];
}

export interface FindInvoiceFilter2 {
  id?: IDOperators;
  dateTime?: DateOperators;
  customer_name?: StringOperators;
  product_id?: IDOperators;
}

@injectable()
export class InvoiceRepository extends Repository<
  InvoiceDomain,
  FindOneInvoice,
  FindManyInvoice
> {
  constructor() {
    super("invoice");
  }

  async save(
    invoice: InvoiceDomain,
    fields?: string[]
  ): Promise<InvoiceDomain> {
    const select = fields ? buildSelect(fields) : undefined;

    let result: InvoiceDomain;

    if (invoice.id) {
      const itemIds = invoice.items.map((item) => item.id).filter(Boolean);

      await prisma.invoiceItem.deleteMany({
        where: {
          invoiceId: invoice.id,
          id: {
            notIn: itemIds
          }
        }
      });

      result = (await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          dateTime: invoice.dateTime,
          customer: {
            connect: invoice.customer.id
              ? { id: invoice.customer.id }
              : undefined
          },
          items: {
            create: invoice.items
              .filter((item) => !item.id)
              .map(({ amount, unitValue, product }) => ({
                amount,
                unitValue,
                product: {
                  connect: {
                    id: product.id
                  }
                }
              })),
            update: invoice.items
              .filter((item) => item.id)
              .map(({ id, amount, unitValue }) => ({
                where: { id },
                data: {
                  amount,
                  unitValue
                }
              }))
          }
        },
        select
      })) as unknown as InvoiceDomain;
    } else {
      result = (await prisma.invoice.create({
        data: {
          dateTime: invoice.dateTime,
          customer: {
            connect: { id: invoice.customer.id }
          },
          items: {
            create: invoice.items.map(({ amount, unitValue, product }) => ({
              amount,
              unitValue,
              product: {
                connect: {
                  id: product.id
                }
              }
            }))
          }
        },
        select
      })) as unknown as InvoiceDomain;
    }

    return result;
  }

  async remove(id: number, fields?: string[]): Promise<InvoiceDomain> {
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: id }
    });

    const select = fields ? buildSelect(fields) : undefined;

    return (await prisma.invoice.delete({
      where: { id },
      select
    })) as unknown as InvoiceDomain;
  }

  async generateReport(filter?: { name?: string }) {
    let query = db
      .selectFrom("invoice as i")
      .innerJoin("customer as c", "c.id", "i.customer_id")
      .innerJoin("invoice_item as ii", "ii.invoice_id", "i.id")
      .innerJoin("product as p", "p.id", "ii.product_id")
      .select([
        "c.id as customerId",
        "c.name as customer",
        sql<string>`DATE_FORMAT(i.date_time, '%d/%m/%Y')`.as("dateTime"),
        "p.name as product",
        "ii.amount",
        "ii.unit_value as unitValue"
      ])
      .orderBy("c.name")
      .orderBy("i.id")
      .orderBy("ii.id");

    if (filter?.name) {
      query = query.where("c.name", "like", `%${filter.name}%`);
    }

    return query.execute();
  }
}
