import { Transport } from "@modelcontextprotocol/sdk/shared/transport";
import { TransportStrategy } from "./TransportStrategy";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse";
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
    return transport;
  }
}