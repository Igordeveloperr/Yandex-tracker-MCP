import z from "zod";
import { userSchemaSimple } from "../users/user";

export const commentSchema = z.object({
    id: z.number(),
    text: z.string(),
    createdBy: userSchemaSimple.optional(),
    updatedBy: userSchemaSimple.optional(),
});

export type CommentType = z.infer<typeof commentSchema>;

export const updateCommentSchema = z.object({
  text: z.string(),
  attachmentIds: z.array(z.string()).optional(),
  markupType: z.string().optional(),
});

export type UpdateComment = z.infer<typeof updateCommentSchema>

export const createCommentSchema = updateCommentSchema.extend({
  summonees: z.array(z.union([userSchemaSimple, z.string()])).optional(),
  maillistSummonees: z.array(z.string()).optional(),
});

export type CreateComment = z.infer<typeof createCommentSchema>;