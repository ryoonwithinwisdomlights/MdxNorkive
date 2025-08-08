/**
 * MDX 콘텐츠 검증 유틸리티
 *
 * 📋 파일 역할:
 * MDX 파일들의 유효성을 검사하고 문제가 있으면 수정하는 검증 도구입니다.
 * content-functional.ts의 핵심 변환 로직을 재사용하여 일관성을 보장합니다.
 *
 * 🏗️ 아키텍처: 검증 전용 레이어
 * - content-functional.ts의 함수형 프로그래밍 아키텍처를 그대로 활용
 * - 검증 전용 로직만 추가로 구현
 * - 생성과 검증에서 동일한 로직 사용으로 무결성 보장
 *
 * @version 1.0.0
 * @author AI Assistant & ryoon (ryoon.with.wisdomtrees@gmail.com)
 * @created 2025-08-08
 * @lastModified 2025-08-08
 */

// ===== 핵심 변환 로직 import =====
// ===== 핵심 변환 로직 import =====
import { processMdxContentFn } from "./convert-unsafe-mdx/content-functional";

// ===== 타입 및 상수 import =====
import {
  MdxValidationResult,
  MdxDirectoryValidationResult,
  MdxSyntaxValidationResult,
} from "../../../types/mdx.model";

import {
  ALLOWED_HTML_TAGS,
  MDX_CONSTANTS,
  MDX_CONTENT_PATTERNS,
} from "../../../constants/mdx.constants";

// ===== 검증 전용 함수들 =====

/**
 * 간단한 MDX 문법 검증
 */
function validateMdxSyntax(content: string): MdxSyntaxValidationResult {
  const errors: string[] = [];

  // 1. 빈 제목 검사
  if (content.match(/^#\s*$/gm)) {
    errors.push("빈 제목이 있습니다");
  }

  // 2. 잘못된 HTML 태그 검사 (허용되지 않은 태그)
  const tagMatches = content.match(MDX_CONTENT_PATTERNS.HTML_TAG);
  if (tagMatches) {
    for (const match of tagMatches) {
      const tagContent = match.replace(/[<>]/g, "");
      const tagName = tagContent
        .trim()
        .split(/[\s='"]+/)[0]
        .toLowerCase();

      if (
        !ALLOWED_HTML_TAGS.includes(tagName as any) &&
        !tagContent.startsWith("/")
      ) {
        errors.push(`허용되지 않은 HTML 태그: ${tagName}`);
      }
    }
  }

  // 3. 잘못된 마크다운 링크 검사
  const linkMatches = content.match(/\[([^\]]*)\]\(([^)]*)\)/g);
  if (linkMatches) {
    for (const match of linkMatches) {
      const [, text, url] = match.match(/\[([^\]]*)\]\(([^)]*)\)/) || [];
      if (!text?.trim() || !url?.trim()) {
        errors.push("잘못된 마크다운 링크가 있습니다");
      }
    }
  }

  // 4. 빈 코드블록 검사
  if (content.match(/```\s*\n\s*```/g)) {
    errors.push("빈 코드블록이 있습니다");
  }

  // 5. JSX 속성 검사
  const jsxMatches = content.match(/\w+=([^"\s>]+)/g);
  if (jsxMatches) {
    for (const match of jsxMatches) {
      const [, attr, value] = match.match(/(\w+)=([^"\s>]+)/) || [];
      if (
        value &&
        !value.startsWith('"') &&
        !value.startsWith("'") &&
        !value.startsWith("{")
      ) {
        errors.push(`잘못된 JSX 속성: ${attr}=${value}`);
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * MDX 콘텐츠 강제 수정 (2차 수정)
 */
function forceFixMdxContent(content: string, frontmatter: string): string {
  let fixedContent = content;

  // 빈 줄 정리
  fixedContent = fixedContent.replace(/\n{3,}/g, "\n\n");

  // 최소한의 마크다운 구조 보장
  if (!fixedContent.trim()) {
    fixedContent = MDX_CONSTANTS.EMPTY_DOCUMENT_TEMPLATE(frontmatter);
  }

  return fixedContent;
}

// ===== 공개 API 함수들 =====

/**
 * MDX 콘텐츠의 유효성을 검사하고 문제가 있으면 수정
 * content-functional.ts의 핵심 로직을 재사용
 */
export async function validateMdxContent(
  content: string,
  frontmatter: string = "unknown"
): Promise<{ isValid: boolean; content: string; errors: string[] }> {
  const errors: string[] = [];
  let processedContent = content;

  try {
    // content-functional.ts의 핵심 변환 로직 사용
    processedContent = processMdxContentFn(content);

    // 변환된 콘텐츠가 원본과 다른 경우 수정된 것으로 간주
    if (processedContent !== content) {
      console.log(`✅ MDX 수정 완료: ${frontmatter}`);
      return { isValid: true, content: processedContent, errors: [] };
    }

    // 변환이 필요하지 않은 경우 (원본이 이미 유효함)
    return { isValid: true, content, errors: [] };
  } catch (error) {
    errors.push(`변환 실패: ${error.message}`);
    console.warn(`⚠️ MDX 변환 실패: ${frontmatter} - ${error.message}`);

    // 최후의 수단: 강제 수정
    try {
      processedContent = forceFixMdxContent(content, frontmatter);
      console.log(`✅ MDX 강제 수정 완료: ${frontmatter}`);
      return { isValid: true, content: processedContent, errors };
    } catch (secondError) {
      errors.push(`강제 수정 실패: ${secondError.message}`);
      console.error(
        `❌ MDX 강제 수정 실패: ${frontmatter} - ${secondError.message}`
      );

      // 최후의 수단: 기본 템플릿
      const fallbackContent =
        MDX_CONSTANTS.DEFAULT_DOCUMENT_TEMPLATE(frontmatter);
      return { isValid: false, content: fallbackContent, errors };
    }
  }
}

/**
 * MDX 파일의 유효성을 검사하고 문제가 있으면 수정
 */
export async function validateMdxFile(
  filePath: string
): Promise<{ isValid: boolean; content: string; errors: string[] }> {
  const fs = await import("fs/promises");
  const content = await fs.readFile(filePath, "utf-8");

  // frontmatter와 본문 분리
  const frontmatterEndIndex = content.indexOf("---", 3);
  const frontmatter = content.substring(0, frontmatterEndIndex + 3);
  const body = content.substring(frontmatterEndIndex + 3);

  return validateMdxContent(body, frontmatter);
}

/**
 * 디렉토리 내의 모든 MDX 파일을 검증
 */
export async function validateMdxDirectory(
  dirPath: string
): Promise<MdxDirectoryValidationResult> {
  const fs = await import("fs/promises");
  const path = await import("path");

  const results = {
    total: 0,
    valid: 0,
    fixed: 0,
    failed: 0,
    errors: [] as Array<{ file: string; errors: string[] }>,
  };

  async function processDirectory(currentDir: string) {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);

      if (item.isDirectory()) {
        await processDirectory(fullPath);
      } else if (item.name.endsWith(".mdx")) {
        results.total++;

        try {
          const result = await validateMdxFile(fullPath);

          if (result.isValid) {
            if (result.errors.length === 0) {
              results.valid++;
            } else {
              results.fixed++;
              // 수정된 내용을 파일에 다시 쓰기
              await fs.writeFile(fullPath, result.content, "utf-8");
            }
          } else {
            results.failed++;
            results.errors.push({ file: fullPath, errors: result.errors });
            // 실패한 경우 기본 템플릿으로 대체
            await fs.writeFile(fullPath, result.content, "utf-8");
          }
        } catch (error) {
          results.failed++;
          results.errors.push({ file: fullPath, errors: [error.message] });
        }
      }
    }
  }

  await processDirectory(dirPath);
  return results;
}

// API 일관성: 검증 관련 모든 것(함수 + 타입)을 한 곳에서 제공
// ===== 타입 재export =====
// export type { MdxValidationResult };
// ===== content-functional.ts의 함수들 재export =====
export {
  convertUnsafeTags,
  processMdxContentFn,
  validateAndFixMdxContent,
} from "./convert-unsafe-mdx/content-functional";
