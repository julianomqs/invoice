import { z } from "zod";
import { prisma } from "../prisma.js";

export const id = (modelName: string) =>
  z.number().superRefine(async (val, ctx) => {
    const record =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prisma[modelName as keyof typeof prisma] as any).findUnique({
        where: { id: val }
      });

    if (!record) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registro inexistente"
      });
    }
  });
