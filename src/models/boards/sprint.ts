import { z } from "zod";
import { userSchemaSimple } from "../users/user";

export const sprintSchema = z.object({
  id: z.number(),
  version: z.number(),
  name: z.string(),
  board: z
    .object({
      id: z.string(),
      display: z.string().optional(),
    })
    .optional(),
  // status: z.string().optional(),
  // archived: z.boolean().optional(),
  // createdBy: userSchemaSimple.optional(),
  // createdAt: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  // startDateTime: z.string().optional(),
  // endDateTime: z.string().optional(),
});

export type SprintType = z.infer<typeof sprintSchema>;

export const createSprintSchema = z.object({
  name: z.string(),
  board: z.object({
    id: z.string(),
  }),
  startDate: z.string(), // формат YYYY-MM-DD
  endDate: z.string(),   // формат YYYY-MM-DD
});

export type CreateSprint = z.infer<typeof createSprintSchema>;