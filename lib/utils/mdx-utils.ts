// MDX 변환 및 안전화 유틸리티

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
