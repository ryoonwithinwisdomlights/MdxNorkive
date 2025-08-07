// import { compile } from "@mdx-js/mdx";

/**
 * 간단한 MDX 문법 검증
 */
function validateMdxSyntax(content: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 1. 빈 제목 검사
  if (content.match(/^#\s*$/gm)) {
    errors.push("빈 제목이 있습니다");
  }

  // 2. 중첩된 링크 검사
  // if (content.match(/<a[^>]*>\[[^\]]+\]\([^)]+\)<\/a>/g)) {
  //   errors.push("중첩된 링크가 있습니다");
  // }

  // 3. 잘못된 HTML 태그 검사 (허용되지 않은 태그)
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
    "youtubewrapper",
    "embededwrapper",
    "filewrapper",
    "googledrivewrapper",
    "bookmarkwrapper",
  ];

  const tagMatches = content.match(/<([^>]+)>/g);
  if (tagMatches) {
    for (const match of tagMatches) {
      const tagContent = match.replace(/[<>]/g, "");
      const tagName = tagContent
        .trim()
        .split(/[\s='"]+/)[0]
        .toLowerCase();

      if (!allowedTags.includes(tagName) && !tagContent.startsWith("/")) {
        errors.push(`허용되지 않은 HTML 태그: ${tagName}`);
      }
    }
  }

  // 4. 잘못된 마크다운 링크 검사
  const linkMatches = content.match(/\[([^\]]*)\]\(([^)]*)\)/g);
  if (linkMatches) {
    for (const match of linkMatches) {
      const [, text, url] = match.match(/\[([^\]]*)\]\(([^)]*)\)/) || [];
      if (!text?.trim() || !url?.trim()) {
        errors.push("잘못된 마크다운 링크가 있습니다");
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * MDX 콘텐츠의 유효성을 검사하고 문제가 있으면 수정
 */
export async function validateMdxContent(
  content: string,
  filename: string = "unknown"
): Promise<{ isValid: boolean; content: string; errors: string[] }> {
  const errors: string[] = [];
  let processedContent = content;

  try {
    // 1차 검증
    const validation = validateMdxSyntax(content);
    if (validation.isValid) {
      return { isValid: true, content, errors: [] };
    }
    errors.push(...validation.errors);
    console.warn(
      `⚠️ MDX 검증 실패, 수정 시도: ${filename} - ${validation.errors.join(
        ", "
      )}`
    );
  } catch (error) {
    errors.push(`1차 검증 실패: ${error.message}`);
    console.warn(`⚠️ MDX 검증 실패, 수정 시도: ${filename} - ${error.message}`);
  }

  // 문제가 있는 경우 수정 시도
  try {
    processedContent = await fixMdxContent(content, filename);

    // 수정된 콘텐츠로 2차 검증
    const secondValidation = validateMdxSyntax(processedContent);
    if (secondValidation.isValid) {
      console.log(`✅ MDX 수정 완료: ${filename}`);
      return { isValid: true, content: processedContent, errors };
    }
    errors.push(...secondValidation.errors);
    console.error(
      `❌ MDX 수정 실패: ${filename} - ${secondValidation.errors.join(", ")}`
    );
  } catch (error) {
    errors.push(`2차 검증 실패: ${error.message}`);
    console.error(`❌ MDX 수정 실패: ${filename} - ${error.message}`);
  }

  // 최후의 수단: 강제 수정
  try {
    processedContent = forceFixMdxContent(content, filename);

    // 최종 검증
    const finalValidation = validateMdxSyntax(processedContent);
    if (finalValidation.isValid) {
      console.log(`✅ MDX 강제 수정 완료: ${filename}`);
      return { isValid: true, content: processedContent, errors };
    }
    errors.push(...finalValidation.errors);
    console.error(
      `❌ MDX 강제 수정 실패: ${filename} - ${finalValidation.errors.join(
        ", "
      )}`
    );

    // 최후의 수단: 기본 템플릿
    const fallbackContent = `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`;
    return { isValid: false, content: fallbackContent, errors };
  } catch (error) {
    errors.push(`강제 수정 실패: ${error.message}`);
    console.error(`❌ MDX 강제 수정 실패: ${filename} - ${error.message}`);

    // 최후의 수단: 기본 템플릿
    const fallbackContent = `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`;
    return { isValid: false, content: fallbackContent, errors };
  }
}

/**
 * MDX 콘텐츠 수정 (1차 수정)
 */
async function fixMdxContent(
  content: string,
  filename: string
): Promise<string> {
  let fixedContent = content;

  // 1. 빈 제목 수정
  fixedContent = fixedContent.replace(/^#\s*$/gm, "# 제목 없음");
  fixedContent = fixedContent.replace(/^#\s*([^\n]*)$/gm, (match, title) => {
    if (!title.trim()) return "# 제목 없음";
    return match;
  });

  // 2. 중첩된 링크 문제 수정
  // fixedContent = fixedContent.replace(
  //   /(<a[^>]*>)(\[([^\]]+)\]\([^)]+\))(<\/a>)/g,
  //   "$1$3$4"
  // );

  // 3. 잘못된 HTML 태그 수정
  fixedContent = fixedContent.replace(/<([^>]+)>/g, (match, tagContent) => {
    const tagName = tagContent
      .trim()
      .split(/[\s='"]+/)[0]
      .toLowerCase();
    console.log("tagName::", tagName);
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
      "youtubewrapper",
      "embededwrapper",
      "filewrapper",
      "googledrivewrapper",
      "bookmarkwrapper",
    ];

    if (allowedTags.includes(tagName) || tagContent.startsWith("/")) {
      return match;
    }
    console.log("tagContent::", tagContent);
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

  return fixedContent;
}

/**
 * MDX 콘텐츠 강제 수정 (2차 수정)
 */
function forceFixMdxContent(content: string, filename: string): string {
  let fixedContent = content;

  // 모든 JSX 컴포넌트 제거
  // fixedContent = fixedContent.replace(/<[^>]+>/g, "");

  // 빈 줄 정리
  fixedContent = fixedContent.replace(/\n{3,}/g, "\n\n");

  // 특수 문자 이스케이프
  // fixedContent = fixedContent.replace(/[<>]/g, (match) => {
  //   if (match === "<") return "&lt;";
  //   if (match === ">") return "&gt;";
  //   return match;
  // });

  // 최소한의 마크다운 구조 보장
  if (!fixedContent.trim()) {
    fixedContent = `# ${filename}\n\n내용이 없습니다.`;
  }

  return fixedContent;
}

/**
 * MDX 파일의 유효성을 검사하고 문제가 있으면 수정
 */
export async function validateMdxFile(
  filePath: string
): Promise<{ isValid: boolean; content: string; errors: string[] }> {
  const fs = await import("fs/promises");
  const content = await fs.readFile(filePath, "utf-8");
  const filename = filePath.split("/").pop()?.replace(".mdx", "") || "unknown";

  return validateMdxContent(content, filename);
}

/**
 * 디렉토리 내의 모든 MDX 파일을 검증
 */
export async function validateMdxDirectory(dirPath: string): Promise<{
  total: number;
  valid: number;
  fixed: number;
  failed: number;
  errors: Array<{ file: string; errors: string[] }>;
}> {
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
