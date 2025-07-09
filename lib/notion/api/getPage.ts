import { notion_api } from "@/lib/notion/api/notion";
import { ExtendedRecordMap } from "notion-types";

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const start = new Date().getTime();
  console.time(`⏱️ Notion Fetch: getPage - ${pageId} time:${start}`);
  const result = await notion_api.getPage(pageId);
  const end = new Date().getTime();
  console.timeEnd(`⏱️ Notion Fetch: getPage - ${pageId} time:${start}`);
  console.log(
    `[API Response] Time consuming:${end - start}ms getPage-Fetching Success withe Id-${pageId}`
  );
  return result;
}
