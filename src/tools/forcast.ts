import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getLocationForecast } from "../services/weather.js";
import { formatForecastPeriod } from "../utils/formatters.js";

export function registerForecastTool(server: McpServer) {
  server.tool(
    "get-forecast",
    "Get weather forecast for a location",
    {
      latitude: z
        .number()
        .min(-90)
        .max(90)
        .describe("Latitude of the location"),
      longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Longitude of the location"),
    },
    async ({ latitude, longitude }) => {
      const forecastData = await getLocationForecast(latitude, longitude);

      if (!forecastData) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to retrieve forecast data for coordinates: ${latitude}, ${longitude}.`,
            },
          ],
        };
      }

      const periods = forecastData.properties?.periods || [];
      if (periods.length === 0) {
        return {
          content: [{ type: "text", text: "No forecast periods available" }],
        };
      }

      const formattedForecast = periods.map(formatForecastPeriod);
      const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join(
        "\n"
      )}`;

      return {
        content: [{ type: "text", text: forecastText }],
      };
    }
  );
}
