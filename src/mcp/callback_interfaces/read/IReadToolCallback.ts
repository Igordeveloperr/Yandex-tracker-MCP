import z from "zod";
import { ICallback } from "../ICallback";
import { getBoardSprintsParamSchema, getIssueDefaultParamSchema, getIssueParamsSchema, getQueuesParamsSchema, getSprintParamSchema, getUserParamsSchema, searchIssueByFilterParamsSchema, searchIssueByQueryParamsShema } from "../../../models/paramShemas";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { CallToolResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";

export interface IReadToolCallback extends ICallback {
  getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueChangeLogToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueCheckListToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueCommentsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getSprintToolCallback(
    args: z.infer<typeof getSprintParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getBoardSprintsToolCallback(
    args: z.infer<typeof getBoardSprintsParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getBoardsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getUsersToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getYandexQueryDocToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getUserFieldsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getQueueFieldsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueFieldsToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueStatusTypesToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssuePriorityTypesToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueTypesToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getQueuesToolCallback(
    args: z.infer<typeof getQueuesParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getMySelfToolCallback(
    args: {},
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getIssueToolCallback(
    args: z.infer<typeof getIssueParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  getUserToolCallback(
    args: z.infer<typeof getUserParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  searchIssueByFilterToolCallback(
    args: z.infer<typeof searchIssueByFilterParamsSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;

  searchIssueByQueryToolCallback(
    args: z.infer<typeof searchIssueByQueryParamsShema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;
}