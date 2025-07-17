import z from "zod";
import { getIssueDefaultParamSchema } from "../models/paramShemas";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { CallToolResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";

export interface IReadTool {
  getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;
}