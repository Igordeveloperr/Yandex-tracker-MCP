import { Transport } from "@modelcontextprotocol/sdk/shared/transport";

export interface TransportStrategy {
  connect(): Promise<Transport>;
  onClose?(callback: () => void): void;
  onError?(callback: (err: Error) => void): void;
}