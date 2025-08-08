import { config } from "dotenv";
import "dotenv/config";
import path from "path";

// .env.local 파일을 명시적으로 로드
config({ path: path.resolve(process.cwd(), ".env.local") });

import fs from "fs/promises";
import matter from "gray-matter";

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import {
  decodeUrlEncodedLinks,
  processMdxContentWithLoggingFn,
  validateAndFixMdxContent,
} from "@/lib/utils/mdx-data-processing/convert-unsafe-content/convert-unsafe-mdx-content-functional";

// 모듈화된 유틸리티들
import {
  getExistingEndDates,
  SlugManager,
  generateUserFriendlySlug,
} from "@/lib/utils/mdx-data-processing/data-manager";
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

export type FrontMatter = {
  title: string;
  slug: string;
  summary: string;
  pageCover: string | null;
  notionId: string;
  password: string;
  type: string;
  sub_type: string;
  category: string;
  tags: string[];
  date: string;
  last_edited_time: string;
  lastEditedDate: string | Date;
  draft: boolean;
  description: string;
  icon: string;
  full: boolean;
  favorite: boolean;
  lastModified: string;
  readingTime: number;
  wordCount: number;
  status: string;
  author: string;
  version: string;
};
type QueryDatabaseResponseArray = Array<
  PageObjectResponse | DatabaseObjectResponse
>;

// === ✅ 환경변수 및 설정 ===
const NOTION_TOKEN = process.env.NOTION_ACCESS_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const BASE_OUTPUT_DIR = path.join(process.cwd(), "TEST");
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// ✅ 슬러그 중복 방지용 매니저
const slugManager = new SlugManager();

// 통계 초기화
resetImageStats();
resetDocumentStats();

async function main() {
  // 매번 실행할 때마다 TEST 디렉토리를 삭제하고 새로 생성
  try {
    await fs.rm(BASE_OUTPUT_DIR, { recursive: true, force: true });
    console.log(`🗑️  기존 'TEST' 디렉토리를 삭제했습니다: ${BASE_OUTPUT_DIR}`);
  } catch (error) {
    // 디렉토리가 없어도 무시
  }

  console.log(`📁 새로운 'TEST' 디렉토리를 생성합니다: ${BASE_OUTPUT_DIR}`);
  await fs.mkdir(BASE_OUTPUT_DIR, { recursive: true });

  let posts;
  try {
    posts = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "type",
        select: { equals: "ENGINEERINGS" },
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
  const existingEndDates = await getExistingEndDates(BASE_OUTPUT_DIR);

  // 배치 처리를 위한 배열
  const pagesToProcess = (posts.results as QueryDatabaseResponseArray).filter(
    (page) => {
      const id = page.id.replace(/-/g, "");
      const last_edited_time = page.last_edited_time;
      return existingEndDates.get(id) !== last_edited_time;
    }
  );

  for (const page of pagesToProcess) {
    try {
      const id = page.id.replace(/-/g, "");

      if (id === "ccbcc665d1eb45c28ba6bfd711d722df") {
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
          // // 안전 변환 적용
          // enhancedContent = decodeUrlEncodedLinks(enhancedContent);

          // // MDX 검증 및 수정
          // console.log(`🔍 MDX 검증 및 수정 시작: ${slug}`);
          // const validationResult = await validateAndFixMdxContent(
          //   enhancedContent,
          //   slug
          // );
          // enhancedContent = validationResult.content;
          // if (!validationResult.isValid) {
          //   console.warn(`⚠️ MDX 검증 실패, 기본 템플릿 사용: ${slug}`);
          // } else {
          //   console.log(`✅ MDX 검증 및 수정 완료: ${slug}`);
          // }

          // 노션 이미지를 Cloudinary URL로 변환
          console.log(`🖼️ 이미지 처리 시작: ${slug}`);
          enhancedContent = await processNotionImages(enhancedContent);

          // 문서 링크를 Cloudinary URL로 변환
          console.log(`📄 문서 링크 처리 시작: ${slug}`);
          enhancedContent = await processDocumentLinks(enhancedContent);

          // // pageCover 이미지를 Cloudinary URL로 변환
          if (pageCover) {
            console.log(`🖼️ pageCover 처리 시작: ${slug}`);
            pageCover = await processPageCover(pageCover);
          }

          // 메타데이터 생성
          const description =
            props.description?.rich_text?.[0]?.plain_text?.trim() || "";
          const icon = props.icon?.emoji || "";
          const full = props.full?.checkbox || false;
          const favorite = props.favorite?.checkbox || false;
          const category = props.category?.select?.name ?? "";
          const tags = props.tags?.multi_select?.map((t: any) => t.name) ?? [];
          const date = props.date?.date?.start || new Date().toISOString();
          const lastEditedDate = last_edited_time
            ? new Date(last_edited_time)
            : date;
          const summary =
            props.summary?.rich_text?.[0]?.plain_text?.trim() || "";
          const password =
            props.password?.rich_text?.[0]?.plain_text?.trim() || "";
          const frontMatter = matter.stringify(enhancedContent, {
            title,
            slug,
            summary,
            pageCover,
            notionId: id,
            password,
            type,
            sub_type,
            category,
            tags,
            date: date.slice(0, 10),
            last_edited_time,
            lastEditedDate,
            draft: false,
            description,
            icon,
            full,
            favorite,
            lastModified: new Date().toISOString().slice(0, 10),
            readingTime: Math.ceil((title.length + description.length) / 200),
            wordCount: title.length + description.length,
            status: "published",
            author: "ryoon",
            version: "1.0.0",
          } as FrontMatter);
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
      }
    } catch (err) {
      console.error(`🔥 TEST Notion → MDX 변환 실패: ${page.id}`);
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

  // Redis 캐시 통계 출력 (개발용 - 필요시 주석 해제)
  // try {
  //   const cacheStats = await imageCacheManager.getCacheStats();
  //   console.log("\n📊 Redis 캐시 통계:");
  //   console.log(`   - 총 캐시된 이미지: ${cacheStats.totalImages}개`);
  //   console.log(
  //     `   - 총 크기: ${(cacheStats.totalSize / 1024 / 1024).toFixed(2)}MB`
  //   );
  //   console.log(`   - 만료된 이미지: ${cacheStats.expiredCount}개`);
  // } catch (error) {
  //   console.log(`\n⚠️ Redis 캐시 통계 조회 실패: ${error}`);
  // }

  console.log("\n🎉 Notion → MDX 변환 및 안전화 통합 완료!");
}

main();
