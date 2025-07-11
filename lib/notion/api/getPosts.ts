// lib/notion/getPosts.ts
import { Client, PageObjectResponse } from "@notionhq/client";
import { BaseArchivePageBlock } from "@/types/record.model";
import { BLOG } from "@/blog.config";
import { formatDate } from "@/lib/utils/utils";
import { NotionConverter } from "notion-to-md";

export const notion = new Client({ auth: BLOG.NOTION_ACCESS_TOKEN });
const n2m = new NotionConverter(notion);

export async function fetchPublishedPostsFromNotion(): Promise<
  BaseArchivePageBlock[]
> {
  const res = await notion.databases.query({
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

  return res.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props.title?.title[0]?.plain_text ?? "",
      slug: props.slug?.rich_text[0]?.plain_text ?? "",
      category: props.category?.select?.name ?? "",
      tags: props.tags?.multi_select?.map((t) => t.name) ?? [],
      status: props.status?.select?.name ?? "",
      publishDate: new Date(
        props?.date?.start_date || props.created_time
      ).getTime(),
      publishDay: formatDate(props.publishDate, BLOG.LANG),
      type: props.type?.select?.name ?? "Record",
      favorite: props.favorite?.checkbox ?? false,
      summary: props.summary?.rich_text[0]?.plain_text ?? "",
      pageIcon: page.icon?.emoji ?? null,
      pageCover: page.cover?.external?.url ?? null,
    } as BaseArchivePageBlock;
  });
}

export async function getPost(
  pageId: string
): Promise<BaseArchivePageBlock | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;
    const result = await n2m.convert(pageId);
    // The result object also contains block data, page properties, etc.
    const contentString = result.content;
    // Access the Markdown content

    // Get first paragraph for description (excluding empty lines)
    const paragraphs = contentString
      .split("\n")
      .filter((line: string) => line.trim().length > 0);
    const firstParagraph = paragraphs[0] || "";
    const description =
      firstParagraph.slice(0, 160) + (firstParagraph.length > 160 ? "..." : "");
    const properties = page.properties as any;

    const post: BaseArchivePageBlock = {
      id: page.id,
      description: description,
      title: properties.title.title[0]?.plain_text || "Untitled",
      slug:
        properties.title.title[0]?.plain_text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with dash
          .replace(/^-+|-+$/g, "") || "untitled", // Remove leading/trailing dashes
      pageCover: page.cover?.type["external"]?.url ?? null,
      date: properties["date"]?.date?.start || new Date().toISOString(),
      content: contentString,
      author: properties.author?.people[0]?.name,
      tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
      category: properties.category?.select?.name,
      status: properties.status?.select?.name ?? "",
      publishDate: new Date(
        properties?.date?.start_date || page.created_time
      ).getTime(),
      publishDay: properties?.date?.start_date || "",
      type: properties.type?.select?.name ?? "Record",
      favorite: properties.favorite?.checkbox ?? false,
      summary: properties.summary?.rich_text[0]?.plain_text ?? "",
    };

    return post;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}
