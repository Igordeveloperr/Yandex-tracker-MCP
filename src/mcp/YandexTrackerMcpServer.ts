import { YandexMcpServer } from "./YandexMcpServer";
import { YandexTrackerToolName } from "../enums/YandexTrackerToolName";
import { z } from "zod";
import { YandexTrackerAPI } from "../yandex_api/YandexTrackerAPI";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { CallToolResult, GetPromptResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";
import { getBoardSprintsParamSchema, getIssueParamsSchema, getQueuesParamsSchema, getSprintParamSchema, getUserParamsSchema, searchIssueByFilterParamsSchema, searchIssueByQueryParamsShema } from "../models/paramShemas";
import { Issue } from "../models/issues/issue";
import { SimpleUser, User } from "../models/users/user";
import { Queue } from "../models/queues/queue";
import { config } from "../settings/config";
import { YandexTrackerPromptName } from "../enums/YandexTrackerPromptName";
import { IssueType, Priority, Status } from "../models/baseSchemas";
import * as fs from "fs/promises"
import { ModelDescriptionName } from "../enums/ModelDescriptionName";
import { BoardType } from "../models/boards/board";
import { SprintType } from "../models/boards/sprint";

export class YandexTrackerMcpServer extends YandexMcpServer {
  /**
   * колим контруктор суперкласса
   */
  constructor(name: string, version: string) {
    super(name, version);
    this.addResources();
    this.addPrompts();
    this.addTools();
  }

  // регистрируем все MCP prompts связанные с Yandex Tracker
  protected addPrompts(): void {
    this.mcpServer.prompt(
      YandexTrackerPromptName.taskSummary,
      "Краткое изложение задачи: суть задачи, статус, приоритет, исполнитель",
      { issueKey: z.string().describe("Ключ задачи") },
      this.getTaskSummaryPromptCallBack.bind(this)
    );

    this.mcpServer.prompt(
      YandexTrackerPromptName.searchIssue,
      "Поиск задач по основным полям",
      {
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
      this.searchIssuePromptCallBack.bind(this)
    );
  }

  // регистрируем все MCP resources связанные с Yandex Tracker
  protected addResources(): void {
    // // issue types
    // this.mcpServer.resource(
    //   YandexTrackerResourceName.issueResourceName,
    //   `${config.MCP_SERVER_BASE_URL}${YandexTrackerResourceUri.issueTypes}`,
    //   {
    //     description:
    //       "Ресурс яндекс трекера, описывающий типы задач в организации",
    //     contentType: "text/plain", // Тип контента, который возвращает ресурс
    //   },
    //   this.getIssueTypesResourceCallback.bind(this)
    // );
    // // priority types
    // this.mcpServer.resource(
    //   YandexTrackerResourceName.priorityResourceName,
    //   `${config.MCP_SERVER_BASE_URL}${YandexTrackerResourceUri.priorityTypes}`,
    //   {
    //     description:
    //       "Ресурс яндекс трекера, описывающий список приоритетов задач в организации",
    //     contentType: "text/plain", // Тип контента, который возвращает ресурс
    //   },
    //   this.getPriorityTypesResourceCallback.bind(this)
    // );
    // // status types
    // this.mcpServer.resource(
    //   YandexTrackerResourceName.statusResourceName,
    //   `${config.MCP_SERVER_BASE_URL}${YandexTrackerResourceUri.statusTypes}`,
    //   {
    //     description:
    //       "Ресурс яндекс трекера, описывающий доступные статусы задач в организации",
    //     contentType: "text/plain", // Тип контента, который возвращает ресурс
    //   },
    //   this.getStatusTypesResourceCallback.bind(this)
    // );
  }

  // регистрируем все MCP tools связанные с Yandex Tracker
  protected addTools(): void {
    // getUsersTool
    this.mcpServer.tool(
      YandexTrackerToolName.getUsers,
      "Получает всех пользователей трекера",
      {},
      this.getUsersToolCallback
    );

    // getUserFieldsTool
    this.mcpServer.tool(
      YandexTrackerToolName.getUserFields,
      "Получает все поля пользователя с их описанием",
      {},
      this.getUserFieldsToolCallback
    );

    // getQueueFieldsTool
    this.mcpServer.tool(
      YandexTrackerToolName.getQueueFields,
      "Получает все поля очереди с их описанием",
      {},
      this.getQueueFieldsToolCallback
    );

    // getIssueFieldsTool
    this.mcpServer.tool(
      YandexTrackerToolName.getIssueFields,
      "Получает все поля задачи с их описанием",
      {},
      this.getIssueFieldsToolCallback
    );

    // getIssueStatusTypesTool
    this.mcpServer.tool(
      YandexTrackerToolName.getIssueStatusTypes,
      "Получает все типы статусов для задач, которые есть в яндекс трекере",
      {},
      this.getIssueStatusTypesToolCallback
    );

    // getIssuePriorityTypesTool
    this.mcpServer.tool(
      YandexTrackerToolName.getIssuePriorityTypes,
      "Получает все типы приоритетов для задач, которые есть в яндекс трекере",
      {},
      this.getIssuePriorityTypesToolCallback
    );

    // getIssueTypesTool
    this.mcpServer.tool(
      YandexTrackerToolName.getIssueTypes,
      "Получает все типы задач, которые есть в яндекс трекере",
      {},
      this.getIssueTypesToolCallback
    );

    // getYandexQueryDocTool
    this.mcpServer.tool(
      YandexTrackerToolName.getYandexQueryDoc,
      "getYandexQueryDocTool - получает всю необходимую информацию для выполнения корретного поиска задач.",
      {},
      this.getYandexQueryDocToolCallback
    );

    // searchIssueByQueryTool
    this.mcpServer.tool(
      YandexTrackerToolName.searchIssueByQuery,
      `
        Если пользовотель не указал perPage или page, то ничего от себя не придумывай и не добавляй эти параметры в запрос.
        Перед поиском задачи по запросу, сначала вызови инструмент "getYandexQueryDocTool", чтобы получить необходимые параметры для поиска. 
        Только после этого используй "searchIssueByQueryTool". Поиск задачи по любым параметрам с использованием языка запросов Yandex tracker.
        Позволяет получить список задач, удовлетворяющих запросу. Если выгружается больше 3 задач использовать формат простых задач, параметр isSimple=true
        Возвращает: issueArray - массив задач, countOfIssues - количсетво задач в массиве.
      `,
      searchIssueByQueryParamsShema.shape,
      this.searchIssueByQueryToolCallback.bind(this)
    );

    // getQueuesTool
    this.mcpServer.tool(
      YandexTrackerToolName.getQueues,
      "Получения списка доступных очередей",
      getQueuesParamsSchema.shape,
      this.getQueuesToolCallback.bind(this)
    );

    // getMySelfTool
    this.mcpServer.tool(
      YandexTrackerToolName.getMySelf,
      "Получает информацию о текущем пользователе",
      {},
      this.getMySelfToolCallback
    );

    // getIssueTool
    this.mcpServer.tool(
      YandexTrackerToolName.getIssue,
      "Получает информацию о задаче по ее id или key",
      getIssueParamsSchema.shape,
      this.getIssueToolCallback.bind(this)
    );

    // getUserTool
    this.mcpServer.tool(
      YandexTrackerToolName.getUser,
      "Получает ползователя по id или login",
      getUserParamsSchema.shape,
      this.getUserToolCallback.bind(this)
    );
  }

  /*__________________PROMPTS__________________ */

  // callback для промпта - поиск задач
  private async searchIssuePromptCallBack(
    _args: {
      issueCount: string;
      queueKey: string;
      status: string;
      priority: string;
      issueType: string;
      name: string;
    },
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<GetPromptResult> {
    try {
      const response = `
        Найди мне ${_args.issueCount} задач 
        в очереди ${_args.queueKey} 
        которые имеют статус ${_args.status} 
        а также приоритет ${_args.priority} 
        с типом задачи ${_args.issueType} 
        и исполнителем ${_args.name}.
      `;
      return super.receivePromptResult(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для промпта - краткое изложение задачи
  private async getTaskSummaryPromptCallBack(
    _args: { issueKey: string },
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<GetPromptResult> {
    try {
      const response = `
        Суть задачи: ${_args.issueKey}
      `;
      return super.receivePromptResult(response);
    } catch (error) {
      throw error;
    }
  }

  /*__________________RESOURCES__________________ */

  /*__________________TOOLS__________________ */

  // callback для получения спринтов доски в трекере
  private async getSprintToolCallback(
    args: z.infer<typeof getSprintParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const sprint: SprintType =
        await YandexTrackerAPI.getInstance().getSprint(args.sprintId);
      return super.receiveCallToolResult<SprintType>(sprint);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения спринтов доски в трекере
  private async getBoardSprintsToolCallback(
    args: z.infer<typeof getBoardSprintsParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const sprints: SprintType[] =
        await YandexTrackerAPI.getInstance().getBoardSprints(args.boardId);
      return super.receiveCallToolResult<SprintType[]>(sprints);
    } catch (error) {
      throw error;
    }
  }

  // callback для досок в трекере
  private async getBoardsToolCallback(
    args: {}, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const boards: BoardType[] =
        await YandexTrackerAPI.getInstance().getBoards();
      return super.receiveCallToolResult<BoardType[]>(boards);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения всех пользователей
  private async getUsersToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: SimpleUser[] =
        await YandexTrackerAPI.getInstance().getUsers();
      return super.receiveCallToolResult<SimpleUser[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения документации по языку запросов Yandex Tracker
  private async getYandexQueryDocToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      // Чтение файла query_params.json
      const queryFieldsJson = await fs.readFile(
        `${config.MODEL_DESCRIPTION_BASE_PATH}${ModelDescriptionName.query_params}`,
        "utf-8"
      );
      // Чтение файла searchhowto.txt
      const howToSearchText = await fs.readFile(
        `${config.MODEL_DESCRIPTION_BASE_PATH}${ModelDescriptionName.howToSearchInfo}`,
        "utf-8"
      );

      const queryFieldsData = await JSON.parse(queryFieldsJson);
      const queryDocData = {
        ...queryFieldsData,
        howToUseSearch: howToSearchText,
      };

      return super.receiveCallToolResult<object>(queryDocData);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения полей пользователя с их описанием
  private async getUserFieldsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      // Чтение файла user.json
      const issueFields = await fs.readFile(
        `${config.MODEL_DESCRIPTION_BASE_PATH}${ModelDescriptionName.user}`,
        "utf-8"
      );
      const issueFieldsData: object[] = await JSON.parse(issueFields);
      return super.receiveCallToolResult<object[]>(issueFieldsData);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения полей очереди с их описанием
  private async getQueueFieldsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      // Чтение файла queue.json
      const issueFields = await fs.readFile(
        `${config.MODEL_DESCRIPTION_BASE_PATH}${ModelDescriptionName.queue}`,
        "utf-8"
      );
      const issueFieldsData: object[] = await JSON.parse(issueFields);
      return super.receiveCallToolResult<object[]>(issueFieldsData);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения полей задачи с их описанием
  private async getIssueFieldsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      // Чтение файла issue.json
      const issueFields = await fs.readFile(
        `${config.MODEL_DESCRIPTION_BASE_PATH}${ModelDescriptionName.issue}`,
        "utf-8"
      );
      const issueFieldsData: object[] = await JSON.parse(issueFields);
      return super.receiveCallToolResult<object[]>(issueFieldsData);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения типов статусов задач
  private async getIssueStatusTypesToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: Status[] =
        await YandexTrackerAPI.getInstance().getStatuses();
      return super.receiveCallToolResult<Status[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения типов приоритетов задач
  private async getIssuePriorityTypesToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: Priority[] =
        await YandexTrackerAPI.getInstance().getPriorities();
      return super.receiveCallToolResult<Priority[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения типов задач
  private async getIssueTypesToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: IssueType[] =
        await YandexTrackerAPI.getInstance().getIssueTypes();
      return super.receiveCallToolResult<IssueType[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения списка доступных очередей
  private async getQueuesToolCallback(
    args: z.infer<typeof getQueuesParamsSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const queues: Queue[] = await YandexTrackerAPI.getInstance().getQueues({
        expand: args.expand,
      });
      return super.receiveCallToolResult<Queue[]>(queues);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения данных о текущем пользователе
  private async getMySelfToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: User = await YandexTrackerAPI.getInstance().getMyself();
      return super.receiveCallToolResult<User>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для инструмента получения задачи по key
  private async getIssueToolCallback(
    args: z.infer<typeof getIssueParamsSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      // Получаем задачу по ключу
      const issue: Issue = await YandexTrackerAPI.getInstance().getIssue(
        args.issueKey
      );
      return super.receiveCallToolResult<Issue>(issue);
    } catch (error) {
      throw error;
    }
  }

  // callback для инструмента получения user по key или id
  private async getUserToolCallback(
    args: z.infer<typeof getUserParamsSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const user: User = await YandexTrackerAPI.getInstance().getUser(args.key);
      return super.receiveCallToolResult<User>(user);
    } catch (error) {
      throw error;
    }
  }

  // callback для инструмента поиска задач через filter
  private async searchIssueByFilterToolCallback(
    args: z.infer<typeof searchIssueByFilterParamsSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const issueArray: Issue[] =
        await YandexTrackerAPI.getInstance().searchIssueByFilter(
          args.filter,
          args?.order,
          args.perPage,
          args.page
        );
      return super.receiveCallToolResult<Issue[]>(issueArray);
    } catch (error) {
      throw error;
    }
  }

  // callback для инструмента поиска задач через query
  private async searchIssueByQueryToolCallback(
    args: z.infer<typeof searchIssueByQueryParamsShema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const issueArray: Issue[] =
        await YandexTrackerAPI.getInstance().searchIssueByQuery(
          args.query,
          args.isSimple,
          args.perPage,
          args.page
        );
      const responseData = {
        issueArray,
        countOfIssues: issueArray.length,
      };
      return super.receiveCallToolResult<object>(responseData);
    } catch (error) {
      throw error;
    }
  }
}