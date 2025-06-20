import { Video } from "../types/index.js";

/**
 * 格式化Bilibili视频搜索结果
 * @param {Array} videos - 视频搜索结果数组
 * @returns {string} - 格式化后的结果字符串
 */
export function formatVideos(videos: Video[]) {
  return videos
    .map((video, index) => {
      return [
        `${index + 1}. "${video.title}" - ${video.author}`,
        ` BVID: ${video.bvid}`,
        ` Views: ${video.play?.toLocaleString()}`,
        ` Danmaku: ${video.danmaku?.toLocaleString()}`,
        ` Likes: ${video.like?.toLocaleString()}`,
        ` Duration: ${video.duration}`,
        ` Published: ${formatTimestamp(video.pubdate)}`,
        ` Description: ${video.description?.substring(0, 100)}${
          video.description?.length > 100 ? "..." : ""
        }`,
      ].join("\n");
    })
    .join("\n\n");
}

/**
 * 格式化时间戳为可读日期
 * @param {number} timestamp - Unix时间戳
 * @returns {string} - 格式化后的日期字符串
 */
export function formatTimestamp(timestamp: number): string {
  if (!timestamp) return "未知时间";

  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("格式化时间戳出错:", error);
    return "时间格式错误";
  }
}
