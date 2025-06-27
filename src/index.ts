import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import express from "express";
import { logger } from "./settings/logger";
import { YandexTrackerMcpServer } from "./mcp/YandexTrackerMcpServer";
import { YandexTrackerEndpoint } from "./enums/YandexTrackerEndpoint";
import { config } from "./settings/config";

// инитим необходимые объекты
const app = express();
const yandexTrackerMcpServer = new YandexTrackerMcpServer("shiza", "v1.0.0");
let transportSSE: SSEServerTransport | null = null;
let transportStdio: StdioServerTransport | null = null;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.get(YandexTrackerEndpoint.root, async (req, res) => {
  try{
    // Настраиваем заголовки для SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    transportSSE = await yandexTrackerMcpServer.connectSSE(
      YandexTrackerEndpoint.messagesEdnpoint,
      res
    );
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(YandexTrackerEndpoint.messagesEdnpoint, async (req, res) => {
  await yandexTrackerMcpServer.handleMessages(req, res);
});

// запуск сервака на 3000 порту
app.listen(3000);
