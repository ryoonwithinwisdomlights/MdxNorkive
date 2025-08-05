// MDX 변환 및 안전화 유틸리티

/**
 * MDX에서 문제가 있는 태그들을 안전한 문자열(HTML 엔티티)로 변환
 */
export function convertUnsafeTags(content: string): string {
  let safeContent = content;

  // 1. <Breathing> 태그를 HTML 엔티티로 변환
  safeContent = safeContent.replace(
    /<Breathing([^>]*)>/g,
    (match, attributes) => `&lt;Breathing${attributes}&gt;`
  );
  // 2. 닫히지 않은 <Breathing> 태그도 처리
  safeContent = safeContent.replace(/<\/Breathing>/g, "&lt;/Breathing&gt;");
  // 3. <Link> 태그를 HTML 엔티티로 변환
  safeContent = safeContent.replace(
    /<Link([^>]*)>/g,
    (match, attributes) => `&lt;Link${attributes}&gt;`
  );
  // 4. 닫히지 않은 <Link> 태그도 처리
  safeContent = safeContent.replace(/<\/Link>/g, "&lt;/Link&gt;");
  // 5. 기타 알 수 없는 태그들도 HTML 엔티티로 변환
  safeContent = safeContent.replace(
    /<([A-Z][a-zA-Z0-9]*)([^>]*)>/g,
    (match, tagName, attributes) => {
      const standardTags = [
        "div",
        "span",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "a",
        "img",
        "ul",
        "ol",
        "li",
        "table",
        "tr",
        "td",
        "th",
        "code",
        "pre",
        "blockquote",
        "strong",
        "em",
        "b",
        "i",
      ];
      if (!standardTags.includes(tagName.toLowerCase())) {
        return `&lt;${tagName}${attributes}&gt;`;
      }
      return match;
    }
  );
  // 6. MDX 확장 문법 제거
  safeContent = safeContent.replace(/\{:[^}]+\}/g, "");
  return safeContent;
}

/**
 * Seed Design 스타일의 콘텐츠 개선 함수 (코드블록, 링크, 이미지 등)
 */
export function enhanceContent(
  content: string,
  title: string,
  type: string
): string {
  let enhanced = content;
  if (type === "RECORD") {
    enhanced = `# ${title}\n\n${enhanced}`;
  }
  enhanced = enhanced.replace(
    /```(\w+)?\n/g,
    (match, lang) => `\`\`\`${lang || "text"}\n`
  );
  enhanced = enhanced.replace(
    /\[([^\]]+)\]\(([^)]+)\)(\{:[^}]+\})?/g,
    (match, text, url) => `[${text}](${url})`
  );
  enhanced = enhanced.replace(
    /!\[([^\]]*)\]\(([^)]+)\)(\{:[^}]+\})?/g,
    (match, alt, url) => `![${alt}](${url})`
  );
  enhanced = enhanced.replace(/\|(.+)\|/g, (match, content) => {
    if (!enhanced.includes("| --- |")) {
      const headerRow = match;
      const separatorRow = headerRow
        .replace(/[^|]/g, " ")
        .replace(/\|/g, "| --- |");
      return `${headerRow}\n${separatorRow}`;
    }
    return match;
  });
  return enhanced;
}

/**
 * 사용자 친화적 슬러그 생성 (sub_type-title, 한글/영어/숫자만, 중복 방지)
 */
export function generateUserFriendlySlug(
  subType: string,
  title: string,
  existingSlugs: Set<string>
) {
  let base = (subType || "RECORDS").toLowerCase();
  let safeTitle = title
    .replace(/[^a-zA-Z0-9가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
  let slug = `${base}-${safeTitle}`;
  let count = 1;
  let uniqueSlug = slug;
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }
  existingSlugs.add(uniqueSlug);
  return uniqueSlug;
}

export function convertTime(time?: string): number | undefined {
  if (time) {
    try {
      return new Date(time).getTime();
    } catch {
      // ignore invalid time strings
    }
  }

  return undefined;
}
