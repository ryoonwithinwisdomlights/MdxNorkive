import { BLOG } from "@/blog.config";
import { formatDate } from "@/lib/utils/date";
import type { MetadataRoute } from "next";
import { fetchAllRecordList } from "./api/fetcher";
import type { RecordFrontMatter } from "@/types/mdx.model";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/**
 *
 * Good to know:
 * sitemap.js is a special Route Handlers
 * that is cached by default unless it uses a Dynamic API or dynamic config option.
 *
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let allRecordList: RecordFrontMatter[] = [];

  try {
    allRecordList = await fetchAllRecordList();
  } catch (error) {
    console.warn("Failed to fetch records from Notion API:", error);
    // 빌드 시 Notion API 접근이 실패할 경우 빈 배열 사용
    allRecordList = [];
  }

  const dailyVariable: ChangeFrequency = "daily";

  const urls = [
    {
      url: `${BLOG.LINK}`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}records`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}project`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}engineering`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
  ];

  allRecordList.forEach((record) => {
    const lmd = record.lastEditedTime
      ? formatDate(record.date, BLOG.LANG)
      : formatDate(record.lastEditedTime, BLOG.LANG);
    urls.push({
      url: `${BLOG.LINK}${record.type.toLowerCase()}/${record.notionId}`,
      lastEditedTime: lmd,
      changeFrequency: dailyVariable,
      priority: 1,
    });
  });
  return urls;
}
