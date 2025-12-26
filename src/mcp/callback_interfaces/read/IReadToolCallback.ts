import type z from "zod";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import type {
  CallToolResult,
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types";
import type { ICallback } from "../ICallback";
import type {
  getDocumentationParamSchema,
  getBoardSprintsParamSchema,
  getIssueDefaultParamSchema,
  getIssueParamsSchema,
  getQueuesParamsSchema,
  getSprintParamSchema,
  getUserParamsSchema,
  searchIssueByFilterParamsSchema,
  searchIssueByQueryParamsShema,
} from "../../../models/paramShemas";

export interface IReadToolCallback extends ICallback {
  getDocumentationToolCallback(
    args: z.infer<typeof getDocumentationParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueChangeLogToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueCheckListToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueCommentsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getSprintToolCallback(
    args: z.infer<typeof getSprintParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getBoardSprintsToolCallback(
    args: z.infer<typeof getBoardSprintsParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getBoardsToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getUsersToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getYandexQueryDocToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getUserFieldsToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getQueueFieldsToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueFieldsToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueStatusTypesToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssuePriorityTypesToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueTypesToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getQueuesToolCallback(
    args: z.infer<typeof getQueuesParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getMySelfToolCallback(
    args: unknown,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getIssueToolCallback(
    args: z.infer<typeof getIssueParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  getUserToolCallback(
    args: z.infer<typeof getUserParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  searchIssueByFilterToolCallback(
    args: z.infer<typeof searchIssueByFilterParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;

  searchIssueByQueryToolCallback(
    args: z.infer<typeof searchIssueByQueryParamsShema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<CallToolResult>;
}
