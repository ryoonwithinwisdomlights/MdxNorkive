import "server-only";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import "dotenv/config";

const NOTION_ACCESS_TOKEN = process.env.NOTION_ACCESS_TOKEN!;

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
});

export const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    parseChildPages: false,
  },
});
