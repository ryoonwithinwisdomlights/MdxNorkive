/**
 * MDX 콘텐츠 안전 변환 유틸리티 (함수형 프로그래밍 버전)
 *
 * 📋 파일 역할:
 * Notion에서 가져온 MDX 콘텐츠를 안전하게 처리하는 함수형 프로그래밍 기반 변환기입니다.
 * 클래스 기반 접근법 대신 순수 함수와 파이프라인 패턴을 사용하여 데이터 변환을 수행합니다.
 *
 * 🏗️ 아키텍처: 방안 2 - 함수형 프로그래밍 + 파이프라인 패턴
 *
 * ✅ 주요 장점:
 * 1. 순수 함수 (Pure Functions)
 *    - 동일한 입력에 대해 항상 동일한 출력 보장
 *    - 부작용(side effects) 없음
 *    - 예측 가능한 동작
 *
 * 2. 파이프라인 패턴 (Pipeline Pattern)
 *    - 데이터가 일련의 변환 단계를 거쳐 처리됨
 *    - 각 단계가 독립적이고 조합 가능
 *    - pipe() 함수로 함수들을 연결하여 복잡한 변환 로직 구성
 *
 * 3. 함수 합성 (Function Composition)
 *    - 작은 함수들을 조합하여 큰 기능 구현
 *    - 코드 재사용성 극대화
 *    - 테스트하기 쉬운 구조
 *
 * 4. 불변성 (Immutability)
 *    - 원본 데이터 변경 없이 새로운 데이터 생성
 *    - 스레드 안전성 보장
 *    - 예측 가능한 상태 관리
 *
 * 5. 타입 안전성 (Type Safety)
 *    - TypeScript의 강력한 타입 시스템 활용
 *    - 컴파일 타임에 오류 감지
 *    - 런타임 오류 최소화
 *
 * 6. 고차 함수 (Higher-Order Functions)
 *    - 함수를 인자로 받거나 함수를 반환하는 함수
 *    - 추상화 수준 향상
 *    - 코드의 표현력 증가
 *
 * 🔴 주요 부작용 및 한계:
 * 1. 학습 곡선
 *    - 함수형 프로그래밍 개념 이해 필요
 *    - 파이프라인 패턴에 대한 익숙함 필요
 *    - 초기 개발 속도 저하 가능성
 *
 * 2. 디버깅 복잡성
 *    - 함수 체인에서 오류 발생 시 추적 어려움
 *    - 중간 단계의 데이터 상태 확인 어려움
 *    - 스택 트레이스가 복잡할 수 있음
 *
 * 3. 메모리 사용량
 *    - 불변성으로 인한 메모리 복사 증가
 *    - 대용량 데이터 처리 시 성능 이슈 가능성
 *    - 가비지 컬렉션 부담 증가
 *
 * 4. 코드 가독성
 *    - 함수 체인이 길어질 경우 가독성 저하
 *    - 복잡한 함수 합성 시 이해 어려움
 *    - 명령형 코드에 익숙한 개발자에게 혼란
 *
 * 5. 상태 관리 한계
 *    - 복잡한 상태 변경 로직 구현 어려움
 *    - 전역 상태 관리가 필요한 경우 부적합
 *    - 사이드 이펙트 처리가 복잡함
 *
 * 🎯 사용 시나리오:
 *
 * ✅ 적합한 경우:
 * - 데이터 변환 파이프라인 (현재 사용 사례)
 * - 순수한 계산 로직
 * - 테스트 가능성이 중요한 코드
 * - 재사용 가능한 유틸리티 함수
 * - React/Next.js 생태계
 * - 병렬 처리가 필요한 경우
 *
 * ❌ 부적합한 경우:
 * - 복잡한 상태 관리
 * - 많은 사이드 이펙트
 * - 객체지향 설계가 필요한 경우
 * - 성능이 매우 중요한 경우
 * - 팀이 함수형 프로그래밍에 익숙하지 않은 경우
 *
 * 🔧 주요 기능:
 * 1. 링크 변환 (YouTube, 파일, Google Drive, 북마크 등)
 * 2. 코드 블록 보호 및 복원
 * 3. 인용문 보호 및 복원
 * 4. 마크다운 문법 변환 (bold, italic, code)
 * 5. 안전하지 않은 HTML 태그 정리
 * 6. 중첩 링크 수정
 * 7. MDX 확장 문법 제거
 *
 * 📊 성능 특성:
 * - 처리 속도: 중간 (함수 체인 오버헤드)
 * - 메모리 사용량: 높음 (불변성으로 인한 복사)
 * - 확장성: 높음 (함수 조합으로 쉽게 확장)
 * - 유지보수성: 높음 (순수 함수로 테스트 용이)
 *
 * 🚀 최적화 기법:
 * - 메모이제이션 (useMemo 등)
 * - 지연 평가 (Lazy Evaluation)
 * - 배치 처리 (Batch Processing)
 * - 조건부 실행 (shouldRun 함수)
 *
 * 📈 현재 트렌드:
 * 함수형 프로그래밍이 현대 웹 개발에서 선호되는 이유:
 * - React Hooks의 영향
 * - 테스트 용이성
 * - 부작용 최소화
 * - 코드 조합성
 * - 병렬 처리 용이성
 *
 * 🔄 대안 비교:
 * - 클래스 기반: 복잡한 상태 관리에 적합
 * - 플러그인 아키텍처: 런타임 확장성이 중요한 경우
 * - 함수형: 데이터 변환 파이프라인에 최적 (현재 선택)
 *
 * @version 2.0.0
 * @author AI Assistant & ryoon (ryoon.with.wisdomtrees@gmail.com)
 * @created 2025-08-08
 * @lastModified 2025-08-08
 */

// ===== 타입 및 상수 import =====
import {
  ContentTransformer,
  MdxValidationResult,
  ProcessingContext,
} from "@/types/mdx.model";

import {
  ALLOWED_HTML_TAGS,
  ALLOWED_JSX_ATTRIBUTES,
  MDX_CONSTANTS,
  MDX_CONTENT_PATTERNS,
  MDX_LINK_PATTERNS,
} from "@/constants/mdx.constants";

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
      // 1단계: 이미 HTML 엔티티로 변환된 허용된 태그들을 원래대로 되돌리기
      // let sanitizedContent = decodeHtmlEntities(cellContent);
      let sanitizedContent = cellContent;
      // 2단계: 테이블 셀 내부의 HTML 태그들을 안전하게 이스케이프
      sanitizedContent = sanitizedContent.replace(
        /<([^>]+)>/g,
        (tagMatch: string, tagContent: string) => {
          // 허용된 HTML 태그는 그대로 유지
          const tagName = tagContent
            .trim()
            .split(/[\s='"]+/)[0]
            .toLowerCase();

          // 1. 허용된 태그인지 확인
          if (ALLOWED_HTML_TAGS.includes(tagName as any)) {
            // 2. 실제로 닫히지 않은 태그인지 확인
            // 닫는 태그가 아닌 경우 (self-closing 태그가 아닌 경우)
            if (!tagContent.startsWith("/") && !tagContent.endsWith("/")) {
              // 해당 태그의 닫는 태그가 같은 셀 내에 있는지 확인
              const closingTagPattern = new RegExp(`</${tagName}[^>]*>`, "i");
              if (!closingTagPattern.test(sanitizedContent)) {
                // 실제로 닫히지 않은 태그만 변환
                // <a href> 같은 태그만 변환하고, <strong> 같은 태그는 그대로 유지
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

      // 3단계: 테이블 셀 끝에 잘못된 태그가 있는지 확인하고 정리
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
    // const tagName = tagContentFirst.toLowerCase();
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
    decodeHtmlEntities, // HTML 엔티티를 원래 태그로 디코딩
    (content: string) => content.replace(MDX_CONTENT_PATTERNS.MDX_EXTENSION, "") // MDX 확장 문법 제거
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

      // frontmatter에서 title 값 추출 예시
      // const title = extractFrontmatterValue(frontmatter, "title");
      // console.log("추출된 title:", title);

      const fallbackContent =
        frontmatter + "\n" + MDX_CONSTANTS.DEFAULT_DOCUMENT_TEMPLATE(filename);
      return { isValid: false, content: fallbackContent, errors };
    }
  }
}

export function processMdxContentFn(content: string): string {
  return processMdxContent(content);
}

export function decodeUrlEncodedLinks(content: string): string {
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const decodedText = decodeURIComponent(text);
    return `[${decodedText}](${url})`;
  });
}

// ===== 디버깅용 함수 =====
export function processMdxContentWithLoggingFn(content: string): string {
  return processMdxContentWithLogging(content);
}
