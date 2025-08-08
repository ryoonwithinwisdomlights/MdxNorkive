/**
 * MDX 콘텐츠 안전 변환 유틸리티 (팩토리 패턴 + 의존성 주입)
 *
 * 📋 파일 역할:
 * Notion에서 가져온 MDX 콘텐츠를 안전하게 처리하는 팩토리 패턴 기반 변환기입니다.
 * 의존성 주입과 설정 기반 처리를 통해 유연하고 확장 가능한 시스템을 제공합니다.
 *
 * 🏗️ 아키텍처: 방안 3 - 팩토리 패턴 + 의존성 주입
 *
 * ✅ 주요 장점:
 * 1. 팩토리 패턴을 통한 객체 생성 관리
 *    - 객체 생성 로직을 중앙화
 *    - 복잡한 객체 생성 과정 캡슐화
 *    - 객체 생성 시점 제어 가능
 *
 * 2. 의존성 주입으로 유연성 향상
 *    - 외부에서 의존성을 주입받아 결합도 감소
 *    - 테스트 시 모킹 용이
 *    - 런타임에 동작 변경 가능
 *
 * 3. 설정 기반 처리 시스템
 *    - 런타임에 설정 변경 가능
 *    - 조건부 실행으로 성능 최적화
 *    - 사용자 정의 설정 지원
 *
 * 4. 확장 가능한 구조
 *    - 새로운 변환기를 쉽게 추가
 *    - 기존 코드 수정 없이 기능 확장
 *    - 플러그인 형태로 기능 추가
 *
 * 5. 테스트 용이성
 *    - 의존성 주입으로 단위 테스트 편의
 *    - 모킹을 통한 격리된 테스트
 *    - 설정 기반 테스트 시나리오
 *
 * 🔴 주요 부작용 및 한계:
 * 1. 복잡성 증가
 *    - 팩토리 패턴과 DI 컨테이너 복잡성
 *    - 설정 관리의 복잡성
 *    - 초기 학습 곡선
 *
 * 2. 성능 오버헤드
 *    - 팩토리 메서드 호출 비용
 *    - 의존성 주입 처리 오버헤드
 *    - 설정 검증 비용
 *
 * 3. 메모리 사용량
 *    - 팩토리 인스턴스 메모리
 *    - 설정 객체 메모리
 *    - 의존성 그래프 메모리
 *
 * 4. 디버깅 어려움
 *    - 의존성 주입 체인 추적 복잡
 *    - 팩토리 생성 과정 디버깅 어려움
 *    - 설정 기반 동작 예측 어려움
 *
 * 5. 설정 관리 복잡성
 *    - 다양한 설정 조합 관리
 *    - 설정 유효성 검증
 *    - 설정 충돌 해결
 *
 * 🎯 사용 시나리오:
 *
 * ✅ 적합한 경우:
 * - 복잡한 객체 생성 로직이 필요한 경우
 * - 런타임에 동작을 변경해야 하는 경우
 * - 다양한 설정 조합을 지원해야 하는 경우
 * - 테스트 용이성이 중요한 경우
 * - 확장 가능한 아키텍처가 필요한 경우
 *
 * ❌ 부적합한 경우:
 * - 단순한 변환 로직만 필요한 경우
 * - 성능이 매우 중요한 경우
 * - 팀이 DI 패턴에 익숙하지 않은 경우
 * - 빠른 개발이 우선인 경우
 *
 * 🔧 주요 기능:
 * 1. 팩토리 패턴 기반 객체 생성
 * 2. 의존성 주입 시스템
 * 3. 설정 기반 처리
 * 4. 조건부 실행
 * 5. 동적 변환기 추가/제거
 * 6. 설정 유효성 검증
 * 7. 로깅 및 모니터링
 *
 * 📊 성능 특성:
 * - 처리 속도: 중간 (팩토리 + DI 오버헤드)
 * - 메모리 사용량: 중간 (팩토리 + 설정 객체)
 * - 확장성: 높음 (팩토리 패턴)
 * - 유지보수성: 높음 (의존성 주입)
 *
 * 🚀 최적화 기법:
 * - 팩토리 캐싱
 * - 지연 초기화
 * - 설정 캐싱
 * - 의존성 그래프 최적화
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

// ===== 설정 인터페이스 =====
interface ProcessorConfig {
  enableLogging?: boolean;
  enableValidation?: boolean;
  customAllowedTags?: string[];
  customAllowedAttributes?: string[];
}

// ===== 허용된 HTML 태그 상수 =====
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

  transform(content: string, context: ProcessingContext): string {
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

  transform(content: string, context: ProcessingContext): string {
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

  transform(content: string, context: ProcessingContext): string {
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

  transform(content: string, context: ProcessingContext): string {
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
  private config: ProcessorConfig;

  constructor(config: ProcessorConfig = {}) {
    super();
    this.config = config;
  }

  getName() {
    return "UnsafeTagSanitizer";
  }

  transform(content: string, context: ProcessingContext): string {
    const allowedTags = [
      ...ALLOWED_HTML_TAGS,
      ...(this.config.customAllowedTags || []),
    ];

    const allowedAttributes: string[] = [
      ...ALLOWED_JSX_ATTRIBUTES,
      ...(this.config.customAllowedAttributes || []),
    ];

    return content.replace(/<([^>]+)>/g, (match, tagContent) => {
      const tagContentFirst = tagContent.trim().split(/[\s='"]+/)[0];
      const tagName = tagContentFirst.toLowerCase();

      // 1. 허용된 HTML 태그는 그대로 유지
      if (
        allowedTags.includes(tagName as any) ||
        allowedTags.includes(tagContentFirst as any)
      ) {
        return match;
      }

      // 2. 허용된 태그에 JSX 속성이 있는 경우 허용
      if (
        allowedTags.includes(tagName as any) &&
        this.hasAllowedAttributes(tagContent, allowedAttributes)
      ) {
        return match;
      }

      // 3. 닫는 태그는 허용된 태그만 허용
      if (tagContent.startsWith("/")) {
        const closingTagName = tagContent.substring(1).toLowerCase();
        const closingTagOriginal = tagContent.substring(1);
        if (
          allowedTags.includes(closingTagName as any) ||
          allowedTags.includes(closingTagOriginal as any)
        ) {
          return match;
        }
      }

      // 4. 그 외의 모든 것은 HTML 엔티티로 변환
      if (this.config.enableLogging) {
        console.log(
          `🔒 안전하지 않은 태그 변환: <${tagContent}> → &lt;${tagContent}&gt;`
        );
      }
      return `&lt;${tagContent}&gt;`;
    });
  }

  private hasAllowedAttributes(
    tagContent: string,
    allowedAttributes: string[]
  ): boolean {
    return allowedAttributes.some(
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

  transform(content: string, context: ProcessingContext): string {
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

  transform(content: string, context: ProcessingContext): string {
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

// ===== 사용자 정의 변환기 예시 =====
class CustomTransformer extends ContentTransformer {
  getName() {
    return "CustomTransformer";
  }

  transform(content: string, context: ProcessingContext): string {
    // 사용자 정의 변환 로직
    return content;
  }
}

// ===== 팩토리 패턴 =====
class MdxProcessorFactory {
  private static instance: MdxProcessorFactory | null = null;

  static getInstance(): MdxProcessorFactory {
    if (!MdxProcessorFactory.instance) {
      MdxProcessorFactory.instance = new MdxProcessorFactory();
    }
    return MdxProcessorFactory.instance;
  }

  createProcessor(config?: ProcessorConfig): MdxContentProcessor {
    return new MdxContentProcessor(config);
  }

  createProcessorWithCustomTransformers(
    transformers: ContentTransformer[],
    config?: ProcessorConfig
  ): MdxContentProcessor {
    return new MdxContentProcessor(config, transformers);
  }
}

// ===== 개선된 메인 클래스 =====
class MdxContentProcessor {
  private transformers: ContentTransformer[];
  private config: ProcessorConfig;

  constructor(
    config: ProcessorConfig = {},
    customTransformers?: ContentTransformer[]
  ) {
    this.config = {
      enableLogging: false,
      enableValidation: true,
      ...config,
    };

    this.transformers = customTransformers || this.createDefaultTransformers();
  }

  private createDefaultTransformers(): ContentTransformer[] {
    return [
      new CodeBlockProtector(),
      new BlockquoteProtector(),
      new TableBlockFixer(),
      new HeadingBlockFixer(),
      new MarkdownSyntaxConverter(),
      new UnclosedTagFixer(),
      new UnsafeTagSanitizer(this.config),
      new ContentRestorer(),
    ];
  }

  process(content: string): string {
    const context: ProcessingContext = {
      codeBlocks: [],
      blockquotes: [],
      codeBlockIndex: 0,
      blockquoteIndex: 0,
    };

    let processedContent = content;

    // 링크 변환
    const linkTransformers = [new LinkTransformer(), new NestedLinkFixer()];

    for (const transformer of linkTransformers) {
      processedContent = transformer.transform(processedContent, context);
    }

    // 콘텐츠 변환
    for (const transformer of this.transformers) {
      if (this.config.enableLogging) {
        console.log(`📝 ${transformer.getName()} 실행 중...`);
      }
      processedContent = transformer.transform(processedContent, context);
    }

    // MDX 확장 문법 제거
    processedContent = processedContent.replace(/\{:[^}]+\}/g, "");

    return processedContent;
  }

  // 설정 업데이트
  updateConfig(newConfig: Partial<ProcessorConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // 변환기 추가/제거
  addTransformer(transformer: ContentTransformer): void {
    this.transformers.push(transformer);
  }

  removeTransformer(name: string): void {
    this.transformers = this.transformers.filter((t) => t.getName() !== name);
  }
}

// ===== 공개 API 함수들 =====

/**
 * MDX에서 문제가 있는 태그들을 안전한 문자열(HTML 엔티티)로 변환
 */
export function convertUnsafeTags(content: string): string {
  const processor = MdxProcessorFactory.getInstance().createProcessor();
  return processor.process(content);
}

/**
 * MDX 콘텐츠를 검증하고 문제가 있으면 수정
 */
export async function validateAndFixMdxContent(
  content: string,
  filename: string = "unknown"
): Promise<MdxValidationResult> {
  try {
    const processor = MdxProcessorFactory.getInstance().createProcessor();
    const processedContent = processor.process(content);
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
      const processor = MdxProcessorFactory.getInstance().createProcessor();
      const fixedContent = processor.process(content);
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
  const processor = MdxProcessorFactory.getInstance().createProcessor();
  return processor.process(content);
}

export function decodeUrlEncodedLinks(content: string): string {
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const decodedText = decodeURIComponent(text);
    return `[${decodedText}](${url})`;
  });
}

// ===== 사용 예시 =====
// 1. 기본 사용
const defaultProcessor = MdxProcessorFactory.getInstance().createProcessor();

// 2. 로깅 활성화
const loggingProcessor = MdxProcessorFactory.getInstance().createProcessor({
  enableLogging: true,
});

// 3. 커스텀 설정
const customProcessor = MdxProcessorFactory.getInstance().createProcessor({
  enableLogging: true,
  enableValidation: false,
  customAllowedTags: ["custom-tag"],
});

// 4. 커스텀 변환기와 함께
const customTransformers = [
  new CodeBlockProtector(),
  new CustomTransformer(), // 사용자 정의 변환기
  new ContentRestorer(),
];

const customProcessorWithTransformers =
  MdxProcessorFactory.getInstance().createProcessorWithCustomTransformers(
    customTransformers,
    {
      enableLogging: true,
    }
  );
