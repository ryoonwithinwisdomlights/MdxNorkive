import type { MetadataRoute } from "next";
import { BLOG } from "@/blog.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    host: BLOG.LINK,
    sitemap: `${BLOG.LINK}/sitemap.xml`,
  };
}
