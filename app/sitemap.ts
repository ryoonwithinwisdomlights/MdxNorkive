import type { MetadataRoute } from "next";
import { BLOG } from "@/blog.config";
import { useGlobal } from "@/lib/providers/globalProvider";
/**
 *
 * Good to know:
 * sitemap.js is a special Route Handlers
 * that is cached by default unless it uses a Dynamic API or dynamic config option.
 *
 */
type changeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const dailyVariable: changeFrequency = "daily";

export default function sitemap(): MetadataRoute.Sitemap {
  const { allPages } = useGlobal({ from: "index" });

  const urls = [
    {
      url: `${BLOG.LINK}`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/archive`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/techlog`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/general`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/writing`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },
    {
      url: `${BLOG.LINK}/agiveawaylog`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
      priority: 1,
    },

    {
      url: `${BLOG.LINK}/inspiration`,
      lastModified: new Date(),
      changeFrequency: dailyVariable,
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
