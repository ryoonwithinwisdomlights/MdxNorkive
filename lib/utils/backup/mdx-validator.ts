// import { compile } from "@mdx-js/mdx";

// ===== 타입 정의 =====
export interface MdxValidationResult {
  isValid: boolean;
  content: string;
  errors: string[];
}

interface ContentBlock {
  marker: string;
  content: string;
}

interface ProcessingContext {
  codeBlocks: ContentBlock[];
  blockquotes: ContentBlock[];
  codeBlockIndex: number;
  blockquoteIndex: number;
}

type ContentTransformer = (
  content: string,
  context: ProcessingContext
) => string;

// ===== 상수 정의 =====
const ALLOWED_HTML_TAGS = [
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
] as const;

const ALLOWED_JSX_ATTRIBUTES = [
  "className",
  "id",
  "style",
  "src",
  "href",
  "alt",
  "target",
  "rel",
  "onClick",
  "onChange",
  "value",
  "type",
  "placeholder",
  "disabled",
  "required",
  "checked",
  "selected",
  "readonly",
  "maxlength",
  "minlength",
  "pattern",
  "autocomplete",
  "autofocus",
  "form",
  "name",
  "size",
  "step",
  "min",
  "max",
  "multiple",
  "accept",
  "capture",
  "dirname",
  "list",
  "novalidate",
  "readonly",
  "spellcheck",
  "tabindex",
  "title",
  "translate",
  "data-",
  "aria-",
] as const;

// ===== 유틸리티 함수들 =====
const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);

const compose =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const createContext = (): ProcessingContext => ({
  codeBlocks: [],
  blockquotes: [],
  codeBlockIndex: 0,
  blockquoteIndex: 0,
});

// ===== 콘텐츠 보호 함수들 =====
const protectCodeBlocks: ContentTransformer = (content, context) => {
  return content.replace(/```[\s\S]*?```/g, (match) => {
    const marker = `__CODE_BLOCK_${context.codeBlockIndex}__`;
    context.codeBlocks.push({ marker, content: match });
    context.codeBlockIndex++;
    return marker;
  });
};

const protectBlockquotes: ContentTransformer = (content, context) => {
  return content.replace(/^>\s*(.+)$/gm, (match, content) => {
    const marker = `__BLOCKQUOTE_${context.blockquoteIndex}__`;

    // 블록쿼트 내부의 안전하지 않은 태그들을 미리 처리
    let processedContent = match;

    // 블록쿼트 내부에서 안전하지 않은 태그들을 HTML 엔티티로 변환
    processedContent = processedContent.replace(
      /<([^>]+)>/g,
      (tagMatch, tagContent) => {
        const tagContentFirst = tagContent.trim().split(/[\s='"]+/)[0];
        const tagName = tagContentFirst.toLowerCase();

        // 1. 허용된 HTML 태그는 그대로 유지
        if (
          ALLOWED_HTML_TAGS.includes(tagName as any) ||
          ALLOWED_HTML_TAGS.includes(tagContentFirst as any)
        ) {
          return tagMatch;
        }

        // 2. 허용된 태그에 JSX 속성이 있는 경우 허용
        if (
          ALLOWED_HTML_TAGS.includes(tagName as any) &&
          hasAllowedAttributes(tagContent)
        ) {
          return tagMatch;
        }

        // 3. 닫는 태그는 허용된 태그만 허용
        if (tagContent.startsWith("/")) {
          const closingTagName = tagContent.substring(1).toLowerCase();
          const closingTagOriginal = tagContent.substring(1);
          if (
            ALLOWED_HTML_TAGS.includes(closingTagName as any) ||
            ALLOWED_HTML_TAGS.includes(closingTagOriginal as any)
          ) {
            return tagMatch;
          }
        }

        // 4. 그 외의 모든 것은 HTML 엔티티로 변환
        return `&lt;${tagContent}&gt;`;
      }
    );

    context.blockquotes.push({ marker, content: processedContent });
    context.blockquoteIndex++;
    return marker;
  });
};

const restoreProtectedContent: ContentTransformer = (content, context) => {
  // 코드블록 복원
  for (let i = context.codeBlocks.length - 1; i >= 0; i--) {
    const block = context.codeBlocks[i];
    content = content.split(block.marker).join(block.content);
  }

  // 인용문 복원
  for (let i = context.blockquotes.length - 1; i >= 0; i--) {
    const block = context.blockquotes[i];
    content = content.split(block.marker).join(block.content);
  }

  return content;
};

// ===== 콘텐츠 변환 함수들 =====
const fixTableBlocks = (content: string): string => {
  return content.replace(/(\|[^|\n]*\|[^|\n]*\|[^|\n]*\n?)+/g, (tableMatch) => {
    return tableMatch.replace(/\|([^|]*)\|/g, (cellMatch, cellContent) => {
      return `|${cellContent}|`;
    });
  });
};

const fixHeadingBlocks = (content: string): string => {
  // 빈 제목 수정
  content = content.replace(/^#{1,6}\s*$/gm, (match) => {
    const level = match.match(/^#{1,6}/)?.[0] || "#";
    return `${level} 제목 없음`;
  });

  // 제목이 있지만 내용이 비어있거나 공백만 있는 경우 처리
  return content.replace(/^#{1,6}\s*([^\n]*)$/gm, (match, title) => {
    const level = match.match(/^#{1,6}/)?.[0] || "#";
    const trimmedTitle = title.trim();

    if (!trimmedTitle || trimmedTitle === "") {
      return `${level} 제목 없음`;
    }

    if (trimmedTitle.length <= 2 && !/^[a-zA-Z가-힣0-9]/.test(trimmedTitle)) {
      return `${level} 제목 없음`;
    }

    return match;
  });
};

const convertMarkdownSyntax = (content: string): string => {
  return content
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>");
};

const fixUnclosedTags = (content: string): string => {
  return content
    .replace(/<em>([^<]*?)(?=\n|$)/g, "<em>$1</em>")
    .replace(/<strong>([^<]*?)(?=\n|$)/g, "<strong>$1</strong>")
    .replace(/<code>([^<]*?)(?=\n|$)/g, "<code>$1</code>");
};

const sanitizeUnsafeTags = (content: string): string => {
  return content.replace(/<([^>]+)>/g, (match, tagContent) => {
    const tagContentFirst = tagContent.trim().split(/[\s='"]+/)[0];
    const tagName = tagContentFirst.toLowerCase();

    // 1. 허용된 HTML 태그는 그대로 유지
    if (
      ALLOWED_HTML_TAGS.includes(tagName as any) ||
      ALLOWED_HTML_TAGS.includes(tagContentFirst as any)
    ) {
      return match;
    }

    // 2. 허용된 태그에 JSX 속성이 있는 경우 허용
    if (
      ALLOWED_HTML_TAGS.includes(tagName as any) &&
      hasAllowedAttributes(tagContent)
    ) {
      return match;
    }

    // 3. 닫는 태그는 허용된 태그만 허용
    if (tagContent.startsWith("/")) {
      const closingTagName = tagContent.substring(1).toLowerCase();
      const closingTagOriginal = tagContent.substring(1);
      if (
        ALLOWED_HTML_TAGS.includes(closingTagName as any) ||
        ALLOWED_HTML_TAGS.includes(closingTagOriginal as any)
      ) {
        return match;
      }
    }

    // 4. 그 외의 모든 것은 HTML 엔티티로 변환
    return `&lt;${tagContent}&gt;`;
  });
};

const hasAllowedAttributes = (tagContent: string): boolean => {
  return ALLOWED_JSX_ATTRIBUTES.some(
    (attr) =>
      tagContent.includes(`${attr}=`) ||
      tagContent.includes("data-") ||
      tagContent.includes("aria-")
  );
};

// ===== 링크 변환 함수들 =====
const transformYouTubeLinks = (content: string): string => {
  return content.replace(
    /\[([^\]]+)\]\(https:\/\/www\.youtube\.com\/watch\?v=([^&]+)\)/g,
    '<YoutubeWrapper videoId="$2" title="$1" />'
  );
};

const transformEmbededLinks = (content: string): string => {
  return content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<EmbededWrapper url="$2" title="$1" />'
  );
};

const transformFileLinks = (content: string): string => {
  return content.replace(
    /\[([^\]]+)\]\(([^)]+\.(pdf|doc|docx|xls|xlsx|ppt|pptx))\)/g,
    '<FileWrapper url="$2" title="$1" />'
  );
};

const transformGoogleDriveLinks = (content: string): string => {
  return content.replace(
    /\[([^\]]+)\]\(https:\/\/drive\.google\.com\/[^)]+\)/g,
    '<GoogleDriveWrapper url="$2" title="$1" />'
  );
};

const transformBookMarkLinks = (content: string): string => {
  return content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<BookMarkWrapper url="$2" title="$1" />'
  );
};

const fixNestedLinks = (content: string): string => {
  return content
    .replace(/(<a[^>]*>)(\[\*\*([^*]+)\*\*\]\([^)]+\))(<\/a>)/g, "$1$3$4")
    .replace(/(<a[^>]*>)(\[([^\]]+)\]\([^)]+\))(<\/a>)/g, "$1$3$4");
};

// ===== 파이프라인 구성 =====
const linkTransformPipeline = pipe(
  transformYouTubeLinks,
  transformEmbededLinks,
  transformFileLinks,
  transformGoogleDriveLinks,
  transformBookMarkLinks,
  fixNestedLinks
);

const contentTransformPipeline = (context: ProcessingContext) =>
  pipe(
    (content: string) => protectCodeBlocks(content, context),
    (content: string) => protectBlockquotes(content, context),
    fixTableBlocks,
    fixHeadingBlocks,
    convertMarkdownSyntax,
    fixUnclosedTags,
    sanitizeUnsafeTags,
    (content: string) => restoreProtectedContent(content, context),
    (content: string) => content.replace(/\{:[^}]+\}/g, "") // MDX 확장 문법 제거
  );

// ===== 메인 처리 함수 =====
const processMdxContent = (content: string): string => {
  const context = createContext();

  // 1단계: 링크 변환
  let processedContent = linkTransformPipeline(content);

  // 2단계: 콘텐츠 보호 및 변환
  processedContent = contentTransformPipeline(context)(processedContent);

  return processedContent;
};

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

  // 2. 잘못된 HTML 태그 검사 (허용되지 않은 태그)
  const tagMatches = content.match(/<([^>]+)>/g);
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
 * MDX 콘텐츠의 유효성을 검사하고 문제가 있으면 수정
 */
export async function validateMdxContent(
  content: string,
  filename: string = "unknown"
): Promise<{ isValid: boolean; content: string; errors: string[] }> {
  const errors: string[] = [];
  let processedContent = content;

  try {
    // 바로 변환 파이프라인 적용
    processedContent = processMdxContent(content);

    // 변환된 콘텐츠가 원본과 다른 경우 수정된 것으로 간주
    if (processedContent !== content) {
      console.log(`✅ MDX 수정 완료: ${filename}`);
      return { isValid: true, content: processedContent, errors: [] };
    }

    // 변환이 필요하지 않은 경우 (원본이 이미 유효함)
    return { isValid: true, content, errors: [] };
  } catch (error) {
    errors.push(`변환 실패: ${error.message}`);
    console.warn(`⚠️ MDX 변환 실패: ${filename} - ${error.message}`);

    // 최후의 수단: 강제 수정
    try {
      processedContent = forceFixMdxContent(content, filename);
      console.log(`✅ MDX 강제 수정 완료: ${filename}`);
      return { isValid: true, content: processedContent, errors };
    } catch (secondError) {
      errors.push(`강제 수정 실패: ${secondError.message}`);
      console.error(
        `❌ MDX 강제 수정 실패: ${filename} - ${secondError.message}`
      );

      // 최후의 수단: 기본 템플릿
      const fallbackContent = `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`;
      return { isValid: false, content: fallbackContent, errors };
    }
  }
}

/**
 * MDX 콘텐츠 강제 수정 (2차 수정)
 */
function forceFixMdxContent(content: string, filename: string): string {
  let fixedContent = content;

  // 빈 줄 정리
  fixedContent = fixedContent.replace(/\n{3,}/g, "\n\n");

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
  // const filename = filePath.split("/").pop()?.replace(".mdx", "") || "unknown";

  // frontmatter와 본문 분리
  const frontmatterEndIndex = content.indexOf("---", 3);
  const frontmatter = content.substring(0, frontmatterEndIndex + 3);
  const body = content.substring(frontmatterEndIndex + 3);

  return validateMdxContent(body, frontmatter);
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
