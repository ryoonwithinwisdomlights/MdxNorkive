// src/app/api/cron/update-posts/route.ts
import { NextResponse } from "next/server";
// import { getPostBlocks } from "@/lib/notion/getPostBlocks";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { getAllPageIds2, getRecordBlockMapWithRetry } from "@/lib/data/data";
import { BLOG } from "@/blog.config";

// const targetPageIds = [
//   "abc123xyz456", // 예시: 전체 블로그 DB ID
//   "def789ghi000", // 예시: About 페이지
//   // 필요한 Notion 페이지 ID들 추가,
//   // ...추가 페이지
// ];
function extractLastEditedTime(
  recordMap: any,
  pageId: string
): string | undefined {
  const block = recordMap?.block?.[pageId]?.value;
  return block?.last_edited_time ?? undefined;
}

type fecthRes = {
  pageId: string;
  status: string;
  freshTime?: string;
  cachedTime?: string;
  error?: string;
};
export async function GET() {
  const targetPageIds = await getAllPageIds2(BLOG.NOTION_DATABASE_ID as string); // status === "Published"만

  if (!targetPageIds.length) {
    return NextResponse.json({ status: "no page ids found" }, { status: 500 });
  }

  const result: fecthRes[] = [];

  for (const pageId of targetPageIds) {
    const cacheKey = `page_block_${pageId}`;

    try {
      const cached = await getDataFromCache(cacheKey);
      const fresh = await getRecordBlockMapWithRetry({
        pageId: pageId,
        from: "cron-refresh",
        retryAttempts: 3,
      });

      if (!fresh) {
        result.push({ pageId, status: "notion fetch failed" });
        continue;
      }

      const freshTime = extractLastEditedTime(fresh, pageId);
      const cachedTime = extractLastEditedTime(cached, pageId);

      const changed = !cachedTime || freshTime !== cachedTime;

      if (changed) {
        await setDataToCache(cacheKey, fresh);
        result.push({ pageId, status: "updated", freshTime });
      } else {
        result.push({ pageId, status: "unchanged" });
      }
    } catch (err) {
      result.push({ pageId, status: "error", error: String(err) });
    }
  }

  return NextResponse.json({
    status: "cron complete",
    updatedCount: result.filter((r) => r.status === "updated").length,
    total: result.length,
    result,
  });
}
