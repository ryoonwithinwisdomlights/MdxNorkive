import { BLOG } from "@/blog.config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
export const notion = new Client({ auth: BLOG.NOTION_ACCESS_TOKEN });
export const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    parseChildPages: false,
  },
});
export const fetchAllRecordList = async () => {
  const queryResponse = await notion.databases.query({
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
};

export const fetchAllMenuList = async () => {
  const queryResponse = await notion.databases.query({
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
};
