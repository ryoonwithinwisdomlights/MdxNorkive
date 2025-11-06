import { BLOG } from "@/blog.config";
import { formatDate } from "@/lib/utils/date";
import type { MetadataRoute } from "next";
import { fetchAllDocsList } from "./api/fetcher";
import type { DocFrontMatter } from "@/types/mdx.model";

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
  let allDocsList: DocFrontMatter[] = [];

  try {
    allDocsList = await fetchAllDocsList();
  } catch (error) {
    console.warn("Failed to fetch Docs from Notion API:", error);
    // 빌드 시 Notion API 접근이 실패할 경우 빈 배열 사용
    allDocsList = [];
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
      url: `${BLOG.LINK}docs`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}portfolios`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}techs`,
      lastEditedTime: new Date().toISOString().split("T")[0],
      changeFrequency: dailyVariable,
      priority: 1,
    },
  ];

  allDocsList.forEach((doc) => {
    const lmd = doc.lastEditedTime
      ? formatDate(doc.date, BLOG.LANG)
      : formatDate(doc.lastEditedTime, BLOG.LANG);
    urls.push({
      url: `${BLOG.LINK}${doc.type.toLowerCase()}/${doc.notionId}`,
      lastEditedTime: lmd,
      changeFrequency: dailyVariable,
      priority: 1,
    });
  });
  return urls;
}
