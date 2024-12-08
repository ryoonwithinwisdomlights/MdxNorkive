import { BLOG } from "@/blog.config";
import {
  ChangeFrequency,
  InitGlobalNotionData,
} from "@/lib/providers/provider";
import type { MetadataRoute } from "next";
import loadGlobalNotionData from "@/app/api/load-globalNotionData";
/**
 *
 * Good to know:
 * sitemap.js is a special Route Handlers
 * that is cached by default unless it uses a Dynamic API or dynamic config option.
 *
 */

const dailyVariable: ChangeFrequency = "daily";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const { allPages } = useGlobal({ from: "index" });
  const initGlobalNotionData: InitGlobalNotionData =
    await loadGlobalNotionData("index");
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
      url: `${BLOG.LINK}/sideproject`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/category`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/tag`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
  ];
  // Cycle page generation
  const { allPages } = initGlobalNotionData;
  allPages
    ?.filter((p) => p.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
    .forEach((post) => {
      const slugWithoutLeadingSlash = post?.slug?.startsWith("/")
        ? post?.slug?.slice(1)
        : post.slug;
      urls.push({
        url: `${BLOG.LINK}/${slugWithoutLeadingSlash}`,
        lastModified: new Date(post?.publishDay),
        changeFrequency: dailyVariable,
        priority: 1,
      });
    });

  return urls;
}
