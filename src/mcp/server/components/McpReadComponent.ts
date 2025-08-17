import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { IMcpComponent } from "./IMcpComponent";
import { McpRequestManagerService } from "../services/McpRequestManagerService";
import { YandexTrackerReadAPI } from "../../../yandex_api/YandexTrackerReadAPI";
import { Issue } from "../../../models/issues/issue";
import { CallToolResult, GetPromptResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { getBoardSprintsParamSchema, getDocumentationParamSchema, getIssueDefaultParamSchema, getIssueParamsSchema, getQueuesParamsSchema, getSprintParamSchema, getUserParamsSchema, searchIssueByFilterParamsSchema, searchIssueByQueryParamsShema } from "../../../models/paramShemas";
import z from "zod";
import { SimpleUser, User } from "../../../models/users/user";
import { Queue } from "../../../models/queues/queue";
import { IssueType, Priority, Status } from "../../../models/baseSchemas";
import { howToUseQuery, issueFieldsDoc, queryParametersDoc, queueFieldsDoc, userFieldsDoc } from "../../../models/resource";
import { BoardType } from "../../../models/boards/board";
import { isAxiosError } from "axios";
import { SprintType } from "../../../models/boards/sprint";
import { CommentType } from "../../../models/issues/comment";
import { CheckListType } from "../../../models/issues/checklist";
import { ChangelogItemType } from "../../../models/issues/changelogItem";
import { TransitionType } from "../../../models/issues/transition";
import { readToolArray } from "../../../models/mcp_params/read/readToolParams";
import { IReadToolCallback } from "../../callback_interfaces/read/IReadToolCallback";
import { McpRegisterService } from "../services/McpRegisterService";
import { readPromptArray } from "../../../models/mcp_params/read/readPromptParams";
import { IReadPromptCallback } from "../../callback_interfaces/read/IReadPromptCallback";
import { config } from "../../../settings/config";
import { HuggingFaceInferenceEmbeddings  } from "@langchain/community/embeddings/hf"
import { QdrantVectorStore } from "@langchain/qdrant";

export class McpReadComponent implements IMcpComponent {
  private _mcpServer: McpServer;
  constructor(mcpServer: McpServer) {
    this._mcpServer = mcpServer;
  }

  // регистрируем все MCP prompts связанные с Yandex Tracker
  addPrompts(): void {
    McpRegisterService.registerPrompts<typeof this, IReadPromptCallback>(
      this._mcpServer,
      this,
      readPromptArray
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
      this._mcpServer,
      this,
      readToolArray
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
      return McpRequestManagerService.receivePromptResult(response);
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
      return McpRequestManagerService.receivePromptResult(response);
    } catch (error) {
      throw error;
    }
  }

  /*__________________RESOURCES__________________ */

  /*__________________TOOLS__________________ */


  private async   getDocumentationToolCallback(
      args: z.infer<typeof getDocumentationParamSchema>,
      extra: RequestHandlerExtra<ServerRequest, ServerNotification>
    ): Promise<CallToolResult>{
      try{
        const embeddingModel = new HuggingFaceInferenceEmbeddings({
          apiKey: `${config.HF_TOKEN}`,
          model: "ai-forever/ru-en-RoSBERTa", // Или другая модель
        });

        const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddingModel, {
          url: config.QDRANT_CLOUD_URL,
          collectionName: "yandex-tracker-doc",
        });

        const response:object[] = await vectorStore.client.search(
          vectorStore.collectionName,
          {
            vector: await embeddingModel.embedQuery(args.query),
            limit: 20, // Количество результатов
            offset: 0, // смещение относительно начала
            with_payload: true, // Возвращать payload
		        score_threshold: 0.6,
            with_vector: false // Не возвращать векторы
          }
        );

        return McpRequestManagerService.receiveCallToolResult<object[]>(
          response
        );
      }
      catch(error){
        throw error;
      }
    }

  // callback для получения переходов задачи
  private async getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const response: TransitionType[] =
        await YandexTrackerReadAPI.getInstance().getIssueTransitions(
          args.issueKey
        );
      return McpRequestManagerService.receiveCallToolResult<TransitionType[]>(
        response
      );
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
      const response: ChangelogItemType[] =
        await YandexTrackerReadAPI.getInstance().getIssueChangeLog(
          args.issueKey,
          args.perPage,
          args.page
        );
      return McpRequestManagerService.receiveCallToolResult<
        ChangelogItemType[]
      >(response);
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
      const response: CheckListType[] =
        await YandexTrackerReadAPI.getInstance().getIssueCheckList(
          args.issueKey,
          args.perPage,
          args.page
        );
      return McpRequestManagerService.receiveCallToolResult<CheckListType[]>(
        response
      );
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
      const issueComments: CommentType[] =
        await YandexTrackerReadAPI.getInstance().getIssueComments(
          args.issueKey,
          args.perPage,
          args.page
        );
      return McpRequestManagerService.receiveCallToolResult<CommentType[]>(
        issueComments
      );
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
      const sprint: SprintType =
        await YandexTrackerReadAPI.getInstance().getSprint(args.sprintId);
      return McpRequestManagerService.receiveCallToolResult<SprintType>(sprint);
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
        await YandexTrackerReadAPI.getInstance().getBoardSprints(args.boardId);
      return McpRequestManagerService.receiveCallToolResult<SprintType[]>(
        sprints
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
    args: {}, // Типизируем args на основе схемы
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult> {
    try {
      const boards: BoardType[] =
        await YandexTrackerReadAPI.getInstance().getBoards();
      return McpRequestManagerService.receiveCallToolResult<BoardType[]>(
        boards
      );
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
        await YandexTrackerReadAPI.getInstance().getUsers();
      return McpRequestManagerService.receiveCallToolResult<SimpleUser[]>(
        response
      );
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

      return McpRequestManagerService.receiveCallToolResult<object>(
        queryDocData
      );
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
      return McpRequestManagerService.receiveCallToolResult<object[]>(
        userFieldsDoc
      );
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
      return McpRequestManagerService.receiveCallToolResult<object[]>(
        queueFieldsDoc
      );
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
      return McpRequestManagerService.receiveCallToolResult<object[]>(
        issueFieldsDoc
      );
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
        await YandexTrackerReadAPI.getInstance().getStatuses();
      return McpRequestManagerService.receiveCallToolResult<Status[]>(response);
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
        await YandexTrackerReadAPI.getInstance().getPriorities();
      return McpRequestManagerService.receiveCallToolResult<Priority[]>(
        response
      );
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
        await YandexTrackerReadAPI.getInstance().getIssueTypes();
      return McpRequestManagerService.receiveCallToolResult<IssueType[]>(
        response
      );
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
      const queues: Queue[] =
        await YandexTrackerReadAPI.getInstance().getQueues({
          expand: args.expand,
        });
      return McpRequestManagerService.receiveCallToolResult<Queue[]>(queues);
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
      const response: User =
        await YandexTrackerReadAPI.getInstance().getMyself();
      return McpRequestManagerService.receiveCallToolResult<User>(response);
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
      const issue: Issue = await YandexTrackerReadAPI.getInstance().getIssue(
        args.issueKey
      );
      return McpRequestManagerService.receiveCallToolResult<Issue>(issue);
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
      const user: User = await YandexTrackerReadAPI.getInstance().getUser(
        args.key
      );
      return McpRequestManagerService.receiveCallToolResult<User>(user);
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
        await YandexTrackerReadAPI.getInstance().searchIssueByFilter(
          args.filter,
          args?.order,
          args.perPage,
          args.page
        );
      return McpRequestManagerService.receiveCallToolResult<Issue[]>(
        issueArray
      );
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
        await YandexTrackerReadAPI.getInstance().searchIssueByQuery(
          args.query,
          args.isSimple,
          args.perPage,
          args.page
        );
      const responseData = {
        issueArray,
        countOfIssues: issueArray.length,
      };
      return McpRequestManagerService.receiveCallToolResult<object>(
        responseData
      );
    } catch (error) {
      throw error;
    }
  }
}