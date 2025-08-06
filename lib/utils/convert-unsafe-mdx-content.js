function processMdxContent(content) {
  return fixNestedLinks(convertUnsafeTags(content));
}

function decodeUrlEncodedLinks(content) {
  // 마크다운 링크에서 URL 인코딩된 텍스트만 디코딩 (URL은 그대로 유지)
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // 링크 텍스트만 디코딩, URL은 그대로 유지
    const decodedText = decodeURIComponent(text);
    return `[${decodedText}](${url})`;
  });
}

function fixNestedLinks(content) {
  // 중첩된 링크 문제만 해결: <a> 태그 안에 마크다운 링크가 있는 경우
  // 패턴: <a href="...">[text](url)</a> → <a href="...">text</a>

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

/**
 * MDX에서 문제가 있는 태그들을 안전한 문자열(HTML 엔티티)로 변환
 * 코드블록(``` ... ```) 내부는 변환하지 않음
 */
function convertUnsafeTags(content) {
  let safeContent = content;

  // 코드블록을 보호하기 위해 임시 마커로 교체
  const codeBlocks = [];
  let codeBlockIndex = 0;

  // 코드블록을 찾아서 임시 마커로 교체
  safeContent = safeContent.replace(/```[\s\S]*?```/g, (match) => {
    const marker = `__CODE_BLOCK_${codeBlockIndex}__`;
    codeBlocks[codeBlockIndex] = match;
    codeBlockIndex++;
    return marker;
  });

  // 테이블 블록을 정확히 감지하고 처리
  safeContent = safeContent.replace(
    /(\|[^|\n]*\|[^|\n]*\|[^|\n]*\n?)+/g,
    (tableMatch) => {
      // 테이블 내의 각 셀에서 태그를 HTML 엔티티로 변환
      return tableMatch.replace(/\|([^|]*)\|/g, (cellMatch, cellContent) => {
        const safeCellContent = cellContent.replace(
          /<([^>]+)>/g,
          (tagMatch, tagContent) => {
            // 테이블 내에서는 모든 태그를 HTML 엔티티로 변환
            return `&lt;${tagContent}&gt;`;
          }
        );
        return `|${safeCellContent}|`;
      });
    }
  );

  // 일반 텍스트에서 <로 시작하고 >로 끝나는 모든 텍스트를 처리 (더 포괄적)
  safeContent = safeContent.replace(/<([^>]+)>/g, (match, tagContent) => {
    // 태그 내용에서 첫 번째 단어를 태그명으로 추출 (공백, 따옴표, 등호 등을 고려)
    const tagName = tagContent
      .trim()
      .split(/[\s='"]+/)[0]
      .toLowerCase();

    // MDX에서 안전하게 사용할 수 있는 HTML 태그들
    const SELECTORS = [
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

      // 폼 요소 (일부)
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

      // SVG (기본)
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

      // MathML (기본)
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
    ];

    // 1. 허용된 HTML 태그는 그대로 유지
    if (SELECTORS.includes(tagName)) {
      return match;
    }

    // 2. 허용된 태그에 JSX 속성이 있는 경우 허용 (className, id, style 등)
    if (
      SELECTORS.includes(tagName) &&
      (tagContent.includes("className=") ||
        tagContent.includes("id=") ||
        tagContent.includes("style=") ||
        tagContent.includes("src=") ||
        tagContent.includes("href=") ||
        tagContent.includes("alt=") ||
        tagContent.includes("target=") ||
        tagContent.includes("rel=") ||
        tagContent.includes("onClick=") ||
        tagContent.includes("onChange=") ||
        tagContent.includes("value=") ||
        tagContent.includes("type=") ||
        tagContent.includes("placeholder=") ||
        tagContent.includes("disabled=") ||
        tagContent.includes("required=") ||
        tagContent.includes("checked=") ||
        tagContent.includes("selected=") ||
        tagContent.includes("readonly=") ||
        tagContent.includes("maxlength=") ||
        tagContent.includes("minlength=") ||
        tagContent.includes("pattern=") ||
        tagContent.includes("autocomplete=") ||
        tagContent.includes("autofocus=") ||
        tagContent.includes("form=") ||
        tagContent.includes("name=") ||
        tagContent.includes("tabindex=") ||
        tagContent.includes("title=") ||
        tagContent.includes("data-") ||
        tagContent.includes("aria-"))
    ) {
      return match;
    }

    // 3. 닫는 태그는 허용된 태그만 허용 (</tag>)
    if (tagContent.startsWith("/")) {
      const closingTagName = tagContent.substring(1).toLowerCase();
      if (SELECTORS.includes(closingTagName)) {
        return match;
      }
    }

    // 4. 그 외의 모든 것은 HTML 엔티티로 변환
    return `&lt;${tagContent}&gt;`;
  });

  // MDX 확장 문법 제거
  safeContent = safeContent.replace(/\{:[^}]+\}/g, "");

  // 코드블록을 원래대로 복원
  for (let i = codeBlocks.length - 1; i >= 0; i--) {
    const marker = `__CODE_BLOCK_${i}__`;
    const codeBlock = codeBlocks[i];
    // 단순 문자열 교체로 줄바꿈 보존
    safeContent = safeContent.split(marker).join(codeBlock);
  }

  return safeContent;
}

module.exports = {
  processMdxContent,
  convertUnsafeTags,
  decodeUrlEncodedLinks,
};
