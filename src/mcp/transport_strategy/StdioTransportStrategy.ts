import { Transport } from "@modelcontextprotocol/sdk/shared/transport";
import { TransportStrategy } from "./TransportStrategy";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

export class StdioTransportStrategy implements TransportStrategy{
    createTransport(): Transport {
        return new StdioServerTransport();
    }

}