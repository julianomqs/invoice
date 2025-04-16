import { GraphQLScalarType, Kind } from "graphql";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  serialize(value) {
    if (!(value instanceof Date)) {
      throw new Error("DateScalar somente trabalha com Date.");
    }

    return value.toISOString();
  },
  parseValue(value) {
    if (typeof value !== "string") {
      throw new Error("DateScalar somente trabalha com string.");
    }

    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error("DateScalar somente trabalha com string.");
    }

    return new Date(ast.value);
  }
});
