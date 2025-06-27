import express from "express";
import { YandexTrackerMcpServer } from "./mcp/YandexTrackerMcpServer";
import { YandexTrackerEndpoint } from "./enums/YandexTrackerEndpoint";
import { config } from "./settings/config";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport";
import { SSETransportStrategy } from "./mcp/transport_strategy/SSETransportStrategy";

// инитим необходимые объекты

const yandexTrackerMcpServer = new YandexTrackerMcpServer("shiza", "v1.0.0");
let transport: Transport | null = null;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// endpoints
app.get(YandexTrackerEndpoint.root, async (req, res) => {
  try{
    // Настраиваем заголовки для SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const transportStrategy = new SSETransportStrategy(
      YandexTrackerEndpoint.messagesEdnpoint,
      res,
      yandexTrackerMcpServer.transports.sse
    );
    transport = await yandexTrackerMcpServer.connectWithStrategy(transportStrategy);
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(YandexTrackerEndpoint.messagesEdnpoint, async (req, res) => {
  await yandexTrackerMcpServer.handleSSEMessages(req, res);
});

// запуск сервака на 3000 порту
app.listen(3000);
