import { inject, injectable } from "inversify";
import { ProductDomain } from "./product-domain.js";
import {
  FindManyProduct,
  FindOneProduct,
  ProductRepository
} from "./product-repository.js";
import { FindProductFilter } from "./product-schema.js";

@injectable()
export class ProductService {
  constructor(
    @inject(ProductRepository) private readonly repository: ProductRepository
  ) {}

  async save(product: ProductDomain, fields?: string[]) {
    await this.validateExistingName(product);
    return this.repository.save(product, fields);
  }

  async remove(id: number, fields?: string[]) {
    return this.repository.remove(id, fields);
  }

  async findOne(input: FindOneProduct) {
    return this.repository.findOne(input);
  }

  async findMany(input: FindManyProduct) {
    return this.repository.findMany(input);
  }

  private async validateExistingName(product: ProductDomain) {
    if (!product.name) {
      return;
    }

    let idFilter: FindProductFilter | undefined;

    if ("id" in product && product.id) {
      idFilter = {
        id: {
          ne: product.id
        }
      };
    }

    const count = await this.repository.count({
      filter: {
        name: {
          eq: product.name
        },
        ...idFilter
      }
    });

    if (count > 0) {
      throw new Error("A product with this name already exists.");
    }
  }
}
