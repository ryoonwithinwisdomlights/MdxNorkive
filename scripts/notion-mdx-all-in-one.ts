import { config } from "dotenv";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  config({ path: path.resolve(process.cwd(), ".env.local") });
}

import { generateUserFriendlySlug } from "@/lib/utils";

import {
  generateCompleteMdxFile,
  getExistingEndDates,
  SlugManager,
} from "@/lib/utils/mdx-data-processing";

import {
  decodeUrlEncodedLinks,
  processMdxContentWithLoggingFn,
  validateAndFixMdxContent,
} from "@norkive/mdx-safe-processor";

// 패키지에서 직접 import
import {
  createMediaProcessor,
  type CloudinaryUploader,
  type CacheManager,
} from "@norkive/mdx-media-processor";
import { imageCacheManager } from "@/lib/cache/image_cache_manager";
import {
  uploadImageFromUrl,
  uploadPdfFromUrl,
  uploadFileFromUrl,
} from "@/lib/cloudinary";

// 이미지 최적화 기능 추가
import {
  processMdxImagesToWebP,
  processPageCoverToWebP,
} from "@/lib/utils/mdx-data-processing/cloudinary/enhanced-image-processor";

import { DEV_CONFIG } from "@/config/dev.config";
import { EXTERNAL_CONFIG } from "@/config/external.config";
import {
  ModifiedQueryDatabaseResponseArray,
  QueryPageResponse,
} from "@/types/notion.client.model";
import { n2m, notion } from "./clients";

// === ✅ 환경변수 및 설정 ===

const DATABASE_ID = EXTERNAL_CONFIG.NOTION_DATABASE_ID!;
const BASE_OUTPUT_DIR = path.join(process.cwd(), DEV_CONFIG.DIR_NAME);

// ✅ 슬러그 중복 방지용 매니저
const slugManager = new SlugManager();

// Media Processor 초기화 (패키지 사용)
const uploader: CloudinaryUploader = {
  uploadFileFromUrl: async (url: string, fileName: string) => {
    return await uploadFileFromUrl(url, fileName);
  },
  uploadImageFromUrl: async (url: string, fileName: string) => {
    return await uploadImageFromUrl(url, fileName);
  },
  uploadPdfFromUrl: async (url: string, fileName: string) => {
    return await uploadPdfFromUrl(url, fileName);
  },
};

const cache: CacheManager = {
  getCachedImageUrl: async (originalUrl: string) => {
    return await imageCacheManager.getCachedImageUrl(originalUrl);
  },
  cacheImageUrl: async (
    originalUrl: string,
    cachedUrl: string,
    metadata?: {
      fileName?: string;
      size?: number;
      contentType?: string;
    }
  ) => {
    await imageCacheManager.cacheImageUrl(originalUrl, cachedUrl, metadata);
  },
};

const mediaProcessor = createMediaProcessor({
  uploader,
  cache,
});

async function main() {
  // content 디렉토리가 없으면 생성
  try {
    await fs.access(BASE_OUTPUT_DIR);
    console.log(`📁 'content' 디렉토리가 이미 존재합니다: ${BASE_OUTPUT_DIR}`);
  } catch (error) {
    console.log(`📁 'content' 디렉토리를 생성합니다: ${BASE_OUTPUT_DIR}`);
    await fs.mkdir(BASE_OUTPUT_DIR, { recursive: true });
  }

  let posts;
  try {
    posts = await notion.databases.query({
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
              does_not_equal: "Menu",
            },
          },
          {
            property: "type",
            select: {
              does_not_equal: "SubMenu",
            },
          },
        ],
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });
  } catch (err) {
    console.error("❌ Notion DB 쿼리 실패:", err);
    process.exit(1);
  }

  console.log(`📊 총 ${posts.results.length}개의 게시물을 처리합니다.`);

  // 함수형 파이프라인 통계
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // 2. Notion DB에서 endDate 비교 후, 변경된 페이지만 변환
  const existingEndDates = await getExistingEndDates();

  // 배치 처리를 위한 배열
  const pagesToProcess = (
    posts.results as ModifiedQueryDatabaseResponseArray
  ).filter((page) => {
    const id = page.id.replace(/-/g, "");
    console.log(`🔍 ID: ${id}`);
    const last_edited_time = page.last_edited_time;
    const existingTime = existingEndDates.get(id);
    const isChanged = existingTime !== last_edited_time;
    const isNewPage = existingTime === undefined;

    if (isNewPage) {
      console.log(`🆕 새로 추가된 페이지: ${id}`);
    } else if (isChanged) {
      console.log(
        `🔄 변경된 페이지: ${id} \n🔍 기존: ${existingTime}, 현재: ${last_edited_time}, 변경됨: ${isChanged}`
      );
    }

    return isChanged;
  });

  console.log(
    `🔄 ${pagesToProcess.length}개의 변경된 페이지를 함수형 파이프라인으로 처리합니다.`
  );

  for (const page of pagesToProcess) {
    try {
      const id = page.id.replace(/-/g, "");
      const props = page.properties as QueryPageResponse["properties"];
      const last_edited_time = page.last_edited_time;
      let pageCover: string | null = null;
      if (page.cover) {
        if (page.cover.type === "external") {
          pageCover = page.cover.external.url;
        } else if (page.cover.type === "file") {
          pageCover = page.cover.file.url;
        }
      }

      // Notion title은 여러 text 블록으로 구성되어 있으므로 모든 plain_text를 합침
      const title =
        props.title?.title
          ?.reduce((acc, block) => {
            return acc + (block.plain_text || "");
          }, "")
          ?.trim() || "Untitled";
      const type = props.type?.select?.name || "";

      // 사용자 친화적 슬러그 생성
      const slug = generateUserFriendlySlug(
        type,
        title,
        new Set(slugManager.getAllSlugs())
      );

      if (existingEndDates.get(id) !== last_edited_time) {
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const { parent: content } = n2m.toMarkdownString(mdBlocks);
        if (!content || content.trim() === "") {
          console.warn(`❌ 마크다운 콘텐츠 없음: ${page.id}`);
          continue;
        }

        let enhancedContent = content;

        // 노션 이미지를 Cloudinary URL로 변환 (패키지 사용)
        console.log(`🖼️ 이미지 처리 시작: ${slug}`);
        enhancedContent = await mediaProcessor.processNotionImages(
          enhancedContent
        );

        // 문서 링크를 Cloudinary URL로 변환 (패키지 사용)
        console.log(`📄 문서 링크 처리 시작: ${slug}`);
        enhancedContent = await mediaProcessor.processDocumentLinks(
          enhancedContent
        );

        // pageCover 이미지를 Cloudinary URL로 변환 (패키지 사용)
        if (pageCover) {
          console.log(`🖼️ pageCover 처리 시작: ${slug}`);
          pageCover = await mediaProcessor.processPageCover(pageCover);
        }

        // 🆕 WebP 이미지 최적화 적용
        console.log(`🔄 WebP 이미지 최적화 시작: ${slug}`);
        try {
          enhancedContent = await processMdxImagesToWebP(enhancedContent, {
            quality: 85,
            progressive: true,
          });

          if (pageCover) {
            pageCover = await processPageCoverToWebP(pageCover, {
              quality: 90,
              progressive: true,
            });
          }
          console.log(`✅ WebP 이미지 최적화 완료: ${slug}`);
        } catch (error) {
          console.warn(`⚠️ WebP 이미지 최적화 실패, 원본 사용: ${slug}`, error);
        }

        // 함수형 파이프라인을 사용한 MDX 처리
        console.log(`🔄 함수형 MDX 파이프라인 처리 시작: ${slug}`);

        try {
          // 1단계: URL 디코딩
          enhancedContent = decodeUrlEncodedLinks(enhancedContent);

          // 2단계: 함수형 파이프라인으로 MDX 처리 (로깅 포함)
          enhancedContent = processMdxContentWithLoggingFn(enhancedContent);

          console.log(`✅ 함수형 MDX 파이프라인 처리 완료: ${slug}`);
        } catch (error) {
          console.warn(
            `⚠️ 함수형 파이프라인 처리 실패, 기존 방식으로 폴백: ${slug}`
          );

          // 폴백: 기존 검증 방식 사용
          const validationResult = await validateAndFixMdxContent(
            enhancedContent,
            slug
          );
          enhancedContent = validationResult.content;
          if (!validationResult.isValid) {
            console.warn(`⚠️ MDX 검증 실패, 기본 템플릿 사용: ${slug}`);
          }
        }
        // 메타데이터 생성 (data-manager.ts의 함수 사용)
        const frontMatter = generateCompleteMdxFile(
          props,
          id,
          last_edited_time,
          pageCover,
          enhancedContent,
          slug
        );
        const dir = path.join(BASE_OUTPUT_DIR, type.toLowerCase());
        await fs.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, `${slug}.mdx`);
        await fs.writeFile(filePath, frontMatter, "utf-8");
        console.log(`✅ Notion → MDX 변환+안전화 완료: ${slug} → ${type}`);
        processedCount++;
      } else {
        console.log(`🎉 이미 최신 버전: ${slug} → ${type}`);
        skippedCount++;
      }
    } catch (err) {
      console.error(`🔥 Notion → MDX 변환 실패: ${page.id}`);
      console.error(err);
      errorCount++;
      continue;
    }
  }

  // 통계 출력 (패키지 사용)
  mediaProcessor.printImageStats();
  mediaProcessor.printDocumentStats();

  // 함수형 파이프라인 통계 출력
  console.log("\n📊 함수형 MDX 파이프라인 통계:");
  console.log(`   - 처리된 페이지: ${processedCount}개`);
  console.log(`   - 건너뛴 페이지: ${skippedCount}개`);
  console.log(`   - 오류 발생: ${errorCount}개`);
  console.log(
    `   - 총 처리율: ${((processedCount / pagesToProcess.length) * 100).toFixed(
      1
    )}%`
  );

  console.log("\n🎉 Notion → MDX 변환 및 안전화 통합 완료!");
}

main();
