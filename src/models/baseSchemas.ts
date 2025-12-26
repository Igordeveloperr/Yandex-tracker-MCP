import { z } from "zod";

export const parentSchema = z.object({
  self: z.string().optional(),
  id: z.string(),
  key: z.string(),
  display: z.string().optional(),
});

export const defaultTypeSchema = z.object({
  self: z.string().optional(),
  id: z.union([z.string(), z.number()]),
  key: z.string(),
  display: z.string().optional(),
});

export const issueTypeSchema = defaultTypeSchema.extend({
  version: z.union([z.string(), z.number()]).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
});
export type IssueType = z.infer<typeof issueTypeSchema>;

export const versionSchema = z.object({
  self: z.string().optional(),
  id: z.string(),
  display: z.string().optional(),
});

export const workflowItemSchema = z.object({
  dev: z.array(defaultTypeSchema).optional(),
});

export const issueTypeConfigSchema = z.object({
  issueType: issueTypeSchema.optional(),
  workflow: versionSchema.optional(),
  resolutions: z.array(defaultTypeSchema).optional(),
});

export const statusSchema = z.object({
  self: z.string().optional(),
  id: z.union([z.string(), z.number()]),
  key: z.string().optional(),
  display: z.string().optional(),
  version: z.number().optional(),
  name: z.string().optional(),
  order: z.number().optional(),
  type: z.string().optional(),
});
export type Status = z.infer<typeof statusSchema>;

export const prioritySchema = z.object({
  self: z.string().optional(),
  id: z.union([z.string(), z.number()]),
  key: z.string().optional(),
  display: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});
export type Priority = z.infer<typeof prioritySchema>;

export const projectSchema = z.object({
  primary: z
    .object({
      self: z.string().optional(),
      id: z.string(),
      display: z.string().optional(),
    })
    .nullable()
    .optional(),
  secondary: z.array(z.object({})).optional(),
});

export const typeSchema = z.object({
  self: z.string().optional(),
  id: z.string(),
  key: z.string(),
  display: z.string().optional(),
});
