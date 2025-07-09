// src/app/api/cron/update-records/route.ts
import { NextResponse } from "next/server";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { BLOG } from "@/blog.config";
import { getAllPageIdForCache } from "@/lib/notion/api/getAllPageIdForCache";
import { getRecordBlockMapWithRetry } from "@/lib/notion/api/getPageWithRetry";

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
  console.log(
    "🛎️ [CRON PING] /api/cron/update-records 호출됨 -",
    new Date().toISOString()
  );

  const targetPageIds = await getAllPageIdForCache(
    BLOG.NOTION_DATABASE_ID as string
  );

  if (!targetPageIds.length) {
    return NextResponse.json({ status: "no page ids found" }, { status: 500 });
  }

  const result: fecthRes[] = [];

  for (const pageId of targetPageIds) {
    const cacheKey = `page_block_${pageId}`;

    try {
      const cached = await getDataFromCache(cacheKey);
      const recordMap = await getRecordBlockMapWithRetry({
        pageId: pageId,
        from: "cron-refresh",
        retryAttempts: 3,
      });

      if (!recordMap) {
        result.push({ pageId, status: "notion fetch failed" });
        continue;
      }

      const freshTime = extractLastEditedTime(recordMap, pageId);
      const cachedTime = extractLastEditedTime(cached, pageId);

      const changed = !cachedTime || freshTime !== cachedTime;

      if (changed) {
        await setDataToCache(cacheKey, recordMap);
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
    ping: new Date().toISOString(), // 실행 시각 기록
    result,
  });
}
