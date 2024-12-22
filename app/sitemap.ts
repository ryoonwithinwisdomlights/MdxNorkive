import loadGlobalNotionData from "@/app/api/load-globalNotionData";
import { BLOG } from "@/blog.config";
import { ChangeFrequency } from "@/lib/providers/provider";
import type { MetadataRoute } from "next";

/**
 *
 * Good to know:
 * sitemap.js is a special Route Handlers
 * that is cached by default unless it uses a Dynamic API or dynamic config option.
 *
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const initGlobalNotionData: any = await loadGlobalNotionData("index");
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
  const { allPosts } = initGlobalNotionData;
  allPosts
    ?.filter((p) => p.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
    .forEach((post) => {
      const lmd = post.lastEditedDate
        ? new Date(post.date.start_date).toISOString().split("T")[0]
        : new Date(post.lastEditedDate).toISOString().split("T")[0];
      console.log(`lmd: ${lmd}`);
      urls.push({
        url: `${BLOG.LINK}${post.type.toLowerCase()}/${post.id}`,
        lastModified: lmd,
        changeFrequency: dailyVariable,
        priority: 1,
      });
    });

  return urls;
}
