import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { IParamConfig } from "../../../models/mcp_params/IParamConfig";
import { ICallback } from "../../callback_interfaces/ICallback";
import { IMcpComponent } from "../components/IMcpComponent";

export class McpRegisterService {
  public static registerPrompts<
    ClassComponentType extends IMcpComponent,
    ICallbackType extends ICallback
  >(
    mcpServer: McpServer,
    componentInstance: ClassComponentType,
    data: IParamConfig<ICallbackType>[]
  ) {
    data.forEach((prompt) => {
      const method =
        componentInstance[prompt.callbackKey as keyof ClassComponentType];
      if (typeof method === "function") {
        mcpServer.prompt(
          prompt.name,
          prompt.systemPrompt,
          prompt.paramsSchema,
          method.bind(componentInstance)
        );
      }
    });
  }

  public static registerTools<
    ClassComponentType extends IMcpComponent,
    ICallbackType extends ICallback
  >(
    mcpServer: McpServer,
    componentInstance: ClassComponentType,
    data: IParamConfig<ICallbackType>[]
  ) {
    data.forEach((tool) => {
      const method =
        componentInstance[tool.callbackKey as keyof ClassComponentType];
      if (typeof method === "function") {
        mcpServer.tool(
          tool.name,
          tool.systemPrompt,
          tool.paramsSchema,
          method.bind(componentInstance)
        );
      }
    });
  }
}