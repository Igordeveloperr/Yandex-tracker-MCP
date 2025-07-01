import { array, z } from "zod";
import { defaultTypeSchema, versionSchema } from "../baseSchemas";
import { userSchemaSimple } from "../users/user";

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
        from: z.any(),
        to: z.any()
      })
    )
    .optional(),
});

export type ChangelogItemType = z.infer<typeof changelogItemSchema>;