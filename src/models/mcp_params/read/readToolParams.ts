import { YandexTrackerToolName } from "../../../enums/YandexTrackerToolName";
import { IReadToolCallback } from "../../../mcp/callback_interfaces/read/IReadToolCallback";
import { IParamConfig } from "../../../mcp/IParamConfig";
import { getBoardSprintsParamSchema, getIssueDefaultParamSchema, getIssueParamsSchema, getQueuesParamsSchema, getSprintParamSchema, getUserParamsSchema, searchIssueByQueryParamsShema } from "../../paramShemas";

export const readToolArray: IParamConfig<IReadToolCallback>[] = [
  {
    name: YandexTrackerToolName.getIssueTransitions,
    systemPrompt: "Получает переходы задачи задачи.",
    paramsSchema: getIssueDefaultParamSchema.shape,
    callbackKey: "getIssueTransitionsToolCallback",
  },
  // {
  //   name: YandexTrackerToolName.getIssueChangeLog,
  //   systemPrompt:
  //     "Получает историю изменений задачи.Если пользовотель не указал perPage или page, то ничего от себя не придумывай и не добавляй эти параметры в запрос.",
  //   paramsSchema: getIssueDefaultParamSchema.shape,
  //   callbackKey: "getIssueChangeLogToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssueCheckList,
  //   systemPrompt:
  //     "Получает чек-лист к задаче. Если пользователь не указал perPage или page, то ничего от себя не придумывай и не добавляй эти параметры в запрос.",
  //   paramsSchema: getIssueDefaultParamSchema.shape,
  //   callbackKey: "getIssueCheckListToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssueComments,
  //   systemPrompt:
  //     "Получает комментарии к задаче. Если пользователь не указал perPage или page, то ничего от себя не придумывай и не добавляй эти параметры в запрос.",
  //   paramsSchema: getIssueDefaultParamSchema.shape,
  //   callbackKey: "getIssueCommentsToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getSprint,
  //   systemPrompt:
  //     "Перед тем как искать конкретный спринт, обязательно вызови - getBoardSprintsTool. Получает конкретный спринт по идентификатору",
  //   paramsSchema: getSprintParamSchema.shape,
  //   callbackKey: "getSprintToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getBoardSprints,
  //   systemPrompt:
  //     "Перед тем как искать спринты доски, узнай какие доски вообще есть в трекере - обязательно вызови getBoardsTool. Получает все спринты конкретной доски",
  //   paramsSchema: getBoardSprintsParamSchema.shape,
  //   callbackKey: "getBoardSprintsToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getBoards,
  //   systemPrompt: "Получает все доски в трекере",
  //   paramsSchema: {},
  //   callbackKey: "getBoardsToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getUsers,
  //   systemPrompt: "Получает всех пользователей трекера",
  //   paramsSchema: {},
  //   callbackKey: "getUsersToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getUserFields,
  //   systemPrompt: "Получает все поля пользователя с их описанием",
  //   paramsSchema: {},
  //   callbackKey: "getUserFieldsToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getQueueFields,
  //   systemPrompt: "Получает все поля очереди с их описанием",
  //   paramsSchema: {},
  //   callbackKey: "getQueueFieldsToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssueFields,
  //   systemPrompt: "Получает все поля задачи с их описанием",
  //   paramsSchema: {},
  //   callbackKey: "getIssueFieldsToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssueStatusTypes,
  //   systemPrompt:
  //     "Получает все типы статусов для задач, которые есть в яндекс трекере",
  //   paramsSchema: {},
  //   callbackKey: "getIssueStatusTypesToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssuePriorityTypes,
  //   systemPrompt:
  //     "Получает все типы приоритетов для задач, которые есть в яндекс трекере",
  //   paramsSchema: {},
  //   callbackKey: "getIssuePriorityTypesToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssueTypes,
  //   systemPrompt: "Получает все типы задач, которые есть в яндекс трекере",
  //   paramsSchema: {},
  //   callbackKey: "getIssueTypesToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getYandexQueryDoc,
  //   systemPrompt:
  //     "getYandexQueryDocTool - получает всю необходимую информацию для выполнения корректного поиска задач.",
  //   paramsSchema: {},
  //   callbackKey: "getYandexQueryDocToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.searchIssueByQuery,
  //   systemPrompt: `Если пользователь не указал perPage или page, то ничего от себя не придумывай и не добавляй эти параметры в запрос.
  //   Если у какой-то задачи нет поля storyPoints, то пропускай ее.
  //   Перед поиском задачи по запросу, сначала вызови инструмент "getYandexQueryDocTool", чтобы получить необходимые параметры для поиска. 
  //   Только после этого используй "searchIssueByQueryTool". Поиск задачи по любым параметрам с использованием языка запросов Yandex tracker.
  //   Позволяет получить список задач, удовлетворяющих запросу. Если выгружается больше 3 задач использовать формат простых задач, параметр isSimple=true
  //   Возвращает: issueArray - массив задач, countOfIssues - количество задач в массиве.`,
  //   paramsSchema: searchIssueByQueryParamsShema.shape,
  //   callbackKey: "searchIssueByQueryToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getQueues,
  //   systemPrompt: "Получения списка доступных очередей",
  //   paramsSchema: getQueuesParamsSchema.shape,
  //   callbackKey: "getQueuesToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getMySelf,
  //   systemPrompt: "Получает информацию о текущем пользователе",
  //   paramsSchema: {},
  //   callbackKey: "getMySelfToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getIssue,
  //   systemPrompt: "Получает информацию о задаче по ее id или key",
  //   paramsSchema: getIssueParamsSchema.shape,
  //   callbackKey: "getIssueToolCallback",
  // },
  // {
  //   name: YandexTrackerToolName.getUser,
  //   systemPrompt: "Получает пользователя по id или login",
  //   paramsSchema: getUserParamsSchema.shape,
  //   callbackKey: "getUserToolCallback",
  // },
];