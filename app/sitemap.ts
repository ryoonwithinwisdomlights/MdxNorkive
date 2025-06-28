import loadGlobalNotionData from "@/lib/data/actions/notion/getNotionData";
import { BLOG } from "@/blog.config";

import type { MetadataRoute } from "next";

import { InitGlobalNotionData } from "@/types";
import { formatDate } from "@/lib/utils/utils";
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
  const initGlobalNotionData: InitGlobalNotionData =
    await loadGlobalNotionData("index");
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
      url: `${BLOG.LINK}devproject`,
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
  const { allArchive } = initGlobalNotionData;
  allArchive
    ?.filter((p) => p.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
    .forEach((post) => {
      const lmd = post.lastEditedDate
        ? formatDate(post.date.start_date, BLOG.LANG)
        : formatDate(post.lastEditedDate, BLOG.LANG);
      // console.log(`lmd: ${lmd}`);
      urls.push({
        url: `${BLOG.LINK}${post.type.toLowerCase()}/${post.id}`,
        lastModified: lmd,
        changeFrequency: dailyVariable,
        priority: 1,
      });
    });

  return urls;
}
