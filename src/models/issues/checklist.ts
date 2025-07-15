import z from "zod";

export const checkListSchema = z.object({
  id: z.string(),
  text: z.string().optional(),
  textHtml: z.string().optional(),
  checked: z.boolean().optional(),
  assignee: z
    .object({
      id: z.number(),
      display: z.string().optional(),
    })
    .optional(),
  deadline: z
    .object({
      date: z.string().optional(),
      deadlineType: z.string().optional(),
      isExceeded: z.boolean().optional(),
    })
    .optional(),
});

export type CheckListType = z.infer<typeof checkListSchema>;

export const createCheckListSchema = z.object({
  text: z.string(),
  checked: z.boolean().optional(),
  assignee: z.string().optional(),
  deadline: z
    .object({
      date: z.string(),
      deadlineType: z.string(),
    })
    .optional(),
});

export type CreateCheckListType = z.infer<typeof createCheckListSchema>;