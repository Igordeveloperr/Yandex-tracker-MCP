import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import type { Response } from "express";
// import { Request } from "express"; // Не используется
import type { TransportStrategy } from "./TransportStrategy";

export class SSETransportStrategy implements TransportStrategy {
  constructor(
    private endpoint: string,
    private response: Response,
    private transportsRegistry: Record<string, SSEServerTransport>, // Хранилище активных соединений
  ) {}

  createTransport(): Transport {
    const transport = new SSEServerTransport(this.endpoint, this.response);
    this.transportsRegistry[transport.sessionId] = transport;
    this.response.on("close", () => {
      // TODO: Добавить лог закрытия соединения
      delete this.transportsRegistry[transport.sessionId];
      transport.close();
    });

    this.response.on("error", (_err) => {
      // TODO: Добавить лог ошибки соединения
      delete this.transportsRegistry[transport.sessionId];
      transport.close();
    });
    // this.transportsRegistry[transport.sessionId] = transport;
    return transport;
  }
}
