import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchTools } from "./tools/search.js";
const server = new McpServer({
    name: "bilibili-mcp",
    version: "1.0.0",
});
async function main() {
    try {
        registerSearchTools(server);
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.log("Bilibili MCP Server running on stdio");
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
