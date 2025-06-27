import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { TransportStrategy } from "./TransportStrategy";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Response, Request } from "express";

export class SSETransportStrategy implements TransportStrategy {
  constructor(
    private endpoint: string,
    private response: Response,
    private transportsRegistry: Record<string, SSEServerTransport> // Хранилище активных соединений
  ) {}

  createTransport(): Transport {
    const transport = new SSEServerTransport(this.endpoint, this.response);
    this.transportsRegistry[transport.sessionId] = transport;
    this.response.on("close", () => {
      // TODO: Добавить лог закрытия соединения
      delete this.transportsRegistry[transport.sessionId];
      transport.close();
    });

    this.response.on("error", (err) => {
      // TODO: Добавить лог ошибки соединения
      delete this.transportsRegistry[transport.sessionId];
      transport.close();
    });
    // this.transportsRegistry[transport.sessionId] = transport;
    return transport;
  }
}