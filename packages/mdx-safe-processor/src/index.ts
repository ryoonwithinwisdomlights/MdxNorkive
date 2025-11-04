/**
 * MDX 콘텐츠 안전 변환 유틸리티 (함수형 프로그래밍 버전)
 *
 * @package @norkive/mdx-safe-processor
 * @version 1.0.0
 */

// ===== 타입 및 상수 import =====
import {
  ContentTransformer,
  MdxValidationResult,
  ProcessingContext,
} from "./types";

import {
  ALLOWED_HTML_TAGS,
  ALLOWED_JSX_ATTRIBUTES,
  MDX_CONSTANTS,
  MDX_CONTENT_PATTERNS,
  MDX_LINK_PATTERNS,
} from "./constants";

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

// HTML 엔티티를 원래 태그로 디코딩하는 함수
const decodeHtmlEntities = (content: string): string => {
  return content
    .replace(/&lt;strong&gt;/g, "<strong>")
    .replace(/&lt;\/strong&gt;/g, "</strong>")
    .replace(/&lt;em&gt;/g, "<em>")
    .replace(/&lt;\/em&gt;/g, "</em>")
    .replace(/&lt;code&gt;/g, "<code>")
    .replace(/&lt;\/code&gt;/g, "</code>")
    .replace(/&lt;a\s+href=/g, "<a href=")
    .replace(/&lt;\/a&gt;/g, "</a>")
    .replace(/&lt;b&gt;/g, "<b>")
    .replace(/&lt;\/b&gt;/g, "</b>")
    .replace(/&lt;i&gt;/g, "<i>")
    .replace(/&lt;\/i&gt;/g, "</i>")
    .replace(/&lt;u&gt;/g, "<u>")
    .replace(/&lt;\/u&gt;/g, "</u>");
};

// ===== 콘텐츠 보호 함수들 =====
const protectCodeBlocks: ContentTransformer = (content, context) => {
  return content.replace(MDX_CONTENT_PATTERNS.CODE_BLOCK, (match) => {
    const marker = `${MDX_CONSTANTS.CODE_BLOCK_MARKER_PREFIX}${context.codeBlockIndex}__`;
    context.codeBlocks.push({ marker, content: match });
    context.codeBlockIndex++;
    return marker;
  });
};

const protectBlockquotes: ContentTransformer = (content, context) => {
  return content.replace(MDX_CONTENT_PATTERNS.BLOCKQUOTE, (match, content) => {
    const marker = `${MDX_CONSTANTS.BLOCKQUOTE_MARKER_PREFIX}${context.blockquoteIndex}__`;

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
        console.log(
          `🔒 블록쿼트 내 안전하지 않은 태그 변환: <${tagContent}> → &lt;${tagContent}&gt;`
        );
        return `&lt;${tagContent}&gt;`;
      }
    );

    context.blockquotes.push({ marker, content: processedContent });
    context.blockquoteIndex++;
    return marker;
  });
};

// ===== 콘텐츠 변환 함수들 =====
const fixTableBlocks = (content: string): string => {
  return content.replace(MDX_CONTENT_PATTERNS.TABLE, (tableMatch) => {
    return tableMatch.replace(/\|([^|]*)\|/g, (cellMatch, cellContent) => {
      let sanitizedContent = cellContent;
      // 테이블 셀 내부의 HTML 태그들을 안전하게 이스케이프
      sanitizedContent = sanitizedContent.replace(
        /<([^>]+)>/g,
        (tagMatch: string, tagContent: string) => {
          const tagName = tagContent
            .trim()
            .split(/[\s='"]+/)[0]
            .toLowerCase();

          // 1. 허용된 태그인지 확인
          if (ALLOWED_HTML_TAGS.includes(tagName as any)) {
            // 2. 실제로 닫히지 않은 태그인지 확인
            if (!tagContent.startsWith("/") && !tagContent.endsWith("/")) {
              const closingTagPattern = new RegExp(`</${tagName}[^>]*>`, "i");
              if (!closingTagPattern.test(sanitizedContent)) {
                if (tagName === "a" && tagContent.includes("href")) {
                  console.log(
                    `🔒 닫히지 않은 태그 변환: <${tagContent}> → &lt;${tagContent}&gt;`
                  );
                  return `&lt;${tagContent}&gt;`;
                }
              }
            }
            return tagMatch;
          }
          // 그 외의 태그는 HTML 엔티티로 변환
          return `&lt;${tagContent}&gt;`;
        }
      );

      // 테이블 셀 끝에 잘못된 태그가 있는지 확인하고 정리
      sanitizedContent = sanitizedContent.replace(/\|\<\/strong\>+$/, "");

      return `|${sanitizedContent}|`;
    });
  });
};

const fixHeadingBlocks = (content: string): string => {
  // 빈 제목 수정
  content = content.replace(/^#{1,6}\s*$/gm, (match) => {
    const level = match.match(/^#{1,6}/)?.[0] || "#";
    return `${level} ${MDX_CONSTANTS.DEFAULT_HEADING_TEXT}`;
  });

  // 제목이 있지만 내용이 비어있거나 공백만 있는 경우 처리
  return content.replace(MDX_CONTENT_PATTERNS.HEADING, (match, title) => {
    const level = match.match(/^#{1,6}/)?.[0] || "#";
    const trimmedTitle = title.trim();

    if (!trimmedTitle || trimmedTitle === "") {
      return `${level} ${MDX_CONSTANTS.DEFAULT_HEADING_TEXT}`;
    }

    if (trimmedTitle.length <= 2 && !/^[a-zA-Z가-힣0-9]/.test(trimmedTitle)) {
      return `${level} ${MDX_CONSTANTS.DEFAULT_HEADING_TEXT}`;
    }

    return match;
  });
};

const convertMarkdownSyntax = (content: string): string => {
  return content
    .replace(MDX_CONTENT_PATTERNS.BOLD, "<strong>$1</strong>")
    .replace(MDX_CONTENT_PATTERNS.ITALIC, "<em>$1</em>")
    .replace(MDX_CONTENT_PATTERNS.INLINE_CODE, "<code>$1</code>");
};

const fixUnclosedTags = (content: string): string => {
  return content
    .replace(/<em>([^<]*?)(?=\n|$)/g, "<em>$1</em>")
    .replace(/<strong>([^<]*?)(?=\n|$)/g, "<strong>$1</strong>")
    .replace(/<code>([^<]*?)(?=\n|$)/g, "<code>$1</code>");
};

const sanitizeUnsafeTags = (content: string): string => {
  return content.replace(MDX_CONTENT_PATTERNS.HTML_TAG, (match, tagContent) => {
    const tagContentFirst = tagContent.trim().split(/[\s='"]+/)[0];
    const tagName = tagContentFirst;
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
    console.log(
      `🔒 안전하지 않은 태그 변환: <${tagContent}> → &lt;${tagContent}&gt;`
    );
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

// ===== 링크 변환 함수들 =====
const transformYouTubeLinks = (content: string): string => {
  return content.replace(MDX_LINK_PATTERNS.YOUTUBE, (match, url) => {
    const cleanUrl = url.split("?")[0];
    return `<YoutubeWrapper names={"video"} urls={"${cleanUrl}"} />`;
  });
};

const transformEmbededLinks = (content: string): string => {
  return content.replace(MDX_LINK_PATTERNS.EMBED, (match, url) => {
    return `<EmbededWrapper names={"embed"} urls={"${url}"} />`;
  });
};

const transformFileLinks = (content: string): string => {
  return content.replace(
    MDX_LINK_PATTERNS.FILE,
    (match, fileName, extension, url) => {
      return `<FileWrapper names={"${fileName}"} urls={"${url}"} />`;
    }
  );
};

const transformGoogleDriveLinks = (content: string): string => {
  return content.replace(
    MDX_LINK_PATTERNS.GOOGLE_DRIVE,
    (match, linkText, url) => {
      return `<GoogleDriveWrapper names={"${linkText}"} urls={"${url}"} />`;
    }
  );
};

const transformBookMarkLinks = (content: string): string => {
  return content.replace(MDX_LINK_PATTERNS.BOOKMARK, (match, url) => {
    return `<BookMarkWrapper names={"bookmark"} urls={"${url}"} />`;
  });
};

const fixNestedLinks = (content: string): string => {
  return content
    .replace(/(<a[^>]*>)(\[(\*\*[^*]+\*\*)\]\([^)]+\))(<\/a>)/g, "$1$3$4")
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
    decodeHtmlEntities,
    (content: string) => content.replace(MDX_CONTENT_PATTERNS.MDX_EXTENSION, "")
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

// ===== 디버깅용 함수 =====
const processMdxContentWithLogging = (content: string): string => {
  const context = createContext();

  console.log("🔄 MDX 처리 시작...");

  // 1단계: 링크 변환
  console.log("📝 링크 변환 중...");
  let processedContent = linkTransformPipeline(content);

  // 2단계: 콘텐츠 보호 및 변환
  console.log("📝 콘텐츠 변환 중...");
  processedContent = contentTransformPipeline(context)(processedContent);

  console.log("✅ MDX 처리 완료");
  return processedContent;
};

// ===== 공개 API 함수들 =====

/**
 * MDX에서 문제가 있는 태그들을 안전한 문자열(HTML 엔티티)로 변환
 */
export function convertUnsafeTags(content: string): string {
  return processMdxContent(content);
}

/**
 * MDX 콘텐츠를 검증하고 문제가 있으면 수정
 */
export async function validateAndFixMdxContent(
  content: string,
  filename: string = "unknown"
): Promise<MdxValidationResult> {
  try {
    const processedContent = processMdxContent(content);
    return { isValid: true, content: processedContent, errors: [] };
  } catch (error) {
    console.warn(
      `⚠️ MDX 검증 실패, 수정 시도: ${filename} - ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    const errors = [
      `1차 검증 실패: ${
        error instanceof Error ? error.message : String(error)
      }`,
    ];

    try {
      const fixedContent = processMdxContent(content);
      console.log(`✅ MDX 수정 완료: ${filename}`);
      return { isValid: true, content: fixedContent, errors };
    } catch (secondError) {
      errors.push(
        `2차 검증 실패: ${
          secondError instanceof Error
            ? secondError.message
            : String(secondError)
        }`
      );
      console.error(
        `❌ MDX 수정 실패: ${filename} - ${
          secondError instanceof Error
            ? secondError.message
            : String(secondError)
        }`
      );

      const frontmatterEndIndex = content.indexOf("---", 3);
      const frontmatter = content.substring(0, frontmatterEndIndex + 3);

      const fallbackContent =
        frontmatter + "\n" + MDX_CONSTANTS.DEFAULT_DOCUMENT_TEMPLATE(filename);
      return { isValid: false, content: fallbackContent, errors };
    }
  }
}

/**
 * MDX 콘텐츠를 처리하는 메인 함수
 */
export function processMdxContentFn(content: string): string {
  return processMdxContent(content);
}

/**
 * URL 인코딩된 링크를 디코딩
 */
export function decodeUrlEncodedLinks(content: string): string {
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const decodedText = decodeURIComponent(text);
    return `[${decodedText}](${url})`;
  });
}

/**
 * 로깅이 포함된 MDX 콘텐츠 처리 함수
 */
export function processMdxContentWithLoggingFn(content: string): string {
  return processMdxContentWithLogging(content);
}

// ===== 타입 및 상수 재export =====
export type {
  MdxValidationResult,
  ProcessingContext,
  ContentBlock,
  ContentTransformer,
} from "./types";

export {
  ALLOWED_HTML_TAGS,
  ALLOWED_JSX_ATTRIBUTES,
  MDX_CONSTANTS,
  MDX_CONTENT_PATTERNS,
  MDX_LINK_PATTERNS,
} from "./constants";
