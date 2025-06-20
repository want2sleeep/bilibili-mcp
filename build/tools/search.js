import { z } from "zod";
import { search } from "bilibili-api-ts/search.js";
import { formatVideos } from "../utils/formatters.js";
export function registerSearchTools(server) {
    server.tool("search_videos", {
        keyword: z.string().describe("搜索关键词"),
        page: z.number().int().min(1).default(1).describe("页码"),
    }, async function ({ keyword, page }) {
        try {
            const res = (await search({ keyword, page })) || {};
            if (!res.result || res.result.length === 0) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `No videos found related to "${keyword}".`,
                        },
                    ],
                };
            }
            const videos = res.result.filter((item) => item.result_type === "video")[0].data;
            const formattedVideos = formatVideos(videos);
            return {
                content: [
                    {
                        type: "text",
                        text: [
                            `Search results for "${keyword}":`,
                            formattedVideos,
                            `Found ${res.numResults} related videos in total, currently showing ${videos.length} results from page ${page}.`,
                        ].join("\n"),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to search videos: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    });
}
