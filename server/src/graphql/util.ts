import { z } from "zod";

export const findManySchema = z
  .object({
    offset: z.number().min(0).optional().nullable(),
    limit: z.number().min(0).max(100).optional().nullable()
  })
  .optional()
  .nullable();
