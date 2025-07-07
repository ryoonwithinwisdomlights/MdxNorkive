import { BLOG } from "@/blog.config";
import { getGlobalRecordPageData } from "@/lib/db/serviceImpl";
import { formatDate } from "@/lib/utils/utils";
import type { MetadataRoute } from "next";
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
  const globalData = await getGlobalRecordPageData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
  });
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
  const { allPages } = globalData;
  allPages
    ?.filter((p) => p.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
    .forEach((record) => {
      const lmd = record.lastEditedDate
        ? formatDate(record.date.start_date, BLOG.LANG)
        : formatDate(record.lastEditedDate, BLOG.LANG);
      urls.push({
        url: `${BLOG.LINK}${record.type.toLowerCase()}/${record.id}`,
        lastModified: lmd,
        changeFrequency: dailyVariable,
        priority: 1,
      });
    });

  return urls;
}
