import { z } from "zod";
import {
  defaultTypeSchema,
  versionSchema,
  workflowItemSchema,
  issueTypeConfigSchema,
} from "../baseSchemas";
import { userSchemaSimple } from "../users/user";

export const queueSchemaSimple = z.object({
  id: z.union([z.string(), z.number()]),
  key: z.string(),
  name: z.string().optional(),
  lead: userSchemaSimple.optional(),
});
export type SimpleQueue = z.infer<typeof queueSchemaSimple>;

export const queueSchema = queueSchemaSimple.extend({
  self: z.string().optional(),
  version: z.number().optional(),
  description: z.string().optional(),
  assignAuto: z.boolean().optional(),
  defaultType: defaultTypeSchema.optional(),
  defaultPriority: defaultTypeSchema.optional(),
  teamUsers: z.array(userSchemaSimple).optional(),
  issueTypes: z.array(defaultTypeSchema).optional(),
  versions: z.array(versionSchema).optional(),
  workflows: workflowItemSchema.optional(),
  denyVoting: z.boolean().optional(),
  issueTypesConfig: z.array(issueTypeConfigSchema).optional(),
});

export const ExpandQueueEnum = z.enum([
  "projects",
  "components",
  "versions",
  "types",
  "team",
  "workflows",
]);

export type Queue = z.infer<typeof queueSchema>;
export type ExpandQueue = z.infer<typeof ExpandQueueEnum>;


export const createQueueSchema = z.object({
  key: z.string(),
  name: z.string(),
  lead: z.string(),
  defaultType: z.string(),
  defaultPriority: z.string(),
  issueTypesConfig: z.array(issueTypeConfigSchema),
});

export type CreateQueue = z.infer<typeof createQueueSchema>;
