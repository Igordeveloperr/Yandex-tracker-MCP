import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import type {
  GetPromptResult,
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types";
import type { ICallback } from "../ICallback";

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
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<GetPromptResult>;

  getTaskSummaryPromptCallBack(
    _args: { issueKey: string },
    _extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ): Promise<GetPromptResult>;
}
