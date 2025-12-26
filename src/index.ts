import express from "express";
import { YandexTrackerMcpServer } from "./mcp/server/YandexTrackerMcpServer";
import { YandexTrackerEndpoint } from "./enums/YandexTrackerEndpoint";
import { config } from "./settings/config";
import { SSETransportStrategy } from "./mcp/transport_strategy/SSETransportStrategy";
import { OperatingModeName } from "./enums/env/OperatingModeName";
import { StdioTransportStrategy } from "./mcp/transport_strategy/StdioTransportStrategy";

// запуск в режиме stdio
async function startStdioServer(): Promise<void> {
  const yandexTrackerMcpServer = new YandexTrackerMcpServer("shiza", "v1.0.0");
  (async () => {
    const transportStrategy = new StdioTransportStrategy();
    await yandexTrackerMcpServer.connectWithStrategy(transportStrategy);
  })();
}

// запуск в режиме sse
async function startSseServer(port: number = 3000): Promise<void> {
  const yandexTrackerMcpServer = new YandexTrackerMcpServer("shiza", "v1.0.0");
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // endpoints
  app.get(YandexTrackerEndpoint.root, async (req, res) => {
    try {
      // Настраиваем заголовки для SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      const transportStrategy = new SSETransportStrategy(
        YandexTrackerEndpoint.messagesEdnpoint,
        res,
        yandexTrackerMcpServer.transports.sse,
      );
      await yandexTrackerMcpServer.connectWithStrategy(transportStrategy);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post(YandexTrackerEndpoint.messagesEdnpoint, async (req, res) => {
    await yandexTrackerMcpServer.handleSSEMessages(req, res);
  });
  app.listen(port);
}

export async function startYandexTrackerMcpMain() {
  // Создаем словарь с функциями
  const serverStartFunctions: Record<string, () => Promise<void>> = {
    [OperatingModeName.StdioMode]: startStdioServer,
    [OperatingModeName.SSEMode]: startSseServer,
  };

  await serverStartFunctions[config.OPERATING_MODE]();
}

startYandexTrackerMcpMain();
