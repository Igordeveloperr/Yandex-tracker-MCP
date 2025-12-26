import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { TransportStrategy } from "./TransportStrategy";

export class StdioTransportStrategy implements TransportStrategy {
  createTransport(): Transport {
    return new StdioServerTransport();
  }
}
