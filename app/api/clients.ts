import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { EXTERNAL_CONFIG } from "@/config/external.config";

export const notion = new Client({
  auth: EXTERNAL_CONFIG.NOTION_ACCESS_TOKEN!,
});

export const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    parseChildPages: false,
  },
});
