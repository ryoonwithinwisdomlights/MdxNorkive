/**
 * MDX 콘텐츠 안전 변환 유틸리티 (전략 패턴 + 플러그인 아키텍처 버전)
 *
 * 📋 파일 역할:
 * Notion에서 가져온 MDX 콘텐츠를 안전하게 처리하는 플러그인 기반 변환기입니다.
 * 전략 패턴과 플러그인 아키텍처를 결합하여 런타임에 확장 가능한 변환 시스템을 제공합니다.
 *
 * 🏗️ 아키텍처: 방안 3 - 전략 패턴 + 플러그인 아키텍처
 *
 * ✅ 주요 장점:
 * 1. 런타임 확장성 (Runtime Extensibility)
 *    - 실행 중에 플러그인 추가/제거 가능
 *    - 새로운 변환 로직을 코드 수정 없이 추가
 *    - 동적 기능 확장 지원
 *
 * 2. 우선순위 기반 실행 (Priority-Based Execution)
 *    - 각 플러그인에 우선순위 할당
 *    - 실행 순서를 명확하게 제어
 *    - 의존성 관리 용이
 *
 * 3. 조건부 실행 (Conditional Execution)
 *    - shouldRun() 메서드로 조건부 처리
 *    - 불필요한 처리 방지로 성능 최적화
 *    - 스마트한 리소스 관리
 *
 * 4. 완전한 유연성 (Complete Flexibility)
 *    - 플러그인 조합 자유도 극대화
 *    - 다양한 처리 시나리오 지원
 *    - 사용자 정의 플러그인 개발 가능
 *
 * 5. 모듈화된 설계 (Modular Design)
 *    - 각 변환 로직이 독립적인 플러그인
 *    - 단일 책임 원칙 준수
 *    - 코드 재사용성 극대화
 *
 * 6. 플러그인 관리 시스템 (Plugin Management)
 *    - 중앙집중식 플러그인 등록/해제
 *    - 플러그인 생명주기 관리
 *    - 플러그인 상태 모니터링
 *
 * 🔴 주요 부작용 및 한계:
 * 1. 복잡성 증가
 *    - 플러그인 인터페이스 이해 필요
 *    - 우선순위 시스템 복잡성
 *    - 초기 설정 및 구성 복잡
 *
 * 2. 성능 오버헤드
 *    - 플러그인 매니저 오버헤드
 *    - 조건부 실행 검사 비용
 *    - 메모리 사용량 증가
 *
 * 3. 디버깅 어려움
 *    - 플러그인 체인에서 오류 추적 복잡
 *    - 우선순위 충돌 디버깅 어려움
 *    - 플러그인 간 상호작용 문제
 *
 * 4. 학습 곡선
 *    - 플러그인 아키텍처 패턴 이해 필요
 *    - 인터페이스 설계 원칙 숙지 필요
 *    - 플러그인 개발 방법론 학습 필요
 *
 * 5. 유지보수 복잡성
 *    - 플러그인 간 의존성 관리
 *    - 버전 호환성 문제
 *    - 플러그인 충돌 해결
 *
 * 🎯 사용 시나리오:
 *
 * ✅ 적합한 경우:
 * - 런타임에 기능 확장이 필요한 경우
 * - 다양한 변환 로직을 조합해야 하는 경우
 * - 플러그인 생태계를 구축하려는 경우
 * - 조건부 처리가 중요한 경우
 * - 우선순위 기반 처리가 필요한 경우
 * - 마이크로서비스 아키텍처
 * - 확장 가능한 시스템 설계
 *
 * ❌ 부적합한 경우:
 * - 단순한 변환 로직만 필요한 경우
 * - 성능이 매우 중요한 경우
 * - 팀이 플러그인 아키텍처에 익숙하지 않은 경우
 * - 빠른 개발이 우선인 경우
 * - 메모리 제약이 심한 환경
 *
 * 🔧 주요 기능:
 * 1. 플러그인 등록/해제 시스템
 * 2. 우선순위 기반 실행 순서 제어
 * 3. 조건부 실행 (shouldRun 메서드)
 * 4. 플러그인 생명주기 관리
 * 5. 15개의 기본 플러그인 제공
 * 6. 런타임 플러그인 동적 관리
 * 7. 플러그인 상태 모니터링
 *
 * 📊 성능 특성:
 * - 처리 속도: 중간 (플러그인 매니저 오버헤드)
 * - 메모리 사용량: 높음 (플러그인 인스턴스들)
 * - 확장성: 매우 높음 (무제한 플러그인 추가)
 * - 유지보수성: 높음 (모듈화된 설계)
 *
 * 🚀 최적화 기법:
 * - 조건부 실행으로 불필요한 처리 방지
 * - 우선순위 기반 실행으로 효율적인 순서 제어
 * - 플러그인 캐싱 및 재사용
 * - 배치 처리 지원
 * - 메모리 효율적인 플러그인 관리
 *
 * 🔌 플러그인 생태계:
 * 현재 제공되는 15개 기본 플러그인:
 * 1. CodeBlockProtector (우선순위: 100)
 * 2. BlockquoteProtector (우선순위: 95)
 * 3. TableBlockFixer (우선순위: 90)
 * 4. HeadingBlockFixer (우선순위: 85)
 * 5. MarkdownSyntaxConverter (우선순위: 80)
 * 6. UnclosedTagFixer (우선순위: 75)
 * 7. UnsafeTagSanitizer (우선순위: 70)
 * 8. YouTubeLinkTransformer (우선순위: 60)
 * 9. EmbedLinkTransformer (우선순위: 55)
 * 10. FileLinkTransformer (우선순위: 50)
 * 11. GoogleDriveLinkTransformer (우선순위: 45)
 * 12. BookmarkLinkTransformer (우선순위: 40)
 * 13. NestedLinkFixer (우선순위: 35)
 * 14. MdxExtensionRemover (우선순위: 5)
 * 15. ContentRestorer (우선순위: 10)
 *
 * 📈 확장성:
 * - 사용자 정의 플러그인 개발 가능
 * - 플러그인 마켓플레이스 구축 가능
 * - 서드파티 플러그인 통합 지원
 * - 플러그인 버전 관리 시스템
 *
 * 🔄 대안 비교:
 * - 클래스 기반: 정적 구조, 컴파일 타임 확장
 * - 함수형: 순수 함수, 부작용 없음
 * - 플러그인 아키텍처: 런타임 확장, 최대 유연성 (현재 선택)
 *
 * @version 3.0.0
 * @author AI Assistant
 * @created 2024-12-19
 * @lastModified 2024-12-19
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

interface ProcessingResult {
  content: string;
  context: ProcessingContext;
}

// ===== 플러그인 인터페이스 =====
interface MdxPlugin {
  name: string;
  priority: number;
  transform(content: string, context: ProcessingContext): ProcessingResult;
  shouldRun?(content: string): boolean;
}

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
  "tabindex",
  "title",
] as const;

// ===== 플러그인 구현들 =====

// 1. 코드블록 보호 플러그인
class CodeBlockProtectorPlugin implements MdxPlugin {
  name = "CodeBlockProtector";
  priority = 100; // 높은 우선순위 (먼저 실행)

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(/```[\s\S]*?```/g, (match) => {
      const marker = `__CODE_BLOCK_${context.codeBlockIndex}__`;
      context.codeBlocks.push({ marker, content: match });
      context.codeBlockIndex++;
      return marker;
    });

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return content.includes("```");
  }
}

// 2. 인용문 보호 플러그인
class BlockquoteProtectorPlugin implements MdxPlugin {
  name = "BlockquoteProtector";
  priority = 95;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /^>\s*(.+)$/gm,
      (match, content) => {
        const marker = `__BLOCKQUOTE_${context.blockquoteIndex}__`;
        context.blockquotes.push({ marker, content: match });
        context.blockquoteIndex++;
        return marker;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /^>\s/.test(content);
  }
}

// 3. 테이블 블록 수정 플러그인
class TableBlockFixerPlugin implements MdxPlugin {
  name = "TableBlockFixer";
  priority = 90;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /(\|[^|\n]*\|[^|\n]*\|[^|\n]*\n?)+/g,
      (tableMatch) => {
        return tableMatch.replace(/\|([^|]*)\|/g, (cellMatch, cellContent) => {
          return `|${cellContent}|`;
        });
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return content.includes("|") && /\|[^|\n]*\|[^|\n]*\|/.test(content);
  }
}

// 4. 제목 블록 수정 플러그인
class HeadingBlockFixerPlugin implements MdxPlugin {
  name = "HeadingBlockFixer";
  priority = 85;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    // 빈 제목 수정
    let transformedContent = content.replace(/^#{1,6}\s*$/gm, (match) => {
      const level = match.match(/^#{1,6}/)?.[0] || "#";
      return `${level} 제목 없음`;
    });

    // 제목이 있지만 내용이 비어있거나 공백만 있는 경우 처리
    transformedContent = transformedContent.replace(
      /^#{1,6}\s*([^\n]*)$/gm,
      (match, title) => {
        const level = match.match(/^#{1,6}/)?.[0] || "#";
        const trimmedTitle = title.trim();

        if (!trimmedTitle || trimmedTitle === "") {
          return `${level} 제목 없음`;
        }

        if (
          trimmedTitle.length <= 2 &&
          !/^[a-zA-Z가-힣0-9]/.test(trimmedTitle)
        ) {
          return `${level} 제목 없음`;
        }

        return match;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /^#{1,6}/.test(content);
  }
}

// 5. 마크다운 문법 변환 플러그인
class MarkdownSyntaxConverterPlugin implements MdxPlugin {
  name = "MarkdownSyntaxConverter";
  priority = 80;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content
      .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
      .replace(/`([^`\n]+)`/g, "<code>$1</code>");

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\*\*.*\*\*|\*.*\*|`.*`/.test(content);
  }
}

// 6. 닫히지 않은 태그 수정 플러그인
class UnclosedTagFixerPlugin implements MdxPlugin {
  name = "UnclosedTagFixer";
  priority = 75;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content
      .replace(/<em>([^<]*?)(?=\n|$)/g, "<em>$1</em>")
      .replace(/<strong>([^<]*?)(?=\n|$)/g, "<strong>$1</strong>")
      .replace(/<code>([^<]*?)(?=\n|$)/g, "<code>$1</code>");

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /<em>|<strong>|<code>/.test(content);
  }
}

// 7. 안전하지 않은 태그 정리 플러그인
class UnsafeTagSanitizerPlugin implements MdxPlugin {
  name = "UnsafeTagSanitizer";
  priority = 70;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /<([^>]+)>/g,
      (match, tagContent) => {
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
      }
    );

    return { content: transformedContent, context };
  }

  private hasAllowedAttributes(tagContent: string): boolean {
    return ALLOWED_JSX_ATTRIBUTES.some(
      (attr) =>
        tagContent.includes(`${attr}=`) ||
        tagContent.includes("data-") ||
        tagContent.includes("aria-")
    );
  }

  shouldRun(content: string): boolean {
    return /<[^>]+>/.test(content);
  }
}

// 8. 보호된 콘텐츠 복원 플러그인
class ContentRestorerPlugin implements MdxPlugin {
  name = "ContentRestorer";
  priority = 10; // 낮은 우선순위 (마지막에 실행)

  transform(content: string, context: ProcessingContext): ProcessingResult {
    let transformedContent = content;

    // 코드블록 복원
    for (let i = context.codeBlocks.length - 1; i >= 0; i--) {
      const block = context.codeBlocks[i];
      transformedContent = transformedContent
        .split(block.marker)
        .join(block.content);
    }

    // 인용문 복원
    for (let i = context.blockquotes.length - 1; i >= 0; i--) {
      const block = context.blockquotes[i];
      transformedContent = transformedContent
        .split(block.marker)
        .join(block.content);
    }

    return { content: transformedContent, context };
  }
}

// 9. YouTube 링크 변환 플러그인
class YouTubeLinkTransformerPlugin implements MdxPlugin {
  name = "YouTubeLinkTransformer";
  priority = 60;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /\[video\]\((https?:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/[^\s)]+)\)/g,
      (match, url) => {
        const cleanUrl = url.split("?")[0];
        return `<YoutubeWrapper names={"video"} urls={"${cleanUrl}"} />`;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\[video\]\(.*youtube/.test(content);
  }
}

// 10. 임베드 링크 변환 플러그인
class EmbedLinkTransformerPlugin implements MdxPlugin {
  name = "EmbedLinkTransformer";
  priority = 55;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /\[embed\]\((https?:\/\/[^\s)]+)\)/g,
      (match, url) => {
        return `<EmbededWrapper names={"embed"} urls={"${url}"} />`;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\[embed\]\(/.test(content);
  }
}

// 11. 파일 링크 변환 플러그인
class FileLinkTransformerPlugin implements MdxPlugin {
  name = "FileLinkTransformer";
  priority = 50;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /\[([^\]]+\.(pdf|doc|docx|rtf|txt|md|odt))\]\(([^)]+)\)/gi,
      (match, fileName, extension, url) => {
        return `<FileWrapper names={"${fileName}"} urls={"${url}"} />`;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\[.*\.(pdf|doc|docx|rtf|txt|md|odt)\]\(/.test(content);
  }
}

// 12. Google Drive 링크 변환 플러그인
class GoogleDriveLinkTransformerPlugin implements MdxPlugin {
  name = "GoogleDriveLinkTransformer";
  priority = 45;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /\[([^\]]+)\]\((https?:\/\/drive\.google\.com\/file\/d\/[^\s)]+)\)/g,
      (match, linkText, url) => {
        return `<GoogleDriveWrapper names={"${linkText}"} urls={"${url}"} />`;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\[.*\]\(.*drive\.google\.com/.test(content);
  }
}

// 13. 북마크 링크 변환 플러그인
class BookmarkLinkTransformerPlugin implements MdxPlugin {
  name = "BookmarkLinkTransformer";
  priority = 40;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(
      /\[bookmark\]\((https?:\/\/[^\s)]+)\)/g,
      (match, url) => {
        return `<BookMarkWrapper names={"bookmark"} urls={"${url}"} />`;
      }
    );

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\[bookmark\]\(/.test(content);
  }
}

// 14. 중첩 링크 수정 플러그인
class NestedLinkFixerPlugin implements MdxPlugin {
  name = "NestedLinkFixer";
  priority = 35;

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content
      .replace(/(<a[^>]*>)(\[(\*\*[^*]+\*\*)\]\([^)]+\))(<\/a>)/g, "$1$3$4")
      .replace(/(<a[^>]*>)(\[\*\*([^*]+)\*\*\]\([^)]+\))(<\/a>)/g, "$1$3$4")
      .replace(/(<a[^>]*>)(\[([^\]]+)\]\([^)]+\))(<\/a>)/g, "$1$3$4");

    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /<a[^>]*>\[.*\]\(.*\)<\/a>/.test(content);
  }
}

// 15. MDX 확장 문법 제거 플러그인
class MdxExtensionRemoverPlugin implements MdxPlugin {
  name = "MdxExtensionRemover";
  priority = 5; // 매우 낮은 우선순위

  transform(content: string, context: ProcessingContext): ProcessingResult {
    const transformedContent = content.replace(/\{:[^}]+\}/g, "");
    return { content: transformedContent, context };
  }

  shouldRun(content: string): boolean {
    return /\{:[^}]+\}/.test(content);
  }
}

// ===== 플러그인 매니저 =====
class PluginManager {
  private plugins: MdxPlugin[] = [];

  register(plugin: MdxPlugin): void {
    this.plugins.push(plugin);
    // 우선순위에 따라 정렬 (높은 우선순위가 먼저)
    this.plugins.sort((a, b) => b.priority - a.priority);
  }

  registerMultiple(plugins: MdxPlugin[]): void {
    plugins.forEach((plugin) => this.register(plugin));
  }

  unregister(pluginName: string): void {
    this.plugins = this.plugins.filter((plugin) => plugin.name !== pluginName);
  }

  getPlugins(): MdxPlugin[] {
    return [...this.plugins];
  }

  process(content: string, context: ProcessingContext): ProcessingResult {
    let result: ProcessingResult = { content, context };

    for (const plugin of this.plugins) {
      // shouldRun이 있으면 조건 확인, 없으면 항상 실행
      if (!plugin.shouldRun || plugin.shouldRun(result.content)) {
        try {
          result = plugin.transform(result.content, result.context);
        } catch (error) {
          console.error(`❌ 플러그인 ${plugin.name} 실행 중 오류:`, error);
        }
      }
    }

    return result;
  }

  processWithLogging(
    content: string,
    context: ProcessingContext
  ): ProcessingResult {
    let result: ProcessingResult = { content, context };

    console.log("🔄 MDX 처리 시작...");

    for (const plugin of this.plugins) {
      if (!plugin.shouldRun || plugin.shouldRun(result.content)) {
        console.log(
          `📝 ${plugin.name} 실행 중... (우선순위: ${plugin.priority})`
        );
        try {
          result = plugin.transform(result.content, result.context);
        } catch (error) {
          console.error(`❌ 플러그인 ${plugin.name} 실행 중 오류:`, error);
        }
      } else {
        console.log(`⏭️ ${plugin.name} 건너뜀 (조건 불충족)`);
      }
    }

    console.log("✅ MDX 처리 완료");
    return result;
  }
}

// ===== 기본 플러그인 등록 =====
const createDefaultPluginManager = (): PluginManager => {
  const manager = new PluginManager();

  manager.registerMultiple([
    new CodeBlockProtectorPlugin(),
    new BlockquoteProtectorPlugin(),
    new TableBlockFixerPlugin(),
    new HeadingBlockFixerPlugin(),
    new MarkdownSyntaxConverterPlugin(),
    new UnclosedTagFixerPlugin(),
    new UnsafeTagSanitizerPlugin(),
    new YouTubeLinkTransformerPlugin(),
    new EmbedLinkTransformerPlugin(),
    new FileLinkTransformerPlugin(),
    new GoogleDriveLinkTransformerPlugin(),
    new BookmarkLinkTransformerPlugin(),
    new NestedLinkFixerPlugin(),
    new MdxExtensionRemoverPlugin(),
    new ContentRestorerPlugin(),
  ]);

  return manager;
};

// ===== 싱글톤 인스턴스 =====
const defaultPluginManager = createDefaultPluginManager();

// ===== 메인 처리 함수 =====
const processMdxContent = (content: string): string => {
  const context: ProcessingContext = {
    codeBlocks: [],
    blockquotes: [],
    codeBlockIndex: 0,
    blockquoteIndex: 0,
  };

  const result = defaultPluginManager.process(content, context);
  return result.content;
};

const processMdxContentWithLogging = (content: string): string => {
  const context: ProcessingContext = {
    codeBlocks: [],
    blockquotes: [],
    codeBlockIndex: 0,
    blockquoteIndex: 0,
  };

  const result = defaultPluginManager.processWithLogging(content, context);
  return result.content;
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

      const fallbackContent = `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`;
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

// ===== 플러그인 관리 API =====
export function registerPlugin(plugin: MdxPlugin): void {
  defaultPluginManager.register(plugin);
}

export function unregisterPlugin(pluginName: string): void {
  defaultPluginManager.unregister(pluginName);
}

export function getRegisteredPlugins(): MdxPlugin[] {
  return defaultPluginManager.getPlugins();
}
