import { CustomerDomain } from "../customer/customer-domain.js";
import { ProductDomain } from "../product/product-domain.js";

export class InvoiceItemDomain {
  id!: number;
  amount!: number;
  unitValue!: number;
  product!: ProductDomain;
}

export class InvoiceDomain {
  id!: number;
  dateTime!: Date;
  customer!: CustomerDomain;
  items!: InvoiceItemDomain[];
}
