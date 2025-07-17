import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { IMcpComponent } from "./IMcpComponent";

export class McpWriteComponent implements IMcpComponent{
    private _mcpServer: McpServer;
    constructor(mcpServer:McpServer) {
        this._mcpServer = mcpServer;
    }
    
    addTools(): void {
        
    }
    addResources(): void {
        
    }
    addPrompts(): void {
        
    }

}