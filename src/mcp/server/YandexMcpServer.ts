import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { CallToolResult, GetPromptResult } from "@modelcontextprotocol/sdk/types";
import { Response, Request } from "express";
import { TransportStrategy } from "../transport_strategy/TransportStrategy";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport";
import { config } from "../../settings/config";

export abstract class YandexMcpServer {
  protected mcpServer: McpServer;
  public transports = {
    sse: {} as Record<string, SSEServerTransport>,
  };

  /**
   * создаем экземпляр mcp сервера
   */
  constructor(name: string, version: string) {
    this.mcpServer = new McpServer(
      {
        name: name,
        version: version,
      },
      {
        capabilities: {
          tools: {
            listChanged: true, // уведомление при изменении списка инструментов
          },
        },
      }
    );
  }

  // подключение MCP сервера по выбранной стратегии
  public async connectWithStrategy(
    strategy: TransportStrategy
  ): Promise<Transport> {
    try{
      const transport = strategy.createTransport();
      // Делегируем подключение mcpServer
      await this.mcpServer.connect(transport);
      console.info(
        `Connect in ${config.OPERATING_MODE} mode to MCP server...`
      );
      return transport;
    }
    catch(err){
      throw err;
    }
  }

  public async handleSSEMessages(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "Message body is empty" });
        return;
      }

      const sessionId = req.query.sessionId as string;
      if (!sessionId) {
        res.status(400).json({ error: "sessionId is required" });
        return;
      }

      const transport = this.transports.sse[sessionId];
      if (!transport) {
        res
          .status(404)
          .json({ error: `Transport not found for sessionId: ${sessionId}` });
        return;
      }

      await transport.handlePostMessage(req, res, req.body);
      res.status(200).end();
    } catch (error) {
      console.error("Message handling error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
