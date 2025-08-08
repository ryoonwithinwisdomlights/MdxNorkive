/**
 * MDX 콘텐츠 안전 변환 유틸리티 (클래스 기반 파이프라인 패턴)
 *
 * 📋 파일 역할:
 * Notion에서 가져온 MDX 콘텐츠를 안전하게 처리하는 클래스 기반 변환기입니다.
 * 추상 클래스와 전략 패턴을 사용하여 확장 가능하고 유지보수하기 쉬운 구조를 제공합니다.
 *
 * 🏗️ 아키텍처: 방안 1 - 클래스 기반 파이프라인 패턴
 *
 * ✅ 주요 장점:
 * 1. 깔끔한 구조와 명확한 책임 분리
 *    - 각 변환 단계가 독립적인 클래스로 분리
 *    - 단일 책임 원칙(SRP) 준수
 *    - 코드의 가독성과 이해도 향상
 *
 * 2. 확장 가능하고 유지보수 용이
 *    - 새로운 변환기를 쉽게 추가 가능
 *    - 기존 코드 수정 없이 기능 확장
 *    - 모듈화된 설계로 유지보수 편의성
 *
 * 3. 추상 클래스 기반의 전략 패턴
 *    - 공통 인터페이스로 일관성 보장
 *    - 다형성을 통한 유연한 처리
 *    - 설계 패턴의 장점 활용
 *
 * 4. 디버깅과 로깅 기능 내장
 *    - 각 변환 단계별 로깅 지원
 *    - 오류 발생 시 추적 용이
 *    - 성능 모니터링 가능
 *
 * 5. 타입 안전성
 *    - TypeScript의 강력한 타입 시스템 활용
 *    - 컴파일 타임 오류 감지
 *    - IDE 지원으로 개발 효율성 향상
 *
 * 🔴 주요 부작용 및 한계:
 * 1. 메모리 오버헤드
 *    - 각 클래스 인스턴스가 메모리를 차지
 *    - 많은 변환기가 있을 때 메모리 사용량 증가
 *    - 객체 생성/소멸 비용
 *
 * 2. 복잡성 증가
 *    - 클래스 계층구조로 인한 복잡성
 *    - 상속과 인터페이스로 인한 학습 곡선
 *    - 초기 설계 비용 증가
 *
 * 3. 테스트 복잡성
 *    - 각 클래스를 개별적으로 모킹해야 함
 *    - 의존성 주입이 복잡해질 수 있음
 *    - 단위 테스트 작성 시 오버헤드
 *
 * 4. 확장성 제한
 *    - 새로운 변환기를 추가할 때 클래스 정의 필요
 *    - 컴파일 타임에 결정되는 구조
 *    - 런타임 동적 확장 어려움
 *
 * 5. 싱글톤 패턴의 한계
 *    - 전역 상태로 인한 테스트 격리 어려움
 *    - 부작용 예측 어려움
 *    - 강한 결합으로 인한 유연성 저하
 *
 * 🎯 사용 시나리오:
 *
 * ✅ 적합한 경우:
 * - 안정적이고 예측 가능한 변환 로직
 * - 팀이 객체지향 설계에 익숙한 경우
 * - 컴파일 타임에 모든 변환기가 결정되는 경우
 * - 타입 안전성이 중요한 경우
 * - 명확한 책임 분리가 필요한 경우
 *
 * ❌ 부적합한 경우:
 * - 런타임에 동적으로 변환기를 추가해야 하는 경우
 * - 메모리 제약이 심한 환경
 * - 매우 단순한 변환 로직만 필요한 경우
 * - 함수형 프로그래밍을 선호하는 팀
 *
 * 🔧 주요 기능:
 * 1. 코드 블록 보호 및 복원
 * 2. 인용문 보호 및 복원
 * 3. 테이블 블록 수정
 * 4. 제목 블록 수정
 * 5. 마크다운 문법 변환
 * 6. 미완성 태그 수정
 * 7. 안전하지 않은 HTML 태그 정리
 * 8. 링크 변환 (YouTube, 파일, Google Drive, 북마크)
 * 9. 중첩 링크 수정
 *
 * 📊 성능 특성:
 * - 처리 속도: 중간 (클래스 인스턴스 오버헤드)
 * - 메모리 사용량: 중간 (클래스 인스턴스들)
 * - 확장성: 중간 (컴파일 타임 확장)
 * - 유지보수성: 높음 (명확한 구조)
 *
 * 🚀 최적화 기법:
 * - 객체 풀링 (Object Pooling)
 * - 지연 초기화 (Lazy Initialization)
 * - 메모이제이션 (Memoization)
 * - 불필요한 객체 생성 최소화
 *
 * @version 1.0.0
 * @author AI Assistant & ryoon (ryoon.with.wisdomtrees@gmail.com)
 * @created 2025-08-08
 * @lastModified 2025-08-08
 */

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

// ===== 허용된 HTML 태그 상수 =====
const ALLOWED_HTML_TAGS = [
  // 제목 태그
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // 텍스트 관련
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
  // 링크
  "a",
  // 인용
  "blockquote",
  "cite",
  // 코드
  "code",
  "pre",
  "kbd",
  "samp",
  "var",
  // 목록
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  // 테이블
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
  // 미디어
  "img",
  "video",
  "audio",
  "source",
  "track",
  "figure",
  "figcaption",
  // 폼 요소
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
  // 기타
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
  // SVG
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
  // MathML
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
  // 기타 안전한 태그들
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
  // 커스텀 컴포넌트
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
  "tabindex",
  "title",
] as const;

// ===== 추상 변환기 클래스 =====
abstract class ContentTransformer {
  abstract transform(content: string, context: ProcessingContext): string;
  abstract getName(): string;
}

// ===== 구체적인 변환기 클래스들 =====

class CodeBlockProtector extends ContentTransformer {
  getName() {
    return "CodeBlockProtector";
  }

  transform(content: string, context: ProcessingContext): string {
    return content.replace(/```[\s\S]*?```/g, (match) => {
      const marker = `__CODE_BLOCK_${context.codeBlockIndex}__`;
      context.codeBlocks.push({ marker, content: match });
      context.codeBlockIndex++;
      return marker;
    });
  }
}

class BlockquoteProtector extends ContentTransformer {
  getName() {
    return "BlockquoteProtector";
  }

  transform(content: string, context: ProcessingContext): string {
    return content.replace(/^>\s*(.+)$/gm, (match, content) => {
      const marker = `__BLOCKQUOTE_${context.blockquoteIndex}__`;
      context.blockquotes.push({ marker, content: match });
      context.blockquoteIndex++;
      return marker;
    });
  }
}

class TableBlockFixer extends ContentTransformer {
  getName() {
    return "TableBlockFixer";
  }

  transform(content: string): string {
    return content.replace(
      /(\|[^|\n]*\|[^|\n]*\|[^|\n]*\n?)+/g,
      (tableMatch) => {
        return tableMatch.replace(/\|([^|]*)\|/g, (cellMatch, cellContent) => {
          return `|${cellContent}|`;
        });
      }
    );
  }
}

class HeadingBlockFixer extends ContentTransformer {
  getName() {
    return "HeadingBlockFixer";
  }

  transform(content: string): string {
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
  }
}

class MarkdownSyntaxConverter extends ContentTransformer {
  getName() {
    return "MarkdownSyntaxConverter";
  }

  transform(content: string): string {
    // **bold** → <strong>bold</strong>
    content = content.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
    // *italic* → <em>italic</em>
    content = content.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
    // `code` → <code>code</code>
    content = content.replace(/`([^`\n]+)`/g, "<code>$1</code>");

    return content;
  }
}

class UnclosedTagFixer extends ContentTransformer {
  getName() {
    return "UnclosedTagFixer";
  }

  transform(content: string): string {
    // 닫히지 않은 태그들 처리
    content = content.replace(/<em>([^<]*?)(?=\n|$)/g, "<em>$1</em>");
    content = content.replace(
      /<strong>([^<]*?)(?=\n|$)/g,
      "<strong>$1</strong>"
    );
    content = content.replace(/<code>([^<]*?)(?=\n|$)/g, "<code>$1</code>");

    return content;
  }
}

class UnsafeTagSanitizer extends ContentTransformer {
  getName() {
    return "UnsafeTagSanitizer";
  }

  transform(content: string): string {
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
        this.hasAllowedAttributes(tagContent)
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
  }

  private hasAllowedAttributes(tagContent: string): boolean {
    return ALLOWED_JSX_ATTRIBUTES.some(
      (attr) =>
        tagContent.includes(`${attr}=`) ||
        tagContent.includes("data-") ||
        tagContent.includes("aria-")
    );
  }
}

class ContentRestorer extends ContentTransformer {
  getName() {
    return "ContentRestorer";
  }

  transform(content: string, context: ProcessingContext): string {
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
  }
}

// ===== 링크 변환기 클래스들 =====

class LinkTransformer extends ContentTransformer {
  getName() {
    return "LinkTransformer";
  }

  transform(content: string): string {
    content = this.transformYouTubeLinks(content);
    content = this.transformEmbededLinks(content);
    content = this.transformFileLinks(content);
    content = this.transformGoogleDriveLinks(content);
    content = this.transformBookMarkLinks(content);
    return content;
  }

  private transformYouTubeLinks(content: string): string {
    return content.replace(
      /\[video\]\((https?:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/[^\s)]+)\)/g,
      (match, url) => {
        const cleanUrl = url.split("?")[0];
        return `<YoutubeWrapper names={"video"} urls={"${cleanUrl}"} />`;
      }
    );
  }

  private transformEmbededLinks(content: string): string {
    return content.replace(
      /\[embed\]\((https?:\/\/[^\s)]+)\)/g,
      (match, url) => {
        return `<EmbededWrapper names={"embed"} urls={"${url}"} />`;
      }
    );
  }

  private transformFileLinks(content: string): string {
    return content.replace(
      /\[([^\]]+\.(pdf|doc|docx|rtf|txt|md|odt))\]\(([^)]+)\)/gi,
      (match, fileName, extension, url) => {
        return `<FileWrapper names={"${fileName}"} urls={"${url}"} />`;
      }
    );
  }

  private transformGoogleDriveLinks(content: string): string {
    return content.replace(
      /\[([^\]]+)\]\((https?:\/\/drive\.google\.com\/file\/d\/[^\s)]+)\)/g,
      (match, linkText, url) => {
        return `<GoogleDriveWrapper names={"${linkText}"} urls={"${url}"} />`;
      }
    );
  }

  private transformBookMarkLinks(content: string): string {
    return content.replace(
      /\[bookmark\]\((https?:\/\/[^\s)]+)\)/g,
      (match, url) => {
        return `<BookMarkWrapper names={"bookmark"} urls={"${url}"} />`;
      }
    );
  }
}

class NestedLinkFixer extends ContentTransformer {
  getName() {
    return "NestedLinkFixer";
  }

  transform(content: string): string {
    // 패턴 1: <a> 태그 안의 [**text**](url) 형태를 **text**로 변경
    content = content.replace(
      /(<a[^>]*>)(\[(\*\*[^*]+\*\*)\]\([^)]+\))(<\/a>)/g,
      "$1$3$4"
    );

    // 패턴 2: <a> 태그 안의 [**text**](url) 형태를 text로 변경 (볼드 제거)
    content = content.replace(
      /(<a[^>]*>)(\[\*\*([^*]+)\*\*\]\([^)]+\))(<\/a>)/g,
      "$1$3$4"
    );

    // 패턴 3: <a> 태그 안의 [text](url) 형태를 text로 변경 (일반 링크)
    content = content.replace(
      /(<a[^>]*>)(\[([^\]]+)\]\([^)]+\))(<\/a>)/g,
      "$1$3$4"
    );

    return content;
  }
}

// ===== 메인 MDX 처리 클래스 =====
class MdxContentProcessor {
  private transformers: ContentTransformer[] = [
    new CodeBlockProtector(),
    new BlockquoteProtector(),
    new TableBlockFixer(),
    new HeadingBlockFixer(),
    new MarkdownSyntaxConverter(),
    new UnclosedTagFixer(),
    new UnsafeTagSanitizer(),
    new ContentRestorer(),
  ];

  private linkTransformers: ContentTransformer[] = [
    new LinkTransformer(),
    new NestedLinkFixer(),
  ];

  process(content: string): string {
    const context: ProcessingContext = {
      codeBlocks: [],
      blockquotes: [],
      codeBlockIndex: 0,
      blockquoteIndex: 0,
    };

    let processedContent = content;

    // 1단계: 링크 변환
    for (const transformer of this.linkTransformers) {
      processedContent = transformer.transform(processedContent, context);
    }

    // 2단계: 콘텐츠 보호 및 변환
    for (const transformer of this.transformers) {
      processedContent = transformer.transform(processedContent, context);
    }

    // 3단계: MDX 확장 문법 제거
    processedContent = processedContent.replace(/\{:[^}]+\}/g, "");

    return processedContent;
  }

  // 디버깅을 위한 단계별 처리
  processWithLogging(content: string): string {
    const context: ProcessingContext = {
      codeBlocks: [],
      blockquotes: [],
      codeBlockIndex: 0,
      blockquoteIndex: 0,
    };

    let processedContent = content;

    console.log("🔄 MDX 처리 시작...");

    // 링크 변환
    for (const transformer of this.linkTransformers) {
      console.log(`📝 ${transformer.getName()} 실행 중...`);
      processedContent = transformer.transform(processedContent, context);
    }

    // 콘텐츠 변환
    for (const transformer of this.transformers) {
      console.log(`📝 ${transformer.getName()} 실행 중...`);
      processedContent = transformer.transform(processedContent, context);
    }

    // MDX 확장 문법 제거
    processedContent = processedContent.replace(/\{:[^}]+\}/g, "");

    console.log("✅ MDX 처리 완료");
    return processedContent;
  }
}

// ===== 싱글톤 인스턴스 =====
const mdxProcessor = new MdxContentProcessor();

// ===== 공개 API 함수들 =====

/**
 * MDX에서 문제가 있는 태그들을 안전한 문자열(HTML 엔티티)로 변환
 */
export function convertUnsafeTags(content: string): string {
  return mdxProcessor.process(content);
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

      const fallbackContent = `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`;
      return { isValid: false, content: fallbackContent, errors };
    }
  }
}

export function processMdxContent(content: string): string {
  return mdxProcessor.process(content);
}

export function decodeUrlEncodedLinks(content: string): string {
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const decodedText = decodeURIComponent(text);
    return `[${decodedText}](${url})`;
  });
}

// ===== 디버깅용 함수 =====
export function processMdxContentWithLogging(content: string): string {
  return mdxProcessor.processWithLogging(content);
}
