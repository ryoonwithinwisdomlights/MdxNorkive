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
      return tableMatch.replace(
        /\|([^|]*<[^>]*>[^|]*)\|/g,
        (cellMatch, cellContent) => {
          const safeCellContent = cellContent.replace(
            /<([^>]+)>/g,
            (tagMatch, tagContent) => {
              // 테이블 내에서는 모든 태그를 HTML 엔티티로 변환
              return `&lt;${tagContent}&gt;`;
            }
          );
          return `|${safeCellContent}|`;
        }
      );
    }
  );

  // 일반 텍스트에서 <로 시작하고 >로 끝나는 모든 텍스트를 처리 (더 포괄적)
  safeContent = safeContent.replace(/<([^>]+)>/g, (match, tagContent) => {
    // 태그 내용에서 첫 번째 단어를 태그명으로 추출
    const tagName = tagContent.split(/\s+/)[0].toLowerCase();

    const SELECTORS = [
      "headings",
      "include",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "th",
      "p",
      "a",
      "blockquote",
      "figure",
      "figcaption",
      "strong",
      "em",
      "kbd",
      "code",
      "pre",
      "ol",
      "ul",
      "li",
      "table",
      "thead",
      "tr",
      "td",
      "img",
      "video",
      "hr",
      "lead",
      "div",
      "span",
      "b",
      "i",
      "br",
      "hr",
      "summary",
      "details",
    ];

    // 1. 표준 HTML 태그는 허용
    if (SELECTORS.includes(tagName)) {
      return match;
    }

    // 2. JSX 속성이 있는 태그는 허용 (className, id, style 등)
    if (
      tagContent.includes("className=") ||
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
      tagContent.includes("aria-")
    ) {
      return match;
    }

    // 3. 닫는 태그는 허용 (</tag>)
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

module.exports = { convertUnsafeTags };
