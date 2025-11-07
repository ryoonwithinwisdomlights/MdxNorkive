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
 * @lastModifiedDate 2025-08-08
 */

// ===== 핵심 변환 로직 import =====

import {
  MDX_CONSTANTS,
  processMdxContentFn,
} from "@norkive/mdx-safe-processor";

// ===== 타입 및 상수 import =====
import { MdxDirectoryValidationResult } from "@/types/mdx.model";

import { extractFrontmatterValue } from "./data-manager";
// ===== 검증 전용 함수들 =====

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

    // 변환이 필요하지 않은 경우에도 항상 처리된 콘텐츠 반환
    // (테이블 블록 수정 등이 적용되었을 수 있음)
    return { isValid: true, content: processedContent, errors: [] };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    errors.push(`변환 실패: ${errorMessage}`);
    console.warn(`⚠️ MDX 변환 실패: ${frontmatter} - ${errorMessage}`);

    // 최후의 수단: 강제 수정
    try {
      processedContent = forceFixMdxContent(content, frontmatter);
      console.log(`✅ MDX 강제 수정 완료: ${frontmatter}`);
      return { isValid: true, content: processedContent, errors };
    } catch (secondError) {
      const secondErrorMessage =
        secondError instanceof Error
          ? secondError.message
          : String(secondError);
      errors.push(`강제 수정 실패: ${secondErrorMessage}`);
      console.error(
        `❌ MDX 강제 수정 실패: ${frontmatter} - ${secondErrorMessage}`
      );

      // frontmatter에서 title 값 추출 예시
      const title = extractFrontmatterValue(frontmatter, "title");
      console.log("추출된 title:", title);

      // 최후의 수단: 기본 템플릿
      const fallbackContent =
        frontmatter +
        "\n" +
        MDX_CONSTANTS.DEFAULT_DOCUMENT_TEMPLATE(title || "Untitled");
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
            // 원본 파일 내용 읽기
            const originalContent = await fs.readFile(fullPath, "utf-8");

            // frontmatter와 본문 분리
            const frontmatterEndIndex = originalContent.indexOf("---", 3);
            const frontmatter = originalContent.substring(
              0,
              frontmatterEndIndex + 3
            );
            const originalBody = originalContent.substring(
              frontmatterEndIndex + 3
            );

            // 변환된 내용과 원본 비교
            if (result.content !== originalBody) {
              results.fixed++;
              // 수정된 내용을 파일에 다시 쓰기
              const newContent = frontmatter + "\n" + result.content;
              await fs.writeFile(fullPath, newContent, "utf-8");
            } else {
              results.valid++;
            }
          } else {
            results.failed++;
            results.errors.push({ file: fullPath, errors: result.errors });
            // 실패한 경우 기본 템플릿으로 대체
            await fs.writeFile(fullPath, result.content, "utf-8");
          }
        } catch (error) {
          results.failed++;
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          results.errors.push({ file: fullPath, errors: [errorMessage] });
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
} from "@norkive/mdx-safe-processor";
