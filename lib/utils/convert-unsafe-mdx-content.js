function processMdxContent(content) {
  return fixNestedLinks(convertUnsafeTags(transformLinks(content)));
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
    const tagContentFirst = tagContent.trim().split(/[\s='"]+/)[0];
    const tagName = tagContentFirst.toLowerCase();

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
      //커스텀
      "YoutubeWrapper",
      "EmbededWrapper",
      "FileWrapper",
      "GoogleDriveWrapper",
      "BookMarkWrapper",
    ];

    // 1. 허용된 HTML 태그는 그대로 유지 (대소문자 구분 없이)
    if (SELECTORS.includes(tagName) || SELECTORS.includes(tagContentFirst)) {
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
      const closingTagOriginal = tagContent.substring(1);
      if (
        SELECTORS.includes(closingTagName) ||
        SELECTORS.includes(closingTagOriginal)
      ) {
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

function transformLinks(content) {
  let safeContent = content;
  safeContent = transformYouTubeLinks(safeContent);
  safeContent = transformEmbededLinks(safeContent);
  safeContent = transformPdfLinks(safeContent);
  safeContent = transformGoogleDriveLinks(safeContent);
  safeContent = transformBookMarkLinks(safeContent);
  return safeContent;
}

function transformGoogleDriveLinks(content) {
  return content.replace(
    /\[([^\]]+)\]\((https?:\/\/drive\.google\.com\/file\/d\/[^\s)]+)\)/g,
    (match, linkText, url) => {
      return `<GoogleDriveWrapper names={"${linkText}"} urls={"${url}"} />`;
    }
  );
}

/**
 * PDF 링크를 FileWrapper 컴포넌트로 변환
 * [파일명.pdf](URL) → <FileWrapper names={"파일명"} urls={"URL"} />
 */
function transformPdfLinks(content) {
  // PDF 링크 패턴 매칭: [파일명.pdf](URL)
  return content.replace(
    /\[([^\]]+\.pdf)\]\(([^)]+)\)/g,
    (match, fileName, url) => {
      // .pdf 확장자 제거하여 파일명만 추출
      const nameWithoutExtension = fileName.replace(/\.pdf$/i, "");
      return `<FileWrapper names={"${nameWithoutExtension}"} urls={"${url}"} />`;
    }
  );
}

/**
 * YouTube 링크를 YoutubeWrapper 컴포넌트로 변환
 * [video](https://youtu.be/VIDEO_ID) → <YoutubeWrapper names={"video"} urls={"https://youtu.be/VIDEO_ID"} />
 */
function transformYouTubeLinks(content) {
  // YouTube 링크 패턴 매칭 (youtu.be, youtube.com, youtube-nocookie.com 등)
  // [video](https://youtu.be/VIDEO_ID?si=VIDEO_ID) → <YoutubeWrapper names={"video"} urls={"https://youtu.be/VIDEO_ID"} />
  // [video] 텍스트가 있을 때만 변환
  return content.replace(
    /\[video\]\((https?:\/\/(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/[^\s)]+)\)/g,
    (match, url) => {
      // URL에서 쿼리 파라미터 제거 (si= 등)
      const cleanUrl = url.split("?")[0];
      return `<YoutubeWrapper names={"video"} urls={"${cleanUrl}"} />`;
    }
  );
}

function transformBookMarkLinks(content) {
  return content.replace(
    /\[bookmark\]\((https?:\/\/[^\s)]+)\)/g,
    (match, url) => {
      return `<BookMarkWrapper names={"bookmark"} urls={"${url}"} />`;
    }
  );
}

function transformEmbededLinks(content) {
  return content.replace(/\[embed\]\((https?:\/\/[^\s)]+)\)/g, (match, url) => {
    return `<EmbededWrapper names={"embed"} urls={"${url}"} />`;
  });
}

module.exports = {
  processMdxContent,
  convertUnsafeTags,
  decodeUrlEncodedLinks,
  transformYouTubeLinks,
  transformPdfLinks,
};
