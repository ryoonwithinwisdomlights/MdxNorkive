import "dotenv/config";
import { config } from "dotenv";

import { imageCacheManager } from "@/lib/cache/image_cache_manager";
import { uploadImageFromUrl, uploadPdfFromUrl } from "@/lib/cloudinary";
import {
  decodeUrlEncodedLinks,
  processMdxContent,
} from "@/lib/utils/convert-unsafe-mdx-content";
import { generateUserFriendlySlug } from "@/lib/utils/slug";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import fs from "fs/promises";
import matter from "gray-matter";
import { NotionToMarkdown } from "notion-to-md";
import path from "path";
import { validateMdxContent } from "@/lib/utils/mdx-validator";

// .env.local 파일을 명시적으로 로드
config({ path: path.resolve(process.cwd(), ".env.local") });

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

// ✅ 슬러그 중복 방지용 Set
const slugSet = new Set<string>();

// ✅ 이미지 처리 통계
let processedImagesCount = 0;
let cloudinaryUploadCount = 0;
let cacheHitCount = 0;
let processedPageCoversCount = 0;

// ✅ PDF 처리 통계
let processedFilesCount = 0;
let cloudinaryFileUploadCount = 0;

// 1. 기존 MDX 파일의 notionId → endDate 매핑
async function getExistingEndDates() {
  const map = new Map();
  const baseDir = BASE_OUTPUT_DIR;
  const typeDirs = await fs.readdir(baseDir);
  for (const typeDir of typeDirs) {
    const dirPath = path.join(baseDir, typeDir);
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) continue;
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const content = await fs.readFile(path.join(dirPath, file), "utf-8");
        const fm = matter(content).data;
        if (fm.notionId && fm.last_edited_time) {
          map.set(fm.notionId, fm.last_edited_time);
        }
      }
    }
  }
  return map;
}

/**
 * pageCover 이미지 URL을 Cloudinary URL로 변환
 */
async function processPageCover(
  pageCover: string | null
): Promise<string | null> {
  if (!pageCover) return null;

  // Unsplash 이미지 URL인지 확인
  if (isUnsplashImageUrl(pageCover)) {
    // console.log(`🖼️ Unsplash pageCover 처리: ${extractFileName(pageCover)}`);
    // const cloudinaryUrl = await getOrCreateCloudinaryUrl(
    //   pageCover,
    //   "pagecover"
    // );
    // processedPageCoversCount++;
    return pageCover;
  }

  // Notion 만료 이미지 URL인지 확인
  if (isNotionExpiringImageUrl(pageCover)) {
    console.log(`🖼️ Notion 만료 pageCover 처리: ${extractFileName(pageCover)}`);
    const cloudinaryUrl = await getOrCreateCloudinaryUrl(
      pageCover,
      "pagecover"
    );
    processedPageCoversCount++;
    return cloudinaryUrl;
  }

  // 이미 Cloudinary URL이거나 다른 안전한 URL인 경우 그대로 반환
  return pageCover;
}

/**
 * Unsplash 이미지 URL인지 확인
 */
function isUnsplashImageUrl(url: string): boolean {
  return url.startsWith("https://images.unsplash.com");
}

/**
 * Notion 만료 이미지 URL인지 확인
 */
function isNotionExpiringImageUrl(url: string): boolean {
  return url.startsWith("https://prod-files-secure.s3.us-west-2.amazonaws.com");
}

/**
 * 노션 이미지 URL을 Cloudinary URL로 변환
 */
async function processNotionImages(content: string): Promise<string> {
  // 마크다운 이미지 문법 처리: ![alt](url)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let processedContent = content;

  const markdownMatches = [...content.matchAll(markdownImageRegex)];
  for (const match of markdownMatches) {
    const [fullMatch, alt, imageUrl] = match;

    // alt 텍스트에 파일 확장자가 있고, 그 확장자가 이미지이고, URL이 Notion URL인 경우만 처리
    if (alt && isImageFile(alt) && isNotionImageUrl(imageUrl)) {
      console.log(`🖼️ 이미지 파일 감지: ${alt}`);
      const cloudinaryUrl = await getOrCreateCloudinaryUrl(imageUrl, "content");
      const newImageTag = `![${alt}](${cloudinaryUrl})`;
      processedContent = processedContent.replace(fullMatch, newImageTag);
      processedImagesCount++;
    }
  }

  // HTML img 태그 처리: <img src="url">
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  const htmlMatches = [...processedContent.matchAll(htmlImageRegex)];

  for (const match of htmlMatches) {
    const [fullMatch, imageUrl] = match;

    if (isNotionImageUrl(imageUrl)) {
      const cloudinaryUrl = await getOrCreateCloudinaryUrl(imageUrl, "content");
      const newImageTag = fullMatch.replace(imageUrl, cloudinaryUrl);
      processedContent = processedContent.replace(fullMatch, newImageTag);
      processedImagesCount++;
    }
  }

  return processedContent;
}

/**
 * 문서 링크를 Cloudinary URL로 변환 (PDF, DOC, RTF 등)
 */
async function processDocumentLinks(content: string): Promise<string> {
  // 문서 링크 패턴: [파일명.확장자](URL)
  const documentLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  let processedContent = content;
  let match;

  while ((match = documentLinkRegex.exec(content)) !== null) {
    const [fullMatch, fileName, documentUrl] = match;

    // 파일명이 문서 확장자를 가지고 있고, URL이 Notion URL인 경우만 처리
    if (fileName && isDocumentFile(fileName) && isNotionImageUrl(documentUrl)) {
      try {
        console.log(`📄 문서 처리 중: ${fileName} (${documentUrl})`);

        // Redis에서 캐시된 URL 확인
        const cachedUrl = await imageCacheManager.getCachedImageUrl(
          documentUrl
        );

        let cloudinaryUrl: string;

        if (cachedUrl) {
          cacheHitCount++;
          console.log(`🔄 문서 캐시 히트: ${fileName}`);
          cloudinaryUrl = cachedUrl;
        } else {
          // 문서를 Cloudinary에 업로드
          const result = await uploadPdfFromUrl(documentUrl, fileName);

          // Redis에 캐시 정보 저장
          await imageCacheManager.cacheImageUrl(
            documentUrl,
            result.secure_url,
            {
              fileName: fileName,
              size: result.bytes,
              contentType: "application/octet-stream", // 일반 문서 타입
            }
          );

          cloudinaryUrl = result.secure_url;
          cloudinaryFileUploadCount++;
          console.log(
            `✅ 문서 업로드 완료: ${fileName} → ${result.secure_url}`
          );
        }

        // 원본 링크를 Cloudinary URL로 교체
        const newLink = `[${fileName}](${cloudinaryUrl})`;
        processedContent = processedContent.replace(fullMatch, newLink);
        processedFilesCount++;
      } catch (error) {
        console.error(`❌ 문서 업로드 실패: ${fileName}`, error);
        // 실패한 경우 원본 링크 유지
      }
    }
  }

  return processedContent;
}

/**
 * 노션 이미지 URL인지 확인
 */
function isNotionImageUrl(url: string): boolean {
  return (
    url.includes("prod-files-secure.s3.us-west-2.amazonaws.com") ||
    url.includes("s3.us-west-2.amazonaws.com") ||
    url.includes("notion.so")
  );
}

/**
 * 파일 확장자가 이미지인지 확인
 */
function isImageFile(fileName: string): boolean {
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "ico",
    "tiff",
    "tif",
    "JPG",
    "JPEG",
    "PNG",
    "GIF",
    "BMP",
    "WEBP",
    "SVG",
    "ICO",
    "TIFF",
    "TIF",
  ];

  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension ? imageExtensions.includes(extension) : false;
}

/**
 * 파일 확장자가 문서인지 확인
 */
function isDocumentFile(fileName: string): boolean {
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "rtf",
    "txt",
    "md",
    "odt",
    "PDF",
    "DOC",
    "DOCX",
    "RTF",
    "TXT",
    "MD",
    "ODT",
  ];

  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension ? documentExtensions.includes(extension) : false;
}

/**
 * Cloudinary URL 생성 또는 기존 캐시 사용
 */
async function getOrCreateCloudinaryUrl(
  originalUrl: string,
  type: "content" | "pagecover" = "content"
): Promise<string> {
  try {
    // Redis에서 캐시된 URL 확인
    const cachedUrl = await imageCacheManager.getCachedImageUrl(originalUrl);

    if (cachedUrl) {
      cacheHitCount++;
      console.log(`🔄 캐시 히트: ${extractFileName(originalUrl)}`);
      return cachedUrl;
    }

    // 캐시된 URL이 없으면 Cloudinary에 업로드
    console.log(`☁️ Cloudinary 업로드 시작: ${extractFileName(originalUrl)}`);
    const fileName = extractFileName(originalUrl);
    const cloudinaryResult = await uploadImageFromUrl(originalUrl, fileName);

    // Redis에 캐시 정보 저장
    await imageCacheManager.cacheImageUrl(
      originalUrl,
      cloudinaryResult.secure_url,
      {
        fileName: fileName,
        size: cloudinaryResult.bytes,
        contentType: `image/${cloudinaryResult.format}`,
      }
    );

    cloudinaryUploadCount++;
    console.log(
      `✅ Cloudinary 업로드 완료: ${fileName} → ${cloudinaryResult.secure_url}`
    );

    return cloudinaryResult.secure_url;
  } catch (error) {
    console.error(`❌ 이미지 처리 실패: ${originalUrl}`, error);
    // 실패 시 원본 URL 반환
    return originalUrl;
  }
}

/**
 * 파일명 추출
 */
function extractFileName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    let fileName = pathname.split("/").pop() || "image.jpg";

    if (fileName.includes("?")) {
      fileName = fileName.split("?")[0];
    }

    // 안전한 파일명으로 변환
    const safeFileName = fileName
      .replace(/[^a-zA-Z0-9가-힣._-]/g, "_")
      .replace(/_{2,}/g, "_")
      .replace(/^_|_$/g, "");

    return safeFileName || `image_${Date.now()}.jpg`;
  } catch (error) {
    return `image_${Date.now()}.jpg`;
  }
}

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
  // 2. Notion DB에서 endDate 비교 후, 변경된 페이지만 변환
  const existingEndDates = await getExistingEndDates();
  for (const page of posts.results as QueryDatabaseResponseArray) {
    try {
      const id = page.id.replace(/-/g, "");

      if (id === "ccbcc665d1eb45c28ba6bfd711d722df") {
        // 테스트용으로 모든 페이지 처리 (특정 ID 제한 제거)
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
        const slug = generateUserFriendlySlug(sub_type, title, slugSet);
        if (existingEndDates.get(id) !== last_edited_time) {
          const mdBlocks = await n2m.pageToMarkdown(page.id);
          const { parent: content } = n2m.toMarkdownString(mdBlocks);
          if (!content || content.trim() === "") {
            console.warn(`❌ 마크다운 콘텐츠 없음: ${page.id}`);
            continue;
          }

          let enhancedContent = content;

          // console.log(`📄 문서 링크 처리 시작: ${slug}`);
          enhancedContent = await processDocumentLinks(enhancedContent);

          // 안전 변환 적용
          enhancedContent = decodeUrlEncodedLinks(enhancedContent);
          enhancedContent = processMdxContent(enhancedContent);
          // 노션 이미지를 Cloudinary URL로 변환
          console.log(`🖼️ 이미지 처리 시작: ${slug}`);
          enhancedContent = await processNotionImages(enhancedContent);

          // // pageCover 이미지를 Cloudinary URL로 변환
          if (pageCover) {
            console.log(`🖼️ pageCover 처리 시작: ${slug}`);
            pageCover = await processPageCover(pageCover);
          }

          // enhancedContent = await processMdxContent(enhancedContent);
          // MDX 검증 및 수정
          // const validationResult = await validateMdxContent(
          //   enhancedContent,
          //   slug
          // );
          // enhancedContent = validationResult.content;
          // if (!validationResult.isValid) {
          //   console.warn(`⚠️ MDX 검증 실패, 기본 템플릿 사용: ${slug}`);
          // }

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
        } else {
          console.log(`🎉 이미 최신 버전: ${slug} → ${type}`);
        }
      }
    } catch (err) {
      console.error(`🔥 TEST Notion → MDX 변환 실패: ${page.id}`);
      console.error(err);
      continue;
    }
  }

  // 이미지 처리 통계 출력
  console.log("\n📊 이미지 처리 통계:");
  console.log(`   - 총 처리된 이미지: ${processedImagesCount}개`);
  console.log(`   - 처리된 pageCover: ${processedPageCoversCount}개`);
  console.log(`   - Cloudinary 업로드: ${cloudinaryUploadCount}개`);
  console.log(`   - 캐시 히트: ${cacheHitCount}개`);

  // 문서 처리 통계 출력
  console.log("\n📄 문서 처리 통계:");
  console.log(`   - 총 처리된 문서: ${processedFilesCount}개`);
  console.log(`   - Cloudinary 문서 업로드: ${cloudinaryFileUploadCount}개`);

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

  console.log("\n🎉 TEST Notion → MDX 변환 및 Cloudinary 이미지 처리 완료!");
}

main();
