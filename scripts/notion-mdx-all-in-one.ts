import { config } from "dotenv";
import "dotenv/config";
import path from "path";

// .env.local 파일을 명시적으로 로드
config({ path: path.resolve(process.cwd(), ".env.local") });

import fs from "fs/promises";

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import {
  decodeUrlEncodedLinks,
  processMdxContentWithLoggingFn,
  validateAndFixMdxContent,
} from "@/lib/utils/mdx-data-processing/convert-unsafe-mdx/content-functional";

// 모듈화된 유틸리티들
import {
  printDocumentStats,
  processDocumentLinks,
  resetDocumentStats,
} from "@/lib/utils/mdx-data-processing/cloudinary/document-processor";
import {
  printImageStats,
  processNotionImages,
  processPageCover,
  resetImageStats,
} from "@/lib/utils/mdx-data-processing/cloudinary/image-processor";
import {
  generateCompleteMdxFile,
  generateUserFriendlySlug,
  getExistingEndDates,
  SlugManager,
} from "@/lib/utils/mdx-data-processing/data-manager";

import { OriginalQueryDatabaseResponseArray } from "@/app/api/types";

// === ✅ 환경변수 및 설정 ===
const NOTION_TOKEN = process.env.NOTION_ACCESS_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// ✅ 슬러그 중복 방지용 매니저
const slugManager = new SlugManager();

// 통계 초기화
resetImageStats();
resetDocumentStats();

async function main() {
  // content 디렉토리가 없으면 생성
  try {
    await fs.access(BASE_OUTPUT_DIR);
    console.log(`📁 'content' 디렉토리가 이미 존재합니다: ${BASE_OUTPUT_DIR}`);
  } catch (error) {
    console.log(`📁 'content' 디렉토리를 생성합니다: ${BASE_OUTPUT_DIR}`);
    await fs.mkdir(BASE_OUTPUT_DIR, { recursive: true });
  }

  // Cloudinary 이미지 처리 시스템 초기화
  // console.log("☁️ Cloudinary 이미지 처리 시스템 준비 완료");

  let posts;
  try {
    posts = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "status",
        select: { equals: "Published" },
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
    posts.results as OriginalQueryDatabaseResponseArray
  ).filter((page) => {
    const id = page.id.replace(/-/g, "");
    const last_edited_time = page.last_edited_time;
    return existingEndDates.get(id) !== last_edited_time;
  });

  console.log(
    `🔄 ${pagesToProcess.length}개의 변경된 페이지를 함수형 파이프라인으로 처리합니다.`
  );

  for (const page of pagesToProcess) {
    try {
      const id = page.id.replace(/-/g, "");
      const props = page.properties as any;
      const last_edited_time = page.last_edited_time;
      let pageCover: string | null = null;
      if (page.cover) {
        if (page.cover.type === "external") {
          pageCover = page.cover.external.url;
        } else if (page.cover.type === "file") {
          pageCover = page.cover.file.url;
        }
      }
      const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
      const type = props.type?.select?.name;
      const sub_type = props.sub_type?.select?.name || "";
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

        // 노션 이미지를 Cloudinary URL로 변환
        console.log(`🖼️ 이미지 처리 시작: ${slug}`);
        enhancedContent = await processNotionImages(enhancedContent);

        // 문서 링크를 Cloudinary URL로 변환
        console.log(`📄 문서 링크 처리 시작: ${slug}`);
        enhancedContent = await processDocumentLinks(enhancedContent);

        // pageCover 이미지를 Cloudinary URL로 변환
        if (pageCover) {
          console.log(`🖼️ pageCover 처리 시작: ${slug}`);
          pageCover = await processPageCover(pageCover);
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

  // 통계 출력
  printImageStats();
  printDocumentStats();

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
