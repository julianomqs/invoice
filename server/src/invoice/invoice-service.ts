import { inject, injectable } from "inversify";
import { InvoiceDomain } from "./invoice-domain.js";
import {
  FindManyInvoice,
  FindOneInvoice,
  InvoiceRepository
} from "./invoice-repository.js";

@injectable()
export class InvoiceService {
  constructor(
    @inject(InvoiceRepository) private readonly repository: InvoiceRepository
  ) {}

  async save(invoice: InvoiceDomain, fields?: string[]) {
    return this.repository.save(invoice, fields);
  }

  async remove(id: number, fields?: string[]) {
    return this.repository.remove(id, fields);
  }

  async findOne(input: FindOneInvoice) {
    return this.repository.findOne(input);
  }

  async findMany(input: FindManyInvoice) {
    return this.repository.findMany(input);
  }

  async generateReport(filter?: { name?: string }) {
    return this.repository.generateReport(filter);
  }
}
