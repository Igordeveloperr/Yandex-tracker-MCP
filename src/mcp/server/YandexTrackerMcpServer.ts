import { YandexMcpServer } from "./YandexMcpServer";
import { YandexTrackerToolName } from "../../enums/YandexTrackerToolName";
import { z } from "zod";
import { YandexTrackerReadAPI } from "../../yandex_api/YandexTrackerReadAPI";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { CallToolResult, GetPromptResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";
import {
  getBoardSprintsParamSchema,
  getIssueDefaultParamSchema,
  getIssueParamsSchema,
  getQueuesParamsSchema,
  getSprintParamSchema,
  getUserParamsSchema,
  searchIssueByFilterParamsSchema,
  searchIssueByQueryParamsShema,
} from "../../models/paramShemas";
import { Issue } from "../../models/issues/issue";
import { SimpleUser, User } from "../../models/users/user";
import { Queue } from "../../models/queues/queue";
import { YandexTrackerPromptName } from "../../enums/YandexTrackerPromptName";
import { IssueType, Priority, Status } from "../../models/baseSchemas";
import { BoardType } from "../../models/boards/board";
import { SprintType } from "../../models/boards/sprint";
import { CommentType } from "../../models/issues/comment";
import { CheckListType } from "../../models/issues/checklist";
import { ChangelogItemType } from "../../models/issues/changelogItem";
import { TransitionType } from "../../models/issues/transition";
import { isAxiosError } from "axios";
import {
  howToUseQuery,
  issueFieldsDoc,
  queryParametersDoc,
  queueFieldsDoc,
  userFieldsDoc,
} from "../../models/resource";
import { readPromptArray } from "../../models/mcp_params/read/readPromptParams";
import { readToolArray } from "../../models/mcp_params/read/readToolParams";
import { McpRegisterService } from "./services/McpRegisterService";
import { IReadPromptCallback } from "../callback_interfaces/read/IReadPromptCallback";
import { IMcpComponent } from "./components/IMcpComponent";
import { IReadToolCallback } from "../callback_interfaces/read/IReadToolCallback";
import { McpRequestManagerService } from "./services/McpRequestManagerService";

export class YandexTrackerMcpServer extends YandexMcpServer {
  /**
   * колим контруктор суперкласса
   */
  constructor(name: string, version: string) {
    super(name, version);

  }
}