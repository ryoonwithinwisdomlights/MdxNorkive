import { excludingMenuPages } from "./utilsForNotionData";

/**
 * Get the categories of all articles
 * @param allPosts
 * @returns {Promise<{}|*[]>}
 */
export function getAllCategories({
  allPages,
  categoryOptions,
  sliceCount = 0,
}) {
  const allPosts = excludingMenuPages({ arr: allPages });
  if (!allPosts || !Array.isArray(categoryOptions)) return [];

  // Step 1: 카테고리별 개수 집계
  const categoryCounts = allPosts
    .flatMap((post) => post.category || [])
    .reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

  /**
   * categoryOptions: [
    {
      id: '76803751-cb94-46fb-bf27-780126e58906',
      color: 'orange',
      value: 'TIL',
      collectionIds: [ '21a1eb5c-0337-81b4-bd2c-000b669aa8e8' ]
    },{},{},....]
  */
  // Step 2: 옵션에 맞는 카테고리 리스트 생성
  const categoryList = categoryOptions
    .filter((option) => {
      if (categoryCounts[option.value]) {
        return option;
      }
      // return categoryCounts[option.value];
    })
    .map((option) => ({
      id: option.id,
      name: option.value,
      color: option.color,
      count: categoryCounts[option.value],
    }));

  // Step 3: slice 적용
  return sliceCount > 0 ? categoryList.slice(0, sliceCount) : categoryList;
}
