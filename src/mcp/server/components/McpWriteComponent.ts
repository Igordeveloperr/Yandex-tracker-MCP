import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { IMcpComponent } from "./IMcpComponent";

export class McpWriteComponent implements IMcpComponent {
  private mcpServer: McpServer;
  constructor(mcpServer: McpServer) {
    this.mcpServer = mcpServer;
  }

  addTools(): void {
    // Implementation for adding tools specific to write operations
  }

  addResources(): void {
    // Implementation for adding resources specific to write operations
  }

  addPrompts(): void {
    // Implementation for adding prompts specific to write operations
  }
}
