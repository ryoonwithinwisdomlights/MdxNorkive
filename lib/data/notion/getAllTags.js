import { excludingMenuPages } from "./utilsForNotionData";

/**
 * Get tags of all articles
 * @param allPosts
 * @param sliceCount The default number of interceptions is 12, if it is 0, all will be returned
 * @param tagOptions drop-down options for tags
 * @returns {Promise<{}|*[]>}
 */
export function getAllTags({ allPages, sliceCount = 0, tagOptions }) {
  const allPosts = excludingMenuPages(allPages);

  if (!allPosts || !Array.isArray(tagOptions)) return [];

  // Step 1: tag별 개수 집계
  const tagsCounts = allPosts
    .flatMap((post) => post.tags || [])
    .reduce((acc, tags) => {
      acc[tags] = (acc[tags] || 0) + 1;
      return acc;
    }, {});

  // Step 2: 옵션에 맞는 tag 리스트 생성
  const tagList = tagOptions
    .filter((option) => tagsCounts[option.value])
    .map((option) => ({
      id: option.id,
      name: option.value,
      color: option.color,
      count: tagsCounts[option.value],
    }));

  // Step 3: slice 적용
  return sliceCount > 0 ? tagList.slice(0, sliceCount) : tagList;
}
