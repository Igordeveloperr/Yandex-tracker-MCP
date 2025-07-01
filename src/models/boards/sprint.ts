import { z } from "zod";
import { userSchemaSimple } from "../users/user";

const sprintSchema = z.object({
  id: z.number(),
  version: z.number(),
  name: z.string(),
  board: z
    .object({
      id: z.string(),
      display: z.string().optional(),
    })
    .optional(),
  status: z.string().optional(),
  archived: z.boolean().optional(),
  createdBy: userSchemaSimple.optional(),
  createdAt: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  startDateTime: z.string().optional(),
  endDateTime: z.string().optional(),
});