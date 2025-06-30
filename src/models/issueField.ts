import z from "zod";
import { defaultTypeSchema } from "./baseSchemas";

export type IssueFieldType = z.infer<typeof defaultTypeSchema>;