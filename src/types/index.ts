export interface SearchResult {
  seid: string;
  page: number;
  pagesize: number;
  numResults: number;
  numPages: number;
  result: {
    result_type: string;
    data: Video[];
  }[];
}

export interface Video {
  type: string;
  title: string;
  author: string;
  bvid: string;
  description: string;
  aid: number;
  play: number; // 播放量
  danmaku: number; // 弹幕量
  like: number; // 点赞数
  duration: string; // 视频时长
  pubdate: number; // 发布时间戳
  arcurl: string; // 视频URL
}
