/**
 * Notion 데이터 관리 유틸리티
 * 기존 MDX 파일들의 메타데이터 관리 및 중복 처리
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

/**
 * 사용자 친화적 슬러그 생성 (sub_type-title, 한글/영어/숫자만, 중복 방지)
 */
export function generateUserFriendlySlug(
  subType: string,
  title: string,
  existingSlugs: Set<string>
) {
  let base = (subType || "RECORDS").toLowerCase();
  let safeTitle = title
    .replace(/[^a-zA-Z0-9가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
  let slug = `${base}-${safeTitle}`;
  let count = 1;
  let uniqueSlug = slug;
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }
  existingSlugs.add(uniqueSlug);
  return uniqueSlug;
}

/**
 * 기존 MDX 파일의 notionId → endDate 매핑 생성
 */
export async function getExistingEndDates(
  baseDir: string = path.join(process.cwd(), "content")
): Promise<Map<string, string>> {
  const map = new Map<string, string>();

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

/**
 * MDX 파일 메타데이터 타입
 */
export interface MdxMetadata {
  notionId?: string;
  last_edited_time?: string;
  title?: string;
  slug?: string;
  type?: string;
  [key: string]: any;
}

/**
 * MDX 파일에서 메타데이터 추출
 */
export async function extractMdxMetadata(
  filePath: string
): Promise<MdxMetadata | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const fm = matter(content);
    return fm.data as MdxMetadata;
  } catch (error) {
    console.error(`❌ 메타데이터 추출 실패: ${filePath}`, error);
    return null;
  }
}

/**
 * 디렉토리 내 모든 MDX 파일의 메타데이터 수집
 */
export async function collectMdxMetadata(
  dirPath: string
): Promise<Map<string, MdxMetadata>> {
  const metadataMap = new Map<string, MdxMetadata>();

  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const filePath = path.join(dirPath, file);
        const metadata = await extractMdxMetadata(filePath);

        if (metadata && metadata.notionId) {
          metadataMap.set(metadata.notionId, metadata);
        }
      }
    }
  } catch (error) {
    console.error(`❌ 메타데이터 수집 실패: ${dirPath}`, error);
  }

  return metadataMap;
}
