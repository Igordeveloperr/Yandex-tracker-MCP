import { z } from "zod";
import {ExpandQueueEnum} from "./queues/queue"

export const getBoardSprintsParamSchema = z.object({
  boardId: z.string(),
});

export const getSprintParamSchema = z.object({
  sprintId: z.string()
});

export const getIssueDefaultParamSchema = z.object({
  issueKey: z
    .string()
    .describe("Ключ задачи в Yandex Tracker (например: TEST-123)"),
  perPage: z
    .number()
    .int()
    .positive()
    .default(20)
    .describe("Количество элементов на странице (по умолчанию 20)"),
  page: z
    .number()
    .int()
    .positive()
    .default(1)
    .describe("Номер страницы (по умолчанию 1)"),
});

// схема для определения входных параметром getIssueTool
export const getIssueParamsSchema = z.object({
    issueKey: z
      .string()
      .describe("Ключ задачи в Yandex Tracker (например: TEST-123)"),
});

export const searchIssueByQueryParamsShema = z.object({
  query: z.string().describe("Запрос на языке запросов Яндекс Трекера"),
  isSimple: z.boolean()
  .describe("true - вывод сжатой информации по задаче, false - вывод всей информации по задаче")
  .default(true),
  perPage: z
    .number()
    .int()
    .positive()
    .default(1000)
    .describe("Количество элементов на странице (по умолчанию 50)"),
  page: z
    .number()
    .int()
    .positive()
    .default(1)
    .describe("Номер страницы (по умолчанию 1)"),
});

export const searchIssueByFilterParamsSchema = z.object({
  filter: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .describe("Объект фильтра для поиска задач по любым полям"),
  order: z
    .string()
    .optional()
    .describe("Параметр сортировки по возрастанию или по убыванию"),
  perPage: z
    .number()
    .int()
    .positive()
    .default(50)
    .describe("Количество элементов на странице (по умолчанию 50)"),
  page: z
    .number()
    .int()
    .positive()
    .default(1)
    .describe("Номер страницы (по умолчанию 1)"),
});

export const getUserParamsSchema = z.object({
  key: z
    .string()
    .describe("id или login пользователя Yandex Tracker"),
});

export const getQueuesParamsSchema = z.object({
  expand: z.array(ExpandQueueEnum).describe(`
              Получение дополнительных полей в модели очереди
              projects — проекты очереди;
              components — компоненты;
              versions — версии;
              types — типы задач;
              team — список участников команды;
              workflows — жизненные циклы.
            `).optional()
});