import type { Transport } from "@modelcontextprotocol/sdk/shared/transport";

export interface TransportStrategy {
  createTransport(): Transport;
}
