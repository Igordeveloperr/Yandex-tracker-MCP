import z from "zod";
import { YandexTrackerPromptName } from "../../enums/YandexTrackerPromptName";
import { IParamConfig } from "../../mcp/IParamConfig";

export const promptArray: IParamConfig[] = [
  {
    name: YandexTrackerPromptName.taskSummary,
    systemPrompt:
      "Краткое изложение задачи: суть задачи, статус, приоритет, исполнитель",
    paramsSchema: { issueKey: z.string().describe("Ключ задачи") },
    callbackKey: "getTaskSummaryPromptCallBack",
  },

  {
    name: YandexTrackerPromptName.searchIssue,
    systemPrompt: "Поиск задач по основным полям",
    paramsSchema: {
      issueCount: z
        .string()
        .regex(/^[1-9]\d*$/, {
          message: "Должно быть целое число больше нуля",
        })
        .describe("Кол-во задач"),
      queueKey: z.string().describe("Ключ очереди"),
      status: z.string().describe("Статус задачи"),
      priority: z.string().describe("Приоритет задачи"),
      issueType: z.string().describe("Тип задачи"),
      name: z.string().describe("Имя и Фамилия исполнителя"),
    },
    callbackKey: "searchIssuePromptCallBack",
  },
];