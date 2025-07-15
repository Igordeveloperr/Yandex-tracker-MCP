import z from "zod";
import { userSchemaSimple } from "../users/user";

export const commentSchema = z.object({
    id: z.number(),
    text: z.string(),
    createdBy: userSchemaSimple.optional(),
    updatedBy: userSchemaSimple.optional(),
});

export type CommentType = z.infer<typeof commentSchema>;