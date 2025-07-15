import { YandexTrackerToolName } from "../../enums/YandexTrackerToolName";
import { getIssueDefaultParamSchema } from "../paramShemas";

export const ToolParam = {
  name: "",
  systemPrompt: "",
  paramsSchema: {},
};

export const getIssueTransitionsToolParam = {
  name: YandexTrackerToolName.getIssueTransitions,
  systemPrompt: "Получает переходы задачи задачи.",
  paramsSchema: getIssueDefaultParamSchema.shape,
};

export const getIssueChangeLogToolParam = {
  name: YandexTrackerToolName.getIssueChangeLog,
  systemPrompt:
    "Получает историю изменений задачи.Если пользовотель не указал perPage или page, то ничего от себя не придумывай и не добавляй эти параметры в запрос.",
  paramsSchema: getIssueDefaultParamSchema.shape,
};

