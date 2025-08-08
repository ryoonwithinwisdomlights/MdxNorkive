import { compile } from "@mdx-js/mdx";
import fs from "fs/promises";
import path from "path";
import {
  decodeUrlEncodedLinks,
  processMdxContent,
} from "../lib/utils/mdx-data-processing/convert-unsafe-content/convert-unsafe-mdx-content.js";

const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");

/**
 * MDX 콘텐츠를 검증하고 문제가 있으면 수정
 */
async function validateAndFixMdxContent(content, filename) {
  try {
    // 1차 검증
    await compile(content, { jsx: true });
    return { isValid: true, content, errors: [] };
  } catch (error) {
    console.warn(`⚠️ MDX 검증 실패, 수정 시도: ${filename} - ${error.message}`);
    const errors = [`1차 검증 실패: ${error.message}`];

    // 문제가 있는 콘텐츠 수정
    let fixedContent = content;

    // 1. 빈 제목 수정
    fixedContent = fixedContent.replace(/^#\s*$/gm, "# 제목 없음");
    fixedContent = fixedContent.replace(/^#\s*([^\n]*)$/gm, (match, title) => {
      if (!title.trim()) return "# 제목 없음";
      return match;
    });

    // 2. 중첩된 링크 문제 수정
    fixedContent = fixedContent.replace(
      /(<a[^>]*>)(\[([^\]]+)\]\([^)]+\))(<\/a>)/g,
      "$1$3$4"
    );

    // 3. 잘못된 HTML 태그 수정
    fixedContent = fixedContent.replace(/<([^>]+)>/g, (match, tagContent) => {
      const tagName = tagContent
        .trim()
        .split(/[\s='"]+/)[0]
        .toLowerCase();

      const allowedTags = [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "br",
        "hr",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "s",
        "del",
        "ins",
        "mark",
        "small",
        "sub",
        "sup",
        "a",
        "blockquote",
        "cite",
        "code",
        "pre",
        "kbd",
        "samp",
        "var",
        "ul",
        "ol",
        "li",
        "dl",
        "dt",
        "dd",
        "table",
        "thead",
        "tbody",
        "tfoot",
        "tr",
        "td",
        "th",
        "caption",
        "colgroup",
        "col",
        "img",
        "video",
        "audio",
        "source",
        "track",
        "figure",
        "figcaption",
        "form",
        "input",
        "textarea",
        "select",
        "option",
        "optgroup",
        "button",
        "label",
        "fieldset",
        "legend",
        "details",
        "summary",
        "dialog",
        "menu",
        "menuitem",
        "abbr",
        "acronym",
        "address",
        "article",
        "aside",
        "footer",
        "header",
        "main",
        "nav",
        "section",
        "time",
        "data",
        "meter",
        "progress",
        "svg",
        "path",
        "circle",
        "rect",
        "line",
        "polyline",
        "polygon",
        "ellipse",
        "text",
        "g",
        "defs",
        "use",
        "math",
        "mrow",
        "mi",
        "mo",
        "mn",
        "msup",
        "msub",
        "msubsup",
        "mfrac",
        "msqrt",
        "mroot",
        "ruby",
        "rt",
        "rp",
        "bdi",
        "bdo",
        "wbr",
        "nobr",
        "spacer",
        "embed",
        "object",
        "param",
        "map",
        "area",
        "YoutubeWrapper",
        "EmbededWrapper",
        "FileWrapper",
        "GoogleDriveWrapper",
        "BookMarkWrapper",
      ];

      if (allowedTags.includes(tagName) || tagContent.startsWith("/")) {
        return match;
      }

      return `&lt;${tagContent}&gt;`;
    });

    // 4. 잘못된 마크다운 링크 수정
    fixedContent = fixedContent.replace(
      /\[([^\]]*)\]\(([^)]*)\)/g,
      (match, text, url) => {
        if (!text.trim() || !url.trim()) {
          return `[링크](${url || "#"})`;
        }
        return match;
      }
    );

    // 5. 빈 코드블록 수정
    fixedContent = fixedContent.replace(
      /```\s*\n\s*```/g,
      "```\n// 코드 없음\n```"
    );

    // 6. JSX 속성 수정
    fixedContent = fixedContent.replace(
      /(\w+)=([^"\s>]+)/g,
      (match, attr, value) => {
        if (!value.startsWith('"') && !value.startsWith("'")) {
          return `${attr}="${value}"`;
        }
        return match;
      }
    );

    // 7. 공백과 줄바꿈 정리
    fixedContent = fixedContent.replace(/\n{3,}/g, "\n\n");
    fixedContent = fixedContent.replace(/[ \t]+/g, " ");

    // 8. 특수 문자 이스케이프
    fixedContent = fixedContent.replace(/[<>]/g, (match) => {
      if (match === "<") return "&lt;";
      if (match === ">") return "&gt;";
      return match;
    });

    // 9. 마크다운 문법 수정
    fixedContent = fixedContent.replace(/^[-*+]\s*$/gm, "- 항목");
    fixedContent = fixedContent.replace(
      /\|\s*\|\s*\n\s*\|\s*\|\s*\n/g,
      "| 내용 |\n| --- |\n"
    );

    // 2차 검증
    try {
      await compile(fixedContent, { jsx: true });
      console.log(`✅ MDX 수정 완료: ${filename}`);
      return { isValid: true, content: fixedContent, errors };
    } catch (secondError) {
      errors.push(`2차 검증 실패: ${secondError.message}`);
      console.error(`❌ MDX 수정 실패: ${filename} - ${secondError.message}`);

      // 최후의 수단: 강제 수정
      let finalContent = fixedContent;

      // 모든 JSX 컴포넌트 제거
      finalContent = finalContent.replace(/<[^>]+>/g, "");

      // 빈 줄 정리
      finalContent = finalContent.replace(/\n{3,}/g, "\n\n");

      // 최소한의 마크다운 구조 보장
      if (!finalContent.trim()) {
        finalContent = `# ${filename}\n\n내용이 없습니다.`;
      }

      // 최종 검증
      try {
        await compile(finalContent, { jsx: true });
        console.log(`✅ MDX 강제 수정 완료: ${filename}`);
        return { isValid: true, content: finalContent, errors };
      } catch (finalError) {
        errors.push(`강제 수정 실패: ${finalError.message}`);
        console.error(
          `❌ MDX 강제 수정 실패: ${filename} - ${finalError.message}`
        );

        // 최후의 수단: 기본 템플릿
        const fallbackContent = `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`;
        return { isValid: false, content: fallbackContent, errors };
      }
    }
  }
}

/**
 * MDX 파일의 본문에 convertUnsafeTagsTEST를 적용하여 안전한 태그로 변환
 */
async function applyUnsafeTagsConversion(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    // frontmatter와 본문 분리
    const frontmatterEndIndex = content.indexOf("---", 3);
    if (frontmatterEndIndex === -1) {
      console.log(`⚠️ Frontmatter를 찾을 수 없습니다: ${filePath}`);
      return false;
    }

    const frontmatter = content.substring(0, frontmatterEndIndex + 3);
    const body = content.substring(frontmatterEndIndex + 3);

    // 본문에 convertUnsafeTags 적용
    let enhancedContent = body;
    // 안전 변환 적용
    enhancedContent = decodeUrlEncodedLinks(enhancedContent);
    enhancedContent = processMdxContent(enhancedContent);
    // enhancedContent = convertUnsafeTags(enhancedContent);

    // // MDX 검증 및 수정
    // const validationResult = await validateAndFixMdxContent(enhancedContent, path.basename(filePath));
    // enhancedContent = validationResult.content;

    const newContent = frontmatter + enhancedContent;

    // 파일에 다시 쓰기
    await fs.writeFile(filePath, newContent, "utf-8");
    console.log(`✅ 안전한 태그로 변환 완료: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ 파일 변환 실패: ${filePath} - ${error.message}`);
    return false;
  }
}

/**
 * 재귀적으로 디렉토리 내의 모든 MDX 파일을 찾습니다
 */
async function findMdxFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 하위 디렉토리 재귀 검사
      const subFiles = await findMdxFiles(fullPath);
      files.push(...subFiles);
    } else if (item.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function checkAllMdxFiles() {
  // content 디렉토리가 존재하는지 확인
  try {
    await fs.access(BASE_OUTPUT_DIR);
  } catch (error) {
    console.log(
      `📁 'content' 디렉토리가 존재하지 않습니다: ${BASE_OUTPUT_DIR}`
    );
    return;
  }

  // 모든 MDX 파일 찾기 (하위 디렉토리 포함)
  const mdxFiles = await findMdxFiles(BASE_OUTPUT_DIR);
  console.log(`📁 발견된 MDX 파일: ${mdxFiles.length}개`);

  let hasError = false;
  let convertedCount = 0;
  let validCount = 0;
  let fixedCount = 0;
  let failedCount = 0;

  for (const filePath of mdxFiles) {
    try {
      // 먼저 안전한 태그로 변환 적용
      const converted = await applyUnsafeTagsConversion(filePath);
      if (converted) {
        convertedCount++;
      }

      // 변환된 내용으로 MDX 유효성 검사
      const content = await fs.readFile(filePath, "utf-8");
      try {
        await compile(content, { jsx: true });
        validCount++;
      } catch (e) {
        hasError = true;
        console.error(
          `❌ MDX 파싱 실패: ${path.basename(filePath)} - ${e.message}`
        );

        // MDX 검증 및 수정 시도
        const validationResult = await validateAndFixMdxContent(
          content,
          path.basename(filePath)
        );

        if (validationResult.isValid) {
          fixedCount++;
          await fs.writeFile(filePath, validationResult.content, "utf-8");
          console.log(`✅ MDX 수정 완료: ${path.basename(filePath)}`);
        } else {
          failedCount++;
          // 실패한 경우 기본 템플릿으로 대체
          await fs.writeFile(filePath, validationResult.content, "utf-8");
          console.log(`⚠️ 기본 템플릿으로 대체: ${path.basename(filePath)}`);
        }
      }
    } catch (error) {
      failedCount++;
      console.error(
        `❌ 파일 처리 실패: ${path.basename(filePath)} - ${error.message}`
      );
    }
  }

  console.log(`\n📊 처리 결과:`);
  console.log(`- 발견된 MDX 파일: ${mdxFiles.length}개`);
  console.log(`- 변환된 파일: ${convertedCount}개`);
  console.log(`- 유효한 파일: ${validCount}개`);
  console.log(`- 수정된 파일: ${fixedCount}개`);
  console.log(`- 실패한 파일: ${failedCount}개`);
  console.log(`- 오류 발생: ${hasError ? "있음" : "없음"}`);

  if (failedCount > 0) {
    console.log(`\n⚠️ ${failedCount}개의 파일에서 문제가 발생했습니다.`);
    process.exit(1);
  } else {
    console.log("\n✅ 모든 MDX 파일이 성공적으로 검증되었습니다!");
  }
}

checkAllMdxFiles();
