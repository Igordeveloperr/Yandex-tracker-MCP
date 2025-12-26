import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import type { Response, Request } from "express";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport";
import type { TransportStrategy } from "../transport_strategy/TransportStrategy";
import type { IMcpComponent } from "./components/IMcpComponent";
import { McpReadComponent } from "./components/McpReadComponent";
import { McpDeleteComponent } from "./components/McpDeleteComponent";
import { McpUpdateComponent } from "./components/McpUpdateComponent";
import { McpWriteComponent } from "./components/McpWriteComponent";

export class YandexTrackerMcpServer {
  public transports = {
    sse: {} as Record<string, SSEServerTransport>,
  };

  private mcpServer: McpServer;
  private components: IMcpComponent[];

  /**
   * создаем экземпляр mcp сервера
   */
  constructor(name: string, version: string) {
    this.mcpServer = new McpServer(
      {
        name,
        version,
      },
      {
        capabilities: {
          tools: {
            listChanged: true, // уведомление при изменении списка инструментов
          },
        },
      },
    );

    this.components = [
      new McpReadComponent(this.mcpServer),
      new McpDeleteComponent(this.mcpServer),
      new McpUpdateComponent(this.mcpServer),
      new McpWriteComponent(this.mcpServer),
    ];

    this.components.forEach((component) => {
      component.addPrompts();
      component.addResources();
      component.addTools();
    });
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
    } catch {
      // Log the error using a proper logging service
      // console.error("Message handling error:", _error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // подключение MCP сервера по выбранной стратегии
  public async connectWithStrategy(
    strategy: TransportStrategy,
  ): Promise<Transport> {
    const transport = strategy.createTransport();
    // Делегируем подключение mcpServer
    await this.mcpServer.connect(transport);
    // Log the connection using a proper logging service
    // console.info(`Connect in ${config.OPERATING_MODE} mode to MCP server...`);
    return transport;
  }
}
