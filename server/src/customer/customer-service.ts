import { inject, injectable } from "inversify";
import { CustomerDomain } from "./customer-domain.js";
import {
  CustomerRepository,
  FindManyCustomer,
  FindOneCustomer
} from "./customer-repository.js";
import { FindCustomerFilter } from "./customer-schema.js";

@injectable()
export class CustomerService {
  constructor(
    @inject(CustomerRepository) private readonly repository: CustomerRepository
  ) {}

  async save(customer: CustomerDomain, fields?: string[]) {
    await this.validateExistingName(customer);
    await this.validateExistingDocument(customer);

    return this.repository.save(customer, fields);
  }

  async remove(id: number, fields?: string[]) {
    return this.repository.remove(id, fields);
  }

  async findOne(input: FindOneCustomer) {
    return this.repository.findOne(input);
  }

  async findMany(input: FindManyCustomer) {
    return this.repository.findMany(input);
  }

  private async validateExistingName(customer: CustomerDomain) {
    if (!customer.name) {
      return;
    }

    let idFilter: FindCustomerFilter | undefined;

    if ("id" in customer && customer.id) {
      idFilter = {
        id: {
          ne: customer.id
        }
      };
    }

    const count = await this.repository.count({
      filter: {
        name: {
          eq: customer.name
        },
        ...idFilter
      }
    });

    if (count > 0) {
      throw new Error("A customer with this name already exists.");
    }
  }

  private async validateExistingDocument(customer: CustomerDomain) {
    if (!customer.document) {
      return;
    }

    let idFilter: FindCustomerFilter | undefined;

    if ("id" in customer && customer.id) {
      idFilter = {
        id: {
          ne: customer.id
        }
      };
    }

    const count = await this.repository.count({
      filter: {
        document: {
          eq: customer.document
        },
        ...idFilter
      }
    });

    if (count > 0) {
      throw new Error("A customer with this document already exists.");
    }
  }
}
