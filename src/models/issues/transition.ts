import { z } from "zod";
import { defaultTypeSchema } from "../baseSchemas";

export const transitionSchema = z.object({
  id: z.string().describe("Идентификатор перехода"),
  self: z
    .string()
    .optional()
    .describe("Адрес ресурса API, который содержит информацию о переходе"),
  display: z
    .string()
    .optional()
    .describe(
      "Отображаемое имя перехода. Соответствует названию кнопки в интерфейсе Трекера"
    ),
  to: defaultTypeSchema.describe("Объект с информацией о новом статусе задачи"),
});

export type TransitionType = z.infer<typeof transitionSchema>;