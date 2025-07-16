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
import { describe, number } from "yargs";
import { sprintSchema } from "../boards/sprint";
import { checkListSchema } from "./checklist";

export const issueSchemaSimple = z.object({
  id: z.string(),
  key: z.string(),
  storyPoints: z.number().optional(),
});
export type SimpleIssue = z.infer<typeof issueSchema>;

export const issueSchema = issueSchemaSimple.extend({
  self: z.string().url().optional(),
  version: z.number().optional(),
  lastCommentUpdatedAt: z.string().optional(),
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
  checklistItems: z.array(checkListSchema).optional()
});

export type Issue = z.infer<typeof issueSchema>;

export const createIssueSchema = z.object({
  summary: z.string(),
  queue: z.union([queueSchema, z.string(), z.number()]),

  parent: z.union([parentSchema, z.string()]).optional(),
  description: z.string().optional(),
  markupType: z.string().optional(),
  sprint: z.union([z.array(z.string()), z.array(sprintSchema)]).optional(),
  type: z.union([issueTypeSchema, z.string(), z.number()]).optional(),
  priority: z.union([prioritySchema, z.string(), z.number()]).optional(),
  followers: z
    .array(z.union([userSchemaSimple, z.string(), z.number()]))
    .optional(),
  assignee: z.union([userSchemaSimple, z.string(), z.number()]).optional(),
  author: z.union([userSchemaSimple, z.string(), z.number()]).optional(),
  project: projectSchema.optional(),
  unique: z.string().optional(),
  attachmentIds: z.array(z.string()).optional(),
  descriptionAttachmentIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateIssueSchema = z.object({
  summary: z.string().optional(),
  parent: z.union([parentSchema, z.string()]).optional(),
  description: z.string().optional(),
  markupType: z.string().optional(),
  sprint: z.union([z.array(z.string()), z.array(sprintSchema)]).optional(),
  type: z.union([issueTypeSchema, z.string(), z.number()]).optional(),
  priority: z.union([prioritySchema, z.string(), z.number()]).optional(),
  followers: z.union([z.array(userSchemaSimple), z.array(z.string()), z.array(z.number())]).optional(),
  project: projectSchema.optional(),
  attachmentIds: z.array(z.string()).optional(),
  descriptionAttachmentIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateIssue = z.infer<typeof updateIssueSchema>;