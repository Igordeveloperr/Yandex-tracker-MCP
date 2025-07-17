import z from "zod";
import { ICallback } from "./ICallback";
import { getIssueDefaultParamSchema } from "../../models/paramShemas";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { CallToolResult, ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types";

export interface IReadToolCallback extends ICallback{
  getIssueTransitionsToolCallback(
    args: z.infer<typeof getIssueDefaultParamSchema>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CallToolResult>;
}