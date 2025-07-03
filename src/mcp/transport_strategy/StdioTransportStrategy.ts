import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { TransportStrategy } from "./TransportStrategy";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export class StdioTransportStrategy implements TransportStrategy {
  createTransport(): Transport {
    return new StdioServerTransport();
  }
}