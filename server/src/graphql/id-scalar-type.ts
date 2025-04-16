import { GraphQLScalarType, Kind } from "graphql";

export const IdScalar = new GraphQLScalarType({
  name: "ID",
  serialize(value) {
    if (!(typeof value === "number")) {
      throw new Error("IdScalar somente trabalha com number.");
    }

    return value.toString();
  },
  parseValue(value) {
    if (typeof value !== "number" && typeof value !== "string") {
      throw new Error("IdScalar somente trabalha com number ou string.");
    }

    return typeof value === "string" ? parseInt(value) : value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new Error("IdScalar somente trabalha com number.");
    }

    return parseInt(ast.value);
  }
});
