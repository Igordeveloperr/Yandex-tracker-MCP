import { z } from "zod";
import { defaultTypeSchema } from "./baseSchemas";

const transitionSchema = z.object({
  id: z.string(),
  self: z.string().optional(),
  display: z.string().optional(),
  to: defaultTypeSchema,
});

export type TransitionType = z.infer<typeof transitionSchema>;