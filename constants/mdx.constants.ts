/**
 * MDX 관련 상수 정의
 *
 * 📋 파일 역할:
 * MDX 콘텐츠 처리에 필요한 모든 상수들을 중앙 집중 관리합니다.
 *
 * 🏗️ 아키텍처: 상수 관리
 * - 허용된 HTML 태그 목록
 * - 허용된 JSX 속성 목록
 * - 기타 MDX 처리 관련 상수들
 *
 ** ALLOWED_HTML_TAGS: 허용된 HTML 태그 목록 (보안 고려사항 포함)
 * ALLOWED_JSX_ATTRIBUTES: 허용된 JSX 속성 목록
 * MDX_CONSTANTS: 코드 블록 마커, 기본 템플릿 등
 * MDX_LINK_PATTERNS: 링크 변환 정규식 패턴들
 * MDX_CONTENT_PATTERNS: 콘텐츠 변환 정규식 패턴들
 *
 *
 * @version 1.0.0
 * @author AI Assistant & ryoon (ryoon.with.wisdomtrees@gmail.com)
 * @created 2025-08-08
 * @lastModified 2025-08-08
 */

/**
 * MDX에서 허용되는 HTML 태그 목록
 *
 * 🔒 보안 고려사항:
 * - XSS 공격 방지를 위해 엄격하게 제한
 * - 필요한 태그만 허용
 * - 커스텀 컴포넌트도 포함
 */
export const ALLOWED_HTML_TAGS = [
  // 기본 구조 태그
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

  // 텍스트 스타일 태그
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

  // 링크 및 인용 태그
  "a",
  "blockquote",
  "cite",

  // 코드 관련 태그
  "code",
  "pre",
  "kbd",
  "samp",
  "var",

  // 리스트 태그
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",

  // 테이블 태그
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

  // 미디어 태그
  "img",
  "video",
  "audio",
  "source",
  "track",
  "figure",
  "figcaption",

  // 폼 태그
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

  // 인터랙티브 태그
  "details",
  "summary",
  "dialog",
  "menu",
  "menuitem",

  // 시맨틱 태그
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

  // 데이터 태그
  "time",
  "data",
  "meter",
  "progress",

  // SVG 태그
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

  // 수학 태그
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

  // 기타 태그
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

/**
 * MDX에서 허용되는 JSX 속성 목록
 *
 * 🔒 보안 고려사항:
 * - 이벤트 핸들러는 제한적으로 허용
 * - data-* 및 aria-* 속성은 모두 허용
 * - 스타일 관련 속성은 제한적으로 허용
 */
export const ALLOWED_JSX_ATTRIBUTES = [
  // 기본 속성
  "className",
  "id",
  "style",

  // 링크 관련 속성
  "src",
  "href",
  "alt",
  "target",
  "rel",

  // 이벤트 핸들러 (제한적 허용)
  "onClick",
  "onChange",

  // 폼 관련 속성
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

  // 추가 폼 속성
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
  "spellcheck",
  "tabindex",
  "title",
  "translate",

  // 접근성 속성 (모두 허용)
  "data-",
  "aria-",
] as const;

/**
 * MDX 처리 관련 기타 상수들
 */
export const MDX_CONSTANTS = {
  // 코드 블록 마커
  CODE_BLOCK_MARKER_PREFIX: "__CODE_BLOCK_",

  // 인용문 마커
  BLOCKQUOTE_MARKER_PREFIX: "__BLOCKQUOTE_",

  // 기본 제목 텍스트
  DEFAULT_HEADING_TEXT: "제목 없음",

  // 기본 문서 템플릿
  DEFAULT_DOCUMENT_TEMPLATE: (filename: string) =>
    `# ${filename}\n\n이 문서는 준비 중입니다.\n\n원본 콘텐츠에 문제가 있어 임시로 대체되었습니다.`,

  // 빈 문서 템플릿
  EMPTY_DOCUMENT_TEMPLATE: (filename: string) =>
    `# ${filename}\n\n내용이 없습니다.`,
} as const;

/**
 * MDX 링크 변환 패턴
 */
export const MDX_LINK_PATTERNS = {
  // YouTube 링크 패턴
  YOUTUBE:
    /\[video\]\((https?:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/[^\s)]+)\)/g,

  // 임베드 링크 패턴
  EMBED: /\[embed\]\((https?:\/\/[^\s)]+)\)/g,

  // 파일 링크 패턴
  FILE: /\[([^\]]+\.(pdf|doc|docx|rtf|txt|md|odt))\]\(([^)]+)\)/gi,

  // Google Drive 링크 패턴
  GOOGLE_DRIVE:
    /\[([^\]]+)\]\((https?:\/\/drive\.google\.com\/file\/d\/[^\s)]+)\)/g,

  // 북마크 링크 패턴
  BOOKMARK: /\[bookmark\]\((https?:\/\/[^\s)]+)\)/g,

  // 일반 마크다운 링크 패턴
  GENERAL: /\[([^\]]*)\]\(([^)]*)\)/g,
} as const;

/**
 * MDX 콘텐츠 변환 패턴
 */
export const MDX_CONTENT_PATTERNS = {
  // 코드 블록 패턴
  CODE_BLOCK: /```[\s\S]*?```/g,

  // 인용문 패턴
  BLOCKQUOTE: /^>\s*(.+)$/gm,

  // 테이블 패턴
  TABLE: /(\|[^|\n]*\|[^|\n]*\|[^|\n]*\n?)+/g,

  // 제목 패턴
  HEADING: /^#{1,6}\s*([^\n]*)$/gm,

  // 마크다운 문법 패턴
  BOLD: /\*\*([^*\n]+)\*\*/g,
  ITALIC: /\*([^*\n]+)\*/g,
  INLINE_CODE: /`([^`\n]+)`/g,

  // HTML 태그 패턴
  HTML_TAG: /<([^>]+)>/g,

  // MDX 확장 문법 패턴
  MDX_EXTENSION: /\{:[^}]+\}/g,
} as const;
