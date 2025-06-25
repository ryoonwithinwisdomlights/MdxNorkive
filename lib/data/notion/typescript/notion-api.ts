import { BLOG } from "@/blog.config";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { getPageProperty } from "notion-utils";
const authToken = null;
const activeUser = BLOG.NOTION_ACTIVE_USER || null;
export const notionData = new NotionAPI({
  // apiBaseUrl: process.env.NOTION_API_BASE_URL,
  // authToken,
  // activeUser,
  userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notionData.getPage(pageId);

  return recordMap;
}

export async function customedNotionData(recordMap) {
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]!]?.value;
  const res = getPageProperty("slug", block, recordMap);
  // console.log("res:", res);
  return res;
}
export async function testGetPP(pageId: string) {
  const page = await getPage(pageId);
  const res = await customedNotionData(customedNotionData);
  return res;
}

//properties
