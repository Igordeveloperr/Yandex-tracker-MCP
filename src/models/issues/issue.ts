import { array, string, z } from "zod";
import {
  statusSchema,
  prioritySchema,
  issueTypeSchema,
  projectSchema,
  parentSchema,
} from "../baseSchemas";
import { userSchemaSimple } from "../users/user";
import { queueSchema } from "../queues/queue";

export const issueSchemaSimple = z.object({
  id: z.string(),
  key: z.string()
});
export type SimpleIssue = z.infer<typeof issueSchema>;

export const issueSchema = issueSchemaSimple.extend({
  self: z.string().url().optional(),
  version: z.number().optional(),
  lastCommentUpdatedAt: z.string().optional(),
  storyPoints: z.number().optional(),
  summary: z.string().optional(),
  parent: parentSchema.optional(),
  aliases: z.array(z.string()).optional(),
  updatedBy: userSchemaSimple.optional(),
  description: z.string().optional(),
  sprint: z.array(userSchemaSimple).optional(),
  type: issueTypeSchema.optional(),
  priority: prioritySchema.optional(),
  createdAt: z.string().optional(),
  followers: z.array(userSchemaSimple).optional(),
  createdBy: userSchemaSimple.optional(),
  votes: z.number().optional(),
  assignee: userSchemaSimple.optional(),
  project: projectSchema.optional(),
  queue: queueSchema.optional(),
  updatedAt: z.string().optional(),
  status: statusSchema.optional(),
  previousStatus: statusSchema.optional(),
  favorite: z.boolean().optional(),
});

export type Issue = z.infer<typeof issueSchema>;
