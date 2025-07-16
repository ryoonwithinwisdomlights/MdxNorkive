// lib/notion/getPosts.ts
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  BaseArchivePageBlock,
  BaseArchivePageBlock2,
  EmojiPageIconResponse,
  ExternalPageCoverResponse,
  PageCoverResponse,
  PageIconResponse,
} from "@/types/record.model";
import { BLOG } from "@/blog.config";
import { formatDate } from "@/lib/utils/utils";
import { unstable_cache } from "next/cache";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({ auth: BLOG.NOTION_ACCESS_TOKEN });
export const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    parseChildPages: false,
  },
});

export async function fetchPublishedPostsFromNotion(): Promise<QueryDatabaseResponse> {
  const result = await notion.databases.query({
    database_id: BLOG.NOTION_DATABASE_ID!,
    filter: {
      property: "status",
      select: { equals: "Published" },
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  //   return res.results.map((page: any) => {
  //     const props = page.properties;
  //     return {
  //       id: page.id,
  //       title: props.title?.title[0]?.plain_text ?? "",
  //       slug: props.slug?.rich_text[0]?.plain_text ?? "",
  //       category: props.category?.select?.name ?? "",
  //       tags: props.tags?.multi_select?.map((t) => t.name) ?? [],
  //       status: props.status?.select?.name ?? "",
  //       publishDate: new Date(
  //         props?.date?.start_date || props.created_time
  //       ).getTime(),
  //       publishDay: formatDate(props.publishDate, BLOG.LANG),
  //       type: props.type?.select?.name ?? "Record",
  //       favorite: props.favorite?.checkbox ?? false,
  //       summary: props.summary?.rich_text[0]?.plain_text ?? "",
  //       pageIcon: page.icon?.emoji ?? null,
  //       pageCover: page.cover?.external?.url ?? null,
  //     } as BaseArchivePageBlock;
  //   });
  return result;
}

export function getWordCount(content: string): number {
  const cleanText = content
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleanText.split(" ").length;
}

// export async function getPost(pageId: string) {
//   try {
//     const page = (await notion.pages.retrieve({
//       page_id: pageId,
//     }));
//     console.log("page:", page);
//     const result = await n2m.convert(pageId);
//     console.log("result:", result);
//     const contentString = result.content;
//     const properties = page.properties as any;
//     console.log("properties:", properties);
//     const post: BaseArchivePageBlock2 = {
//       id: page.id,
//       title: properties.title.title[0]?.plain_text || "Untitled",
//       pageIcon: (page.icon as EmojiPageIconResponse)?.emoji,
//       slug:
//         properties.title.title[0]?.plain_text
//           .toLowerCase()
//           .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with dash
//           .replace(/^-+|-+$/g, "") || "untitled", // Remove leading/trailing dashes
//       pageCover:
//         (page.cover as ExternalPageCoverResponse)?.external?.url ?? null,
//       date: properties.date?.date?.start || new Date().toISOString(),
//       favorite: properties.favorite?.checkbox ?? false,
//       content: contentString,
//       author: properties.author?.people[0]?.name,
//       password: properties.password?.rich_text[0]?.plain_text ?? "",
//       summary: properties.summary?.rich_text[0]?.plain_text ?? "",
//       tags: properties.tags?.multi_select || [],
//       category: properties.category?.select?.name,
//       status: properties.status?.select?.name ?? "",
//       publishDate: new Date(
//         properties?.date?.start || page.created_time
//       ).getTime(),
//       publishDay: formatDate(
//         new Date(properties?.date?.start || page.created_time).getTime(),
//         BLOG.LANG
//       ),
//       type: properties.type?.select?.name ?? "RECORD",
//       sub_type: properties.sub_type?.select?.name ?? "",
//       lastEditedDate: new Date(page?.last_edited_time),
//       lastEditedDay: formatDate(new Date(page?.last_edited_time), BLOG.LANG),
//     };

//     return post;
//   } catch (error) {
//     console.error("Error getting post:", error);
//     return null;
//   }
// }

export const ARTICLE_CONTENT = (pageId: string) => `${pageId}_content`;

/**
 * 해당 아티클 페이지의 content 부분의 데이터를 불러오는 함수
 */
export const fetchArticlePageContent = (pageId: string) => {
  const cacheKey = ARTICLE_CONTENT(pageId);

  return unstable_cache(
    async (pageId: string) => {
      // await updateImageBlocks(pageId)

      const mdBlocks = await n2m.pageToMarkdown(pageId);
      return n2m.toMarkdownString(mdBlocks);
    },
    [cacheKey],
    {
      tags: [cacheKey],
    }
  )(pageId);
};

// export async function getSinglePage(pageId: string) {
//   const posts = await fetchPublishedPostsFromNotion();
//   const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
//   const post = allPosts.find((p) => p?.id === pageId);
//   const wordCount = post?.content ? getWordCount(post.content) : 0;
//   const result = {
//     post: post,
//     wordCount: wordCount,
//   };

//   const siteUrl = BLOG.isProd ? BLOG.LINK : BLOG.DEV_LINK;
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "BlogPosting",
//     headline: post?.title,
//     description: post?.description,
//     image: post?.pageCover || `${siteUrl}/opengraph-image.png`,
//     datePublished: post?.date,
//     author: {
//       "@type": "Person",
//       name: post?.author || "Guest Author",
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "Your Site Name",
//       logo: {
//         "@type": "ImageObject",
//         url: `${siteUrl}/logo.png`,
//       },
//     },
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": `${siteUrl}/posts/${post?.id}`,
//     },
//   };
//   return result;
// }
