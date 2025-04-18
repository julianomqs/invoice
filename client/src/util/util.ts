import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { RefinementCtx, z } from "zod";

export const uuidValidateV7 = (uuid: string) =>
  uuidValidate(uuid) && uuidVersion(uuid) === 7;

export const requiredString = (val: string, ctx: RefinementCtx) => {
  if (val.trim().length === 0) {
    ctx.addIssue({ code: "custom", message: "Required" });
  }
};

z.setErrorMap((error, ctx) => {
  if (error.message) {
    return { message: error.message };
  }

  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.received === "undefined" || error.received === "null") {
        return { message: "Required" };
      }

      if (error.expected === "date") {
        return { message: "Invalid date" };
      }

      break;

    case z.ZodIssueCode.too_small:
      if (error.type === "string" && error.minimum === 1) {
        return { message: "Required" };
      } else if (error.type === "array") {
        return { message: "Must contain at least one record" };
      } else if (
        error.type === "number" &&
        !error.inclusive &&
        error.minimum === 0
      ) {
        return { message: "Must be greater than 0" };
      }

      break;

    case z.ZodIssueCode.too_big:
      return { message: `Maximum of ${error.maximum} characters` };

    case z.ZodIssueCode.invalid_union:
      return { message: "Required" };

    case z.ZodIssueCode.invalid_string:
      return { message: "Invalid value" };

    default:
      break;
  }

  return { message: ctx.defaultError };
});
