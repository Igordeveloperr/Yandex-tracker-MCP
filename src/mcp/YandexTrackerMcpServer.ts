import { YandexMcpServer } from "./YandexMcpServer";
import { YandexTrackerToolName } from "../enums/YandexTrackerToolName";
import { z } from "zod";
import { YandexTrackerReadAPI } from "../yandex_api/YandexTrackerReadAPI";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { CallToolResult, GetPromptResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";
import { getBoardSprintsParamSchema, getIssueDefaultParamSchema, getIssueParamsSchema, getQueuesParamsSchema, getSprintParamSchema, getUserParamsSchema, searchIssueByFilterParamsSchema, searchIssueByQueryParamsShema } from "../models/paramShemas";
import { Issue } from "../models/issues/issue";
import { SimpleUser, User } from "../models/users/user";
import { Queue } from "../models/queues/queue";
import { YandexTrackerPromptName } from "../enums/YandexTrackerPromptName";
import { IssueType, Priority, Status } from "../models/baseSchemas";
import { BoardType } from "../models/boards/board";
import { SprintType } from "../models/boards/sprint";
import { CommentType } from "../models/issues/comment";
import { CheckListType } from "../models/issues/checklist";
import { ChangelogItemType } from "../models/issues/changelogItem";
import { TransitionType } from "../models/issues/transition";
import { isAxiosError } from "axios";
import { howToUseQuery, issueFieldsDoc, queryParametersDoc, queueFieldsDoc, userFieldsDoc } from "../models/resource";
import { searchIssuePromptParam, taskSummaryPromptParam } from "../models/mcp_params/promptParams";
import { getBoardSprintsToolParam, getBoardsToolParam, getIssueChangeLogToolParam, getIssueCheckListToolParam, getIssueCommentsToolParam, getIssueFieldsToolParam, getIssuePriorityTypesToolParam, getIssueStatusTypesToolParam, getIssueToolParam, getIssueTransitionsToolParam, getIssueTypesToolParam, getMySelfToolParam, getQueueFieldsToolParam, getQueuesToolParam, getSprintToolParam, getUserFieldsToolParam, getUsersToolParam, getUserToolParam, getYandexQueryDocToolParam, searchIssueByQueryToolParam } from "../models/mcp_params/toolParams";

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
      taskSummaryPromptParam.name,
      taskSummaryPromptParam.systemPrompt,
      taskSummaryPromptParam.argsSchema,
      this.getTaskSummaryPromptCallBack.bind(this)
    );

    this.mcpServer.prompt(
      searchIssuePromptParam.name,
      searchIssuePromptParam.systemPrompt,
      searchIssuePromptParam.argsSchema,
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
    // getIssueTransitionsTool
    this.mcpServer.tool(
      getIssueTransitionsToolParam.name,
      getIssueTransitionsToolParam.systemPrompt,
      getIssueTransitionsToolParam.paramsSchema,
      this.getIssueTransitionsToolCallback.bind(this)
    );

    // getIssueChangeLogTool
    this.mcpServer.tool(
      getIssueChangeLogToolParam.name,
      getIssueChangeLogToolParam.systemPrompt,
      getIssueChangeLogToolParam.paramsSchema,
      this.getIssueChangeLogToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getIssueCheckListToolParam.name,
      getIssueCheckListToolParam.systemPrompt,
      getIssueCheckListToolParam.paramsSchema,
      this.getIssueCheckListToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getIssueCommentsToolParam.name,
      getIssueCommentsToolParam.systemPrompt,
      getIssueCommentsToolParam.paramsSchema,
      this.getIssueCommentsToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getSprintToolParam.name,
      getSprintToolParam.systemPrompt,
      getSprintToolParam.paramsSchema,
      this.getSprintToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getBoardSprintsToolParam.name,
      getBoardSprintsToolParam.systemPrompt,
      getBoardSprintsToolParam.paramsSchema,
      this.getBoardSprintsToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getBoardsToolParam.name,
      getBoardsToolParam.systemPrompt,
      getBoardsToolParam.paramsSchema,
      this.getBoardsToolCallback
    );

    this.mcpServer.tool(
      getUsersToolParam.name,
      getUsersToolParam.systemPrompt,
      getUsersToolParam.paramsSchema,
      this.getUsersToolCallback
    );

    this.mcpServer.tool(
      getUserFieldsToolParam.name,
      getUserFieldsToolParam.systemPrompt,
      getUserFieldsToolParam.paramsSchema,
      this.getUserFieldsToolCallback
    );

    this.mcpServer.tool(
      getQueueFieldsToolParam.name,
      getQueueFieldsToolParam.systemPrompt,
      getQueueFieldsToolParam.paramsSchema,
      this.getQueueFieldsToolCallback
    );

    this.mcpServer.tool(
      getIssueFieldsToolParam.name,
      getIssueFieldsToolParam.systemPrompt,
      getIssueFieldsToolParam.paramsSchema,
      this.getIssueFieldsToolCallback
    );

    this.mcpServer.tool(
      getIssueStatusTypesToolParam.name,
      getIssueStatusTypesToolParam.systemPrompt,
      getIssueStatusTypesToolParam.paramsSchema,
      this.getIssueStatusTypesToolCallback
    );

    this.mcpServer.tool(
      getIssuePriorityTypesToolParam.name,
      getIssuePriorityTypesToolParam.systemPrompt,
      getIssuePriorityTypesToolParam.paramsSchema,
      this.getIssuePriorityTypesToolCallback
    );

    this.mcpServer.tool(
      getIssueTypesToolParam.name,
      getIssueTypesToolParam.systemPrompt,
      getIssueTypesToolParam.paramsSchema,
      this.getIssueTypesToolCallback
    );

    this.mcpServer.tool(
      getYandexQueryDocToolParam.name,
      getYandexQueryDocToolParam.systemPrompt,
      getYandexQueryDocToolParam.paramsSchema,
      this.getYandexQueryDocToolCallback
    );

    this.mcpServer.tool(
      searchIssueByQueryToolParam.name,
      searchIssueByQueryToolParam.systemPrompt,
      searchIssueByQueryToolParam.paramsSchema,
      this.searchIssueByQueryToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getQueuesToolParam.name,
      getQueuesToolParam.systemPrompt,
      getQueuesToolParam.paramsSchema,
      this.getQueuesToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getMySelfToolParam.name,
      getMySelfToolParam.systemPrompt,
      getMySelfToolParam.paramsSchema,
      this.getMySelfToolCallback
    );

    this.mcpServer.tool(
      getIssueToolParam.name,
      getIssueToolParam.systemPrompt,
      getIssueToolParam.paramsSchema,
      this.getIssueToolCallback.bind(this)
    );

    this.mcpServer.tool(
      getUserToolParam.name,
      getUserToolParam.systemPrompt,
      getUserToolParam.paramsSchema,
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

  // callback для получения переходов задачи
  private async getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: TransitionType[] = await YandexTrackerReadAPI.getInstance().getIssueTransitions(
        args.issueKey
      );
      return super.receiveCallToolResult<TransitionType[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения истории изменений задачи
  private async getIssueChangeLogToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: ChangelogItemType[] = await YandexTrackerReadAPI.getInstance().getIssueChangeLog(
        args.issueKey,
        args.perPage,
        args.page
      );
      return super.receiveCallToolResult<ChangelogItemType[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения чек-листа к задаче
  private async getIssueCheckListToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: CheckListType[] = await YandexTrackerReadAPI.getInstance().getIssueCheckList(
        args.issueKey,
        args.perPage,
        args.page
      );
      return super.receiveCallToolResult<CheckListType[]>(response);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения комментариев к задаче
  private async getIssueCommentsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const issueComments: CommentType[] = await YandexTrackerReadAPI.getInstance().getIssueComments(
        args.issueKey,
        args.perPage,
        args.page
      );
      return super.receiveCallToolResult<CommentType[]>(issueComments);
    } catch (error) {
      throw error;
    }
  }

  // callback для получения спринтов доски в трекере
  private async getSprintToolCallback(
    args: z.infer<typeof getSprintParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const sprint: SprintType = await YandexTrackerReadAPI.getInstance().getSprint(args.sprintId);
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
      const sprints: SprintType[] = await YandexTrackerReadAPI.getInstance().getBoardSprints(
        args.boardId
      );
      return super.receiveCallToolResult<SprintType[]>(sprints);
    } catch (error) {
      // Проверяем, что error является объектом с полем response
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          return super.receiveCallToolResult<{ message: string }>({
            message: "В данной доске нет спринтов",
          });
        }
      }
      throw error;
    }
  }

  // callback для досок в трекере
  private async getBoardsToolCallback(
    args: {}, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const boards: BoardType[] = await YandexTrackerReadAPI.getInstance().getBoards();
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
      const response: SimpleUser[] = await YandexTrackerReadAPI.getInstance().getUsers();
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
      const queryDocData = {
        queryParameters: queryParametersDoc,
        howToUseQuerySearch: howToUseQuery,
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
      return super.receiveCallToolResult<object[]>(userFieldsDoc);
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
      return super.receiveCallToolResult<object[]>(queueFieldsDoc);
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
      return super.receiveCallToolResult<object[]>(issueFieldsDoc);
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
      const response: Status[] = await YandexTrackerReadAPI.getInstance().getStatuses();
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
      const response: Priority[] = await YandexTrackerReadAPI.getInstance().getPriorities();
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
      const response: IssueType[] = await YandexTrackerReadAPI.getInstance().getIssueTypes();
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
      const queues: Queue[] = await YandexTrackerReadAPI.getInstance().getQueues({
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
      const response: User = await YandexTrackerReadAPI.getInstance().getMyself();
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
      const issue: Issue = await YandexTrackerReadAPI.getInstance().getIssue(args.issueKey);
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
      const user: User = await YandexTrackerReadAPI.getInstance().getUser(args.key);
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
      const issueArray: Issue[] = await YandexTrackerReadAPI.getInstance().searchIssueByFilter(
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
      const issueArray: Issue[] = await YandexTrackerReadAPI.getInstance().searchIssueByQuery(
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