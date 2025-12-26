import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type {
  CallToolResult,
  GetPromptResult,
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import type z from "zod";
import { isAxiosError } from "axios";
import type { IMcpComponent } from "./IMcpComponent";
import { McpRequestManagerService } from "../services/McpRequestManagerService";
import { YandexTrackerReadAPI } from "../../../yandex_api/YandexTrackerReadAPI";
import type { Issue } from "../../../models/issues/issue";
import type {
  getBoardSprintsParamSchema,
  getIssueDefaultParamSchema,
  getIssueParamsSchema,
  getQueuesParamsSchema,
  getSprintParamSchema,
  getUserParamsSchema,
  searchIssueByFilterParamsSchema,
  searchIssueByQueryParamsShema,
} from "../../../models/paramShemas";
import type { SimpleUser, User } from "../../../models/users/user";
import type { Queue } from "../../../models/queues/queue";
import type { IssueType, Priority, Status } from "../../../models/baseSchemas";
import {
  howToUseQuery,
  issueFieldsDoc,
  queryParametersDoc,
  queueFieldsDoc,
  userFieldsDoc,
} from "../../../models/resource";
import type { BoardType } from "../../../models/boards/board";
import type { SprintType } from "../../../models/boards/sprint";
import type { CommentType } from "../../../models/issues/comment";
import type { CheckListType } from "../../../models/issues/checklist";
import type { ChangelogItemType } from "../../../models/issues/changelogItem";
import type { TransitionType } from "../../../models/issues/transition";
import { readToolArray } from "../../../models/mcp_params/read/readToolParams";
import type { IReadToolCallback } from "../../callback_interfaces/read/IReadToolCallback";
import { McpRegisterService } from "../services/McpRegisterService";
import { readPromptArray } from "../../../models/mcp_params/read/readPromptParams";
import type { IReadPromptCallback } from "../../callback_interfaces/read/IReadPromptCallback";

export class McpReadComponent implements IMcpComponent {
  private mcpServer: McpServer;
  constructor(mcpServer: McpServer) {
    this.mcpServer = mcpServer;
  }

  // регистрируем все MCP prompts связанные с Yandex Tracker
  addPrompts(): void {
    McpRegisterService.registerPrompts<typeof this, IReadPromptCallback>(
      this.mcpServer,
      this,
      readPromptArray,
    );
  }

  // регистрируем все MCP resources связанные с Yandex Tracker
  addResources(): void {
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
  addTools(): void {
    McpRegisterService.registerTools<typeof this, IReadToolCallback>(
      this.mcpServer,
      this,
      readToolArray,
    );
  }
  /* __________________PROMPTS__________________ */

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
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<GetPromptResult> {
    const response = `
      Найди мне ${_args.issueCount} задач
      в очереди ${_args.queueKey}
      которые имеют статус ${_args.status}
      а также приоритет ${_args.priority}
      с типом задачи ${_args.issueType}
      и исполнителем ${_args.name}.
    `;
    return McpRequestManagerService.receivePromptResult(response);
  }

  // callback для промпта - краткое изложение задачи
  private async getTaskSummaryPromptCallBack(
    _args: { issueKey: string },
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<GetPromptResult> {
    const response = `
      Суть задачи: ${_args.issueKey}
    `;
    return McpRequestManagerService.receivePromptResult(response);
  }

  /* __________________RESOURCES__________________ */

  /* __________________TOOLS__________________ */

  // private async getDocumentationToolCallback(
  //   args: z.infer<typeof getDocumentationParamSchema>,
  //   _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  // ): Promise<CallToolResult> {
  //   const embeddingModel = new HuggingFaceInferenceEmbeddings({
  //     apiKey: `${config.HF_TOKEN}`,
  //     model: "ai-forever/ru-en-RoSBERTa", // Или другая модель
  //   });

  //   const vectorStore = await QdrantVectorStore.fromExistingCollection(
  //     embeddingModel,
  //     {
  //       url: config.QDRANT_CLOUD_URL,
  //       collectionName: "yandex-tracker-doc",
  //     },
  //   );

  //   const response: Record<string, any>[] = await vectorStore.client.search(
  //     vectorStore.collectionName,
  //     {
  //       vector: await embeddingModel.embedQuery(args.query),
  //       limit: 10, // Количество результатов
  //       offset: args.offset, // смещение относительно начала
  //       with_payload: true, // Возвращать payload
  //       scoreThreshold: 0.6,
  //       withVector: false, // Не возвращать векторы
  //     },
  //   );

  //   return McpRequestManagerService.receiveCallToolResult<
  //     Record<string, any>[]
  //   >(response);
  // }

  // callback для получения переходов задачи
  private async getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: TransitionType[] =
      await YandexTrackerReadAPI.getInstance().getIssueTransitions(
        args.issueKey,
      );
    return McpRequestManagerService.receiveCallToolResult<TransitionType[]>(
      response,
    );
  }

  // callback для получения истории изменений задачи
  private async getIssueChangeLogToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: ChangelogItemType[] =
      await YandexTrackerReadAPI.getInstance().getIssueChangeLog(
        args.issueKey,
        args.perPage,
        args.page,
      );
    return McpRequestManagerService.receiveCallToolResult<ChangelogItemType[]>(
      response,
    );
  }

  // callback для получения чек-листа к задаче
  private async getIssueCheckListToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: CheckListType[] =
      await YandexTrackerReadAPI.getInstance().getIssueCheckList(
        args.issueKey,
        args.perPage,
        args.page,
      );
    return McpRequestManagerService.receiveCallToolResult<CheckListType[]>(
      response,
    );
  }

  // callback для получения комментариев к задаче
  private async getIssueCommentsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const issueComments: CommentType[] =
      await YandexTrackerReadAPI.getInstance().getIssueComments(
        args.issueKey,
        args.perPage,
        args.page,
      );
    return McpRequestManagerService.receiveCallToolResult<CommentType[]>(
      issueComments,
    );
  }

  // callback для получения спринтов доски в трекере
  private async getSprintToolCallback(
    args: z.infer<typeof getSprintParamSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const sprint: SprintType =
      await YandexTrackerReadAPI.getInstance().getSprint(args.sprintId);
    return McpRequestManagerService.receiveCallToolResult<SprintType>(sprint);
  }

  // callback для получения спринтов доски в трекере
  private async getBoardSprintsToolCallback(
    args: z.infer<typeof getBoardSprintsParamSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    try {
      const sprints: SprintType[] =
        await YandexTrackerReadAPI.getInstance().getBoardSprints(args.boardId);
      return McpRequestManagerService.receiveCallToolResult<SprintType[]>(
        sprints,
      );
    } catch (error) {
      // Проверяем, что error является объектом с полем response
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          return McpRequestManagerService.receiveCallToolResult<{
            message: string;
          }>({
            message: "В данной доске нет спринтов",
          });
        }
      }
      throw error;
    }
  }

  // callback для досок в трекере
  private async getBoardsToolCallback(
    _args: Record<string, unknown>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const boards: BoardType[] =
      await YandexTrackerReadAPI.getInstance().getBoards();
    return McpRequestManagerService.receiveCallToolResult<BoardType[]>(boards);
  }

  // callback для получения всех пользователей
  private async getUsersToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: SimpleUser[] =
      await YandexTrackerReadAPI.getInstance().getUsers();
    return McpRequestManagerService.receiveCallToolResult<SimpleUser[]>(
      response,
    );
  }

  // callback для получения документации по языку запросов Yandex Tracker
  private async getYandexQueryDocToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const queryDocData = {
      queryParameters: queryParametersDoc,
      howToUseQuerySearch: howToUseQuery,
    };

    return McpRequestManagerService.receiveCallToolResult<
      Record<string, unknown>
    >(queryDocData);
  }

  // callback для получения полей пользователя с их описанием
  private async getUserFieldsToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    return McpRequestManagerService.receiveCallToolResult<
      Record<string, unknown>[]
    >(userFieldsDoc);
  }

  // callback для получения полей очереди с их описанием
  private async getQueueFieldsToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    return McpRequestManagerService.receiveCallToolResult<
      Record<string, unknown>[]
    >(queueFieldsDoc);
  }

  // callback для получения полей задачи с их описанием
  private async getIssueFieldsToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    return McpRequestManagerService.receiveCallToolResult<
      Record<string, unknown>[]
    >(issueFieldsDoc);
  }

  // callback для получения типов статусов задач
  private async getIssueStatusTypesToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: Status[] =
      await YandexTrackerReadAPI.getInstance().getStatuses();
    return McpRequestManagerService.receiveCallToolResult<Status[]>(response);
  }

  // callback для получения типов приоритетов задач
  private async getIssuePriorityTypesToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: Priority[] =
      await YandexTrackerReadAPI.getInstance().getPriorities();
    return McpRequestManagerService.receiveCallToolResult<Priority[]>(response);
  }

  // callback для получения типов задач
  private async getIssueTypesToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: IssueType[] =
      await YandexTrackerReadAPI.getInstance().getIssueTypes();
    return McpRequestManagerService.receiveCallToolResult<IssueType[]>(
      response,
    );
  }

  // callback для получения списка доступных очередей
  private async getQueuesToolCallback(
    _args: z.infer<typeof getQueuesParamsSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const queues: Queue[] = await YandexTrackerReadAPI.getInstance().getQueues({
      expand: _args.expand,
    });
    return McpRequestManagerService.receiveCallToolResult<Queue[]>(queues);
  }

  // callback для получения данных о текущем пользователе
  private async getMySelfToolCallback(
    _args: Record<string, unknown>,
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const response: User = await YandexTrackerReadAPI.getInstance().getMyself();
    return McpRequestManagerService.receiveCallToolResult<User>(response);
  }

  // callback для инструмента получения задачи по key
  private async getIssueToolCallback(
    _args: z.infer<typeof getIssueParamsSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    // Получаем задачу по ключу
    const issue: Issue = await YandexTrackerReadAPI.getInstance().getIssue(
      _args.issueKey,
    );
    return McpRequestManagerService.receiveCallToolResult<Issue>(issue);
  }

  // callback для инструмента получения user по key или id
  private async getUserToolCallback(
    _args: z.infer<typeof getUserParamsSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const user: User = await YandexTrackerReadAPI.getInstance().getUser(
      _args.key,
    );
    return McpRequestManagerService.receiveCallToolResult<User>(user);
  }

  // callback для инструмента поиска задач через filter
  private async searchIssueByFilterToolCallback(
    _args: z.infer<typeof searchIssueByFilterParamsSchema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const issueArray: Issue[] =
      await YandexTrackerReadAPI.getInstance().searchIssueByFilter(
        _args.filter,
        _args?.order,
        _args.perPage,
        _args.page,
      );
    return McpRequestManagerService.receiveCallToolResult<Issue[]>(issueArray);
  }

  // callback для инструмента поиска задач через query
  private async searchIssueByQueryToolCallback(
    _args: z.infer<typeof searchIssueByQueryParamsShema>, // Типизируем args на основе схемы
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult> {
    const issueArray: Issue[] =
      await YandexTrackerReadAPI.getInstance().searchIssueByQuery(
        _args.query,
        _args.isSimple,
        _args.perPage,
        _args.page,
      );
    const responseData = {
      issueArray,
      countOfIssues: issueArray.length,
    };
    return McpRequestManagerService.receiveCallToolResult<
      Record<string, unknown>
    >(responseData);
  }
}
