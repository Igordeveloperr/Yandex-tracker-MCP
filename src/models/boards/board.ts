import z from "zod";

export const boardSchema = z.object({
    id: z.number(),
    name: z.string().optional()
});

export type BoardType = z.infer<typeof boardSchema>;