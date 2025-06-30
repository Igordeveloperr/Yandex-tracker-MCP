import { z } from "zod";
import { defaultTypeSchema, versionSchema } from "./baseSchemas";
import { userSchemaSimple } from "./user";

export const changelogItemSchema = z.object({
  id: z.string(),
  self: z.string().optional(),
  issue: defaultTypeSchema,
  updatedAt: z.string().optional(),
  updatedBy: userSchemaSimple.optional(),
  type: z.string().optional(),
  fields: z
    .array(
      z.object({
        field: versionSchema.optional().nullable(),
        from: z.union([z.string(), defaultTypeSchema]).nullable().optional(),
        to: z.union([z.string(), defaultTypeSchema]).nullable().optional(),
      })
    )
    .optional(),
});

export type ChangelogItemType = z.infer<typeof changelogItemSchema>;