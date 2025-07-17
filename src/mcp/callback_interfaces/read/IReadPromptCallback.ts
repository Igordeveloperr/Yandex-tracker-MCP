import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { ICallback } from "../ICallback";
import { GetPromptResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";

export interface IReadPromptCallback extends ICallback {
  searchIssuePromptCallBack(
    _args: {
      issueCount: string;
      queueKey: string;
      status: string;
      priority: string;
      issueType: string;
      name: string;
    },
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<GetPromptResult>;

  getTaskSummaryPromptCallBack(
    _args: { issueKey: string },
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<GetPromptResult>;
}