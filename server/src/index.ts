import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { Container } from "inversify";
import { buildSchema, ContainerType } from "type-graphql";
import { CustomerResolver } from "./customer/customer-resolver.js";
import { InvoiceResolver } from "./invoice/invoice-resolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ProductResolver } from "./product/product-resolver.js";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const container = new Container({ autobind: true });

const schema = await buildSchema({
  resolvers: [ProductResolver, CustomerResolver, InvoiceResolver],
  container: container as ContainerType,
  validate: false
});

const server = new ApolloServer({
  schema,
  csrfPrevention: false,
  formatError: (formattedError, error) => {
    if (formattedError.message.includes("Foreign key constraint violated")) {
      return {
        ...formattedError,
        message:
          "It was not possible to remove the record because there are other records linked to it."
      };
    }

    return formattedError;
  }
});

await startStandaloneServer(server, {
  listen: { host: "0.0.0.0", port: 3000 }
});

console.log("🚀 Server is running on port 3000");
