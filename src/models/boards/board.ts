import z from "zod";

export const boardSchema = z.object({
    id: z.number(),
    name: z.string().optional()
});
export const extendsBoardSchema = boardSchema.extend({
  defaultQueue: z.object({
    id: z.string().optional(),
    key: z.string(),
  }),
});
export type BoardType = z.infer<typeof boardSchema>;
export type ExtendBoardType = z.infer<typeof extendsBoardSchema>;