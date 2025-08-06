import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { imageCacheManager } from "@/lib/cache/image_cache_manager";
import RedisImageProcessor from "@/scripts/redis-image-processor";
import { NextResponse } from "next/server";

interface ProcessResult {
  pageId: string;
  status: "success" | "error" | "unchanged";
  mdxGenerated?: boolean;
  imagesProcessed?: number;
  error?: string;
}

export async function GET() {
  console.log("🛎️ [CRON] 노션 MDX 자동 처리 시작 -", new Date().toISOString());

  try {
    // 1. 노션에서 모든 페이지 ID 가져오기
    const targetPageIds = await getAllPageIdsFromNotion();

    if (!targetPageIds.length) {
      return NextResponse.json(
        {
          status: "no pages found",
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    console.log(`📄 처리할 페이지 수: ${targetPageIds.length}`);

    const results: ProcessResult[] = [];
    let successCount = 0;
    let errorCount = 0;
    let totalImagesProcessed = 0;

    // 2. 각 페이지별로 MDX 생성 및 이미지 처리
    for (const pageId of targetPageIds) {
      try {
        const result = await processSinglePage(pageId);
        results.push(result);

        if (result.status === "success") {
          successCount++;
          totalImagesProcessed += result.imagesProcessed || 0;
        } else if (result.status === "error") {
          errorCount++;
        }

        console.log(`✅ ${pageId}: ${result.status}`);
      } catch (error) {
        console.error(`❌ 페이지 처리 실패: ${pageId}`, error);
        results.push({
          pageId,
          status: "error",
          error: String(error),
        });
        errorCount++;
      }
    }

    // 3. 전체 MDX 파일들의 이미지 일괄 처리
    console.log("🔄 전체 MDX 파일 이미지 처리 시작...");
    const imageProcessor = new RedisImageProcessor();
    await imageProcessor.processAllMdxFiles();

    // 4. 캐시 통계 수집
    const cacheStats = await imageCacheManager.getCacheStats();

    console.log("🎉 노션 MDX 자동 처리 완료!");

    return NextResponse.json({
      status: "success",
      timestamp: new Date().toISOString(),
      summary: {
        totalPages: targetPageIds.length,
        successCount,
        errorCount,
        totalImagesProcessed,
        cacheStats,
      },
      results,
    });
  } catch (error) {
    console.error("❌ 노션 MDX 자동 처리 중 오류:", error);
    return NextResponse.json(
      {
        status: "error",
        error: String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * 노션에서 모든 페이지 ID 가져오기
 */
async function getAllPageIdsFromNotion(): Promise<string[]> {
  // 실제 구현에서는 노션 API를 사용하여 데이터베이스의 모든 페이지 ID를 가져옴
  // 현재는 주석 처리된 기존 코드를 참고하여 구현

  try {
    // 노션 데이터베이스에서 모든 페이지 ID 조회
    // const response = await fetch(`https://api.notion.com/v1/databases/${BLOG.NOTION_DATABASE_ID}/query`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
    //     'Notion-Version': '2022-06-28',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     filter: {
    //       property: 'Status',
    //       select: {
    //         equals: 'Published'
    //       }
    //     }
    //   })
    // });

    // const data = await response.json();
    // return data.results.map((page: any) => page.id);

    // 임시로 빈 배열 반환 (실제 구현 시 위 코드로 교체)
    return [];
  } catch (error) {
    console.error("노션 페이지 ID 조회 실패:", error);
    return [];
  }
}

/**
 * 단일 페이지 처리
 */
async function processSinglePage(pageId: string): Promise<ProcessResult> {
  try {
    // 1. 캐시된 페이지 데이터 확인
    const cacheKey = `page_block_${pageId}`;
    const cached = await getDataFromCache(cacheKey);

    // 2. 노션에서 최신 데이터 가져오기
    const recordMap = await getRecordBlockMapWithRetry({
      pageId,
      from: "cron-auto-process",
      retryAttempts: 3,
    });

    if (!recordMap) {
      return {
        pageId,
        status: "error",
        error: "노션 데이터 가져오기 실패",
      };
    }

    // 3. 변경사항 확인
    const freshTime = extractLastEditedTime(recordMap, pageId);
    const cachedTime = extractLastEditedTime(cached, pageId);
    const hasChanged = !cachedTime || freshTime !== cachedTime;

    if (!hasChanged) {
      return {
        pageId,
        status: "unchanged",
      };
    }

    // 4. 캐시 업데이트
    await setDataToCache(cacheKey, recordMap);

    // 5. MDX 생성 (기존 스크립트 활용)
    const mdxGenerated = await generateMdxFromRecordMap(recordMap, pageId);

    // 6. 이미지 처리
    const imagesProcessed = await processImagesInMdx(pageId);

    return {
      pageId,
      status: "success",
      mdxGenerated,
      imagesProcessed,
    };
  } catch (error) {
    return {
      pageId,
      status: "error",
      error: String(error),
    };
  }
}

/**
 * 레코드 맵에서 MDX 생성
 */
async function generateMdxFromRecordMap(
  recordMap: any,
  pageId: string
): Promise<boolean> {
  try {
    // 기존 notion-mdx-all-in-one.ts의 로직을 활용하여 MDX 생성
    // 실제 구현에서는 기존 스크립트의 함수들을 import하여 사용

    console.log(`📝 MDX 생성: ${pageId}`);
    return true;
  } catch (error) {
    console.error(`MDX 생성 실패: ${pageId}`, error);
    return false;
  }
}

/**
 * MDX 파일의 이미지 처리
 */
async function processImagesInMdx(pageId: string): Promise<number> {
  try {
    // 해당 페이지의 MDX 파일에서 이미지 처리
    // RedisImageProcessor를 활용하여 이미지 URL을 프록시 URL로 교체

    console.log(`🖼️ 이미지 처리: ${pageId}`);
    return 0; // 처리된 이미지 수 반환
  } catch (error) {
    console.error(`이미지 처리 실패: ${pageId}`, error);
    return 0;
  }
}

/**
 * 마지막 수정 시간 추출
 */
function extractLastEditedTime(
  recordMap: any,
  pageId: string
): string | undefined {
  const block = recordMap?.block?.[pageId]?.value;
  return block?.last_edited_time ?? undefined;
}

/**
 * 노션 데이터 가져오기 (재시도 로직 포함)
 */
async function getRecordBlockMapWithRetry({
  pageId,
  from,
  retryAttempts = 3,
}: {
  pageId: string;
  from: string;
  retryAttempts?: number;
}): Promise<any> {
  // 실제 구현에서는 기존 노션 API 호출 로직을 활용
  // 현재는 임시로 null 반환

  console.log(`📡 노션 데이터 가져오기: ${pageId} (${from})`);
  return null;
}
