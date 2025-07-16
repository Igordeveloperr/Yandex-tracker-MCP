import z from "zod";

export const boardSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
});
export const extendsBoardSchema = boardSchema.extend({
  defaultQueue: z.object({
    id: z.string().optional(),
    key: z.string(),
  }),
});
export type BoardType = z.infer<typeof boardSchema>;
export type ExtendBoardType = z.infer<typeof extendsBoardSchema>;

export const createBoardSchema = z.object({
  name: z.string(),
  defaultQueue: z.object({
    id: z.string().optional(),
    key: z.string(),
  }),
  boardType: z.enum(["default", "scrum", "kanban"]).optional(),
  query: z.string().optional(),
  useRanking: z.boolean().optional(),
  country: z
    .object({
      id: z.string(),
    })
    .optional(),
});

export type CreateBoard = z.infer<typeof createBoardSchema>;

export const updateBoardSchema = createBoardSchema.partial({
  name: true,
});

export type UpdateBoard = z.infer<typeof updateBoardSchema>;
