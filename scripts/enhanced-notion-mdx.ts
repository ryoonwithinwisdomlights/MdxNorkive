#!/usr/bin/env tsx

import { config } from "dotenv";
import path from "path";

// .env.local 파일을 명시적으로 로드
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  config({ path: path.resolve(process.cwd(), ".env.local") });
}

import {
  EnhancedMdxGenerator,
  MdxGenerationOptions,
} from "@/lib/mdx/enhanced-mdx-generator";
import { notion } from "./clients";
import { EXTERNAL_CONFIG } from "@/config/external.config";
import { DEV_CONFIG } from "@/config/dev.config";

// === ✅ 환경변수 및 설정 ===
const DATABASE_ID = EXTERNAL_CONFIG.NOTION_DATABASE_ID!;
const BASE_OUTPUT_DIR = path.join(process.cwd(), DEV_CONFIG.DIR_NAME);

// === ✅ 향상된 MDX 생성기 설정 ===
const generatorOptions: MdxGenerationOptions = {
  parallel: true, // 병렬 처리 활성화
  maxConcurrency: 4, // 동시 처리 최대 4개
  enableCaching: true, // 메모리 캐싱 활성화
  retryAttempts: 3, // 재시도 3회
  outputDir: BASE_OUTPUT_DIR,
};

const mdxGenerator = new EnhancedMdxGenerator(generatorOptions);

// === ✅ 통계 및 모니터링 ===
let startTime: number;
let totalPages = 0;
let processedPages = 0;

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    console.log("🚀 향상된 Notion → MDX 변환 시작");
    console.log(`📁 출력 디렉토리: ${BASE_OUTPUT_DIR}`);
    console.log(`⚙️ 설정: ${JSON.stringify(generatorOptions, null, 2)}`);

    startTime = Date.now();

    // 1. 데이터베이스에서 모든 페이지 ID 가져오기
    const pageIds = await getAllPageIdsFromNotion();
    totalPages = pageIds.length;

    console.log(`📊 총 ${totalPages}개 페이지 발견`);

    if (pageIds.length === 0) {
      console.log("❌ 처리할 페이지가 없습니다");
      return;
    }

    // 2. 출력 디렉토리 정리
    await cleanupOutputDirectory();

    // 3. 병렬 MDX 생성 실행
    const results = await mdxGenerator.generateMdxFilesInParallel(
      pageIds,
      BASE_OUTPUT_DIR
    );

    // 4. 결과 분석 및 보고
    await analyzeResults(results);
  } catch (error) {
    console.error("❌ 메인 실행 중 오류 발생:", error);
    process.exit(1);
  }
}

/**
 * Notion 데이터베이스에서 모든 페이지 ID 가져오기
 */
async function getAllPageIdsFromNotion(): Promise<string[]> {
  try {
    console.log("🔍 Notion 데이터베이스에서 페이지 ID 수집 중...");

    let hasMore = true;
    let nextCursor: string | null = null;
    const pageIds: string[] = [];

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          and: [
            {
              property: "status",
              select: {
                equals: "Published",
              },
            },
            {
              property: "type",
              select: {
                is_not_empty: true,
              },
            },
          ],
        },
        start_cursor: nextCursor ?? undefined,
        page_size: 100,
      });

      const pages = response.results;
      pageIds.push(...pages.map((page: any) => page.id));

      hasMore = response.has_more;
      nextCursor = response.next_cursor;

      console.log(`📄 ${pageIds.length}개 페이지 ID 수집 완료`);
    }

    return pageIds;
  } catch (error) {
    console.error("❌ 페이지 ID 수집 실패:", error);
    throw error;
  }
}

/**
 * 출력 디렉토리 정리
 */
async function cleanupOutputDirectory(): Promise<void> {
  try {
    console.log("🧹 출력 디렉토리 정리 중...");

    const fs = await import("fs/promises");

    // 기존 content 디렉토리 백업 (선택사항)
    const backupDir = `${BASE_OUTPUT_DIR}_backup_${Date.now()}`;
    try {
      await fs.rename(BASE_OUTPUT_DIR, backupDir);
      console.log(`💾 기존 디렉토리 백업: ${backupDir}`);
    } catch (error) {
      // 디렉토리가 없으면 무시
      console.log("ℹ️ 백업할 기존 디렉토리가 없습니다");
    }

    // 새 디렉토리 생성
    await fs.mkdir(BASE_OUTPUT_DIR, { recursive: true });
    console.log("✅ 출력 디렉토리 준비 완료");
  } catch (error) {
    console.error("❌ 디렉토리 정리 실패:", error);
    throw error;
  }
}

/**
 * 결과 분석 및 보고
 */
async function analyzeResults(results: any[]): Promise<void> {
  const totalTime = Date.now() - startTime;
  const stats = mdxGenerator.getStats();

  console.log("\n" + "=".repeat(60));
  console.log("📊 MDX 생성 완료 보고서");
  console.log("=".repeat(60));

  // 기본 통계
  console.log(`⏱️ 총 소요 시간: ${(totalTime / 1000).toFixed(2)}초`);
  console.log(`📄 총 페이지: ${totalTime}`);
  console.log(`✅ 성공: ${stats.success}`);
  console.log(`❌ 실패: ${stats.failed}`);
  console.log(`📈 성공률: ${((stats.success / totalPages) * 100).toFixed(1)}%`);
  console.log(`⚡ 평균 처리 시간: ${stats.avgTime.toFixed(2)}ms`);
  console.log(`💾 메모리 사용량: ${mdxGenerator.getMemoryUsage()}개 캐시 항목`);

  // 성능 분석
  if (totalTime > 0) {
    const pagesPerSecond = (totalPages / (totalTime / 1000)).toFixed(2);
    console.log(`🚀 처리 속도: ${pagesPerSecond} 페이지/초`);
  }

  // 실패한 항목들 상세 분석
  const failedResults = results.filter((r) => !r.success);
  if (failedResults.length > 0) {
    console.log("\n❌ 실패한 항목들:");
    failedResults.forEach((result) => {
      console.log(`  - ${result.pageId}: ${result.error}`);
    });
  }

  // 성공한 항목들 중 가장 큰 파일
  const successfulResults = results.filter((r) => r.success);
  if (successfulResults.length > 0) {
    const largestFile = successfulResults.reduce((max, current) =>
      current.fileSize > max.fileSize ? current : max
    );
    console.log(
      `\n📁 가장 큰 파일: ${largestFile.slug} (${(
        largestFile.fileSize / 1024
      ).toFixed(1)}KB)`
    );
  }

  console.log("=".repeat(60));

  // 성공률이 낮으면 경고
  if (stats.success / totalPages < 0.9) {
    console.warn("⚠️ 성공률이 90% 미만입니다. 실패한 항목들을 확인해주세요.");
  }

  // 성능 권장사항
  if (stats.avgTime > 5000) {
    console.log("💡 성능 개선 권장사항:");
    console.log("  - maxConcurrency를 줄여보세요");
    console.log("  - 병렬 처리를 비활성화해보세요");
    console.log("  - 캐싱을 활성화하세요");
  }
}

/**
 * 에러 핸들링 및 정리
 */
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ 처리되지 않은 Promise 거부:", reason);
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("\n🛑 사용자에 의해 중단됨");
  console.log("🧹 정리 중...");

  // 캐시 정리
  mdxGenerator.clearCache();

  console.log("✅ 정리 완료");
  process.exit(0);
});

// 메인 함수 실행
if (require.main === module) {
  main().catch((error) => {
    console.error("❌ 치명적 오류:", error);
    process.exit(1);
  });
}
