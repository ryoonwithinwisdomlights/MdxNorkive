/**
 * Notion 데이터 관리 유틸리티
 * 기존 MDX 파일들의 메타데이터 관리 및 중복 처리
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { RecordFrontMatter } from "@/types/mdx.model";
import { QueryPageResponse } from "@/types/notion.client.model";
import { BLOG } from "@/blog.config";
import { EXTERNAL_CONFIG } from "@/config/external.config";

/**
 * MDX frontmatter 전체를 파싱하여 객체로 반환
 * ex) const frontmatter = parseFrontmatter(content);
 *     결과: { title: '...', slug: '...', summary: '', ... }
 */
export function parseFrontmatter(content: string): Record<string, any> {
  try {
    const { data } = matter(content);
    return data;
  } catch (error) {
    console.warn(`Frontmatter 파싱 실패: ${error}`);
    return {};
  }
}

/**
 * MDX frontmatter에서 특정 값을 추출
 * ex) const title = extractFrontmatterValue(content, 'title');
 *     결과: '궁극의 아키텍처 로드맵: Notion → MDX → 정적 블로그'
 */
export function extractFrontmatterValue(
  content: string,
  key: string
): string | undefined {
  try {
    const { data } = matter(content);
    return data[key];
  } catch (error) {
    console.warn(`Frontmatter 파싱 실패: ${error}`);
    return undefined;
  }
}

/**
 * Notion 페이지 데이터로부터 RecordFrontMatter 메타데이터 생성
 *
 * @param props Notion 페이지 속성
 * @param id Notion 페이지 ID
 * @param last_edited_time 마지막 수정 시간
 * @param pageCover 페이지 커버 이미지 URL
 * @param enhancedContent 처리된 콘텐츠
 * @returns RecordFrontMatter 객체
 */
export function generateRecordFrontMatter(
  props: QueryPageResponse["properties"],
  slug: string,
  id: string,
  last_edited_time: string,
  pageCover: string | null,
  enhancedContent: string
): RecordFrontMatter {
  // 기본 메타데이터 추출
  const title =
    props.title?.title
      ?.reduce((acc, block) => {
        return acc + (block.plain_text || "");
      }, "")
      ?.trim() || "Untitled";
  const description = props.summary?.rich_text?.[0]?.plain_text?.trim() || "";
  const icon = ""; //임시
  const full = false;
  const favorite = props.favorite?.checkbox || false;
  const category = props.category?.select?.name ?? "";
  const tags = props.tags?.multi_select?.map((t: any) => t.name) ?? [];
  const date = props.date?.date?.start;
  // last_edited_time 유효성 검사 및 안전한 날짜 생성
  let lastEditedDate: Date;
  if (last_edited_time) {
    const parsedDate = new Date(last_edited_time);
    if (isNaN(parsedDate.getTime())) {
      // last_edited_time이 유효하지 않은 경우 date 사용
      lastEditedDate = date ? new Date(date) : new Date();
    } else {
      lastEditedDate = parsedDate;
    }
  } else {
    lastEditedDate = date ? new Date(date) : new Date();
  }

  // 최종 유효성 검사
  if (isNaN(lastEditedDate.getTime())) {
    lastEditedDate = new Date();
  }
  const summary = props.summary?.rich_text?.[0]?.plain_text?.trim() || "";
  const password = props.password?.rich_text?.[0]?.plain_text?.trim() || "";
  const type = props.type?.select?.name || "RECORDS";
  const sub_type = props.sub_type?.select?.name || "RECORDS";

  // 계산된 메타데이터
  const readingTime = Math.ceil((title.length + enhancedContent.length) / 200);
  const wordCount = title.length + enhancedContent.length;
  const lastModified = new Date().toISOString().slice(0, 10);

  return {
    title,
    slug, // slug는 별도로 생성해야 함
    summary,
    pageCover,
    notionId: id,
    password,
    type,
    sub_type,
    category,
    tags,
    favorite,
    date: date ? date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    last_edited_time: last_edited_time || new Date().toISOString(),
    lastEditedDate,
    draft: false,
    description,
    icon,
    full,
    lastModified,
    readingTime,
    wordCount,
    status: "published",
    author: BLOG.AUTHOR,
    version: "1.0.0",
  };
}

/**
 * 메타데이터를 frontmatter 문자열로 변환
 *
 * @param frontMatter 메타데이터 객체
 * @param content MDX 콘텐츠
 * @returns frontmatter가 포함된 MDX 문자열
 */
export function stringifyFrontMatter(
  frontMatter: RecordFrontMatter,
  content: string
): string {
  return matter.stringify(content, frontMatter);
}

/**
 * Notion 페이지 데이터로부터 완전한 MDX 파일 생성
 *
 * @param props Notion 페이지 속성
 * @param id Notion 페이지 ID
 * @param last_edited_time 마지막 수정 시간
 * @param pageCover 페이지 커버 이미지 URL
 * @param enhancedContent 처리된 콘텐츠
 * @param slug 생성된 슬러그
 * @returns frontmatter가 포함된 MDX 문자열
 */
export function generateCompleteMdxFile(
  props: QueryPageResponse["properties"],
  id: string,
  last_edited_time: string,
  pageCover: string | null,
  enhancedContent: string,
  slug: string
): string {
  const frontMatter = generateRecordFrontMatter(
    props,
    slug,
    id,
    last_edited_time,
    pageCover,
    enhancedContent
  );

  // slug 설정
  // frontMatter.slug = slug;

  return stringifyFrontMatter(frontMatter, enhancedContent);
}

/**
 * 기존 MDX 파일의 notionId → endDate 매핑 생성
 */
export async function getExistingEndDates(
  baseDir: string = path.join(process.cwd(), EXTERNAL_CONFIG.DIR_NAME)
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  console.log("baseDir::", baseDir);
  try {
    const typeDirs = await fs.readdir(baseDir);

    for (const typeDir of typeDirs) {
      const dirPath = path.join(baseDir, typeDir);
      const stat = await fs.stat(dirPath);

      if (!stat.isDirectory()) continue;

      const files = await fs.readdir(dirPath);

      for (const file of files) {
        if (file.endsWith(".mdx")) {
          try {
            const content = await fs.readFile(
              path.join(dirPath, file),
              "utf-8"
            );
            const fm = matter(content).data as any;

            if (fm.notionId && fm.last_edited_time) {
              // 기존 MDX 파일의 notionId는 이미 하이픈이 제거된 형태
              map.set(fm.notionId, fm.last_edited_time);
            }
          } catch (error) {
            console.warn(`⚠️ 파일 읽기 실패: ${file}`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error(`❌ 디렉토리 읽기 실패: ${baseDir}`, error);
  }

  return map;
}

/**
 * 슬러그 중복 방지를 위한 Set 관리
 */
export class SlugManager {
  private slugSet = new Set<string>();

  /**
   * 슬러그 추가 (중복 확인)
   */
  addSlug(slug: string): boolean {
    if (this.slugSet.has(slug)) {
      return false; // 중복됨
    }
    this.slugSet.add(slug);
    return true; // 추가됨
  }

  /**
   * 슬러그 존재 여부 확인
   */
  hasSlug(slug: string): boolean {
    return this.slugSet.has(slug);
  }

  /**
   * 슬러그 제거
   */
  removeSlug(slug: string): boolean {
    return this.slugSet.delete(slug);
  }

  /**
   * 모든 슬러그 반환
   */
  getAllSlugs(): string[] {
    return Array.from(this.slugSet);
  }

  /**
   * 슬러그 개수 반환
   */
  getSlugCount(): number {
    return this.slugSet.size;
  }

  /**
   * 모든 슬러그 초기화
   */
  clear(): void {
    this.slugSet.clear();
  }
}
