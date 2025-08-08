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
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}records`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}project`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}engineering`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
  ];
  // Cycle page generation
  // const { allPages } = globalData;
  // allPages
  //   ?.filter((p) => p.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
  //   .forEach((record) => {
  //     const lmd = record.lastEditedDat
  //       ? formatDate(record.date, BLOG.LANG)
  //       : formatDate(record.lastEditedDate, BLOG.LANG);
  //     urls.push({
  //       url: `${BLOG.LINK}${record.type.toLowerCase()}/${record.id}`,
  //       lastModified: lmd,
  //       changeFrequency: dailyVariable,
  //       priority: 1,
  //     });
  //   });

  allRecordList.forEach((record) => {
    const lmd = record.lastEditedDate
      ? formatDate(record.date, BLOG.LANG)
      : formatDate(record.lastEditedDate, BLOG.LANG);
    urls.push({
      url: `${BLOG.LINK}${record.type.toLowerCase()}/${record.notionId}`,
      lastModified: lmd,
      changeFrequency: dailyVariable,
      priority: 1,
    });
  });
  return urls;
}
