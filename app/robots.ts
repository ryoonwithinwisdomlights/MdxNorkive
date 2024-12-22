import type { MetadataRoute } from "next";
import { BLOG } from "@/blog.config";
/**
 * 
 * robots.txt 파일의 구성은 다음과 같습니다.
    User-Agent: 크롤러의 이름을 나타내는 요소입니다. "*"는 모든 크롤러를 의미합니다.
    Allow: 크롤러가 접근할 수 있는 URL을 나타내는 요소입니다.
    Disallow: 크롤러가 접근할 수 없는 URL을 나타내는 요소입니다.
    Sitemap: 사이트맵 파일의 URL을 나타내는 요소입니다. 이 요소는 사이트맵 파일의 URL을 검색 엔진에게 알려줍니다.
 * 
 * 
 * 
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    host: BLOG.LINK,
    sitemap: `${BLOG.LINK}sitemap.xml`,
  };
}
