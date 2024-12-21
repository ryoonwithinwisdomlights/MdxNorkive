import { loadGlobalNotionPageIdData } from "@/app/api/load-globalNotionData";
import { BLOG } from "@/blog.config";
import {
  AllPageIds,
  ChangeFrequency,
  InitGlobalNotionData,
} from "@/lib/providers/provider";
import type { MetadataRoute } from "next";

/**
 *
 * Good to know:
 * sitemap.js is a special Route Handlers
 * that is cached by default unless it uses a Dynamic API or dynamic config option.
 *
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const initGlobalNotionPageIdData: InitGlobalNotionData =
    await loadGlobalNotionPageIdData("index");
  const dailyVariable: ChangeFrequency = "daily";

  const urls = [
    {
      url: `${BLOG.LINK}`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/records`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/devproject`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/engineering`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
  ];
  // Cycle page generation
  const { allPageIds } = initGlobalNotionPageIdData;
  allPageIds
    ?.filter((p) => p.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
    .forEach((post) => {
      console.log(`initGlobalNotionPageIdData::::`);
      console.log(`${BLOG.LINK}/${post.id}`);
      urls.push({
        url: `${BLOG.LINK}/${post.type.toLowerCase()}/${post.id}`,
        lastModified: new Date(),
        changeFrequency: dailyVariable,
        priority: 1,
      });
    });

  return urls;
}
