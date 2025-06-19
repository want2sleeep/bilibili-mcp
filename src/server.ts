import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAlertsTool } from "./tools/alerts.js";
import { registerForecastTool } from "./tools/forcast.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export async function startServer() {
  const server = new McpServer({
    name: "weather",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
    },
  });

  // 注册工具
  registerAlertsTool(server);
  registerForecastTool(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}
