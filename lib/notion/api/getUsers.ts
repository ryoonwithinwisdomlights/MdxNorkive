// import { notion_api } from "@/lib/notion/api/notion";
// import * as notion from "notion-types";

// export async function getUsers(
//   pageId,
//   userArr: string[]
// ): Promise<notion.RecordValues<notion.User>> {
//   const start = new Date().getTime();
//   console.time(`⏱️ Notion Fetch: getUsers - \pageId:${pageId}  time:${start}`);
//   const result = await notion_api.getUsers(userArr as string[]);
//   const end = new Date().getTime();
//   console.timeEnd(
//     `⏱️ Notion Fetch: getUsers - \pageId:${pageId}  time:${start}`
//   );
//   console.log(
//     `[API Response] Time consuming:${end - start}ms getUsers-Fetching Success withe Id-${pageId}`
//   );
//   return result;
// }
