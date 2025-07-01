import z from "zod";
import { defaultTypeSchema } from "../baseSchemas";

export const issueFieldSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    key: z.string().optional(),
    schema: z.object({
        type: z.string().optional(),
        items: z.string().optional()
    }).optional(),
});
export type IssueFieldType = z.infer<typeof issueFieldSchema>;