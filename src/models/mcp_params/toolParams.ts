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