import { GraphQLError } from "graphql";
import { createMethodMiddlewareDecorator } from "type-graphql";
import { ZodSchema } from "zod";

export const ZodValidator = (schema: ZodSchema) => {
  return createMethodMiddlewareDecorator(async ({ args }, next) => {
    const result = await schema.safeParseAsync(args.input);

    if (!result.success) {
      throw new GraphQLError("Ocorreram erros de validação", {
        originalError: result.error,
        extensions: {
          code: "INVALID_INPUT_ERROR",
          issues: result.error.issues.map(({ message, path }) => ({
            message,
            path
          }))
        }
      });
    }

    return next();
  });
};
