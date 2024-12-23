import { cache } from "react";
import { BLOG } from "@/blog.config";
/**
 * The React cache function allows you to memoize the result of a data fetch or a computation.
 * It is primarily intended for use with React Server Components.
 * You create a memoized version of a function using cache, which can then be reused
 * across components to avoid unnecessary recalculations or data fetches.
 * This is particularly useful for expensive operations that you don't want to repeat with the same inputs.
 *
 */
const cacheTime = BLOG.isProd ? 10 * 60 : 120 * 60; // 120 minutes for dev,10 minutes for prod

const fetchBlogData = async (key) => {
  // Simulate fetching data operation
  console.log("[fetchBlogData]: Fetching data for key:", key);
  return { data: "Blog data for " + key };
};

// Wrap your data fetching function with cache
const getBlogData = cache(fetchBlogData);

//getCache fetches and caches data using the React cache mechanism
export async function getCache(key) {
  console.log("[memory getCache]:", key);
  return await getBlogData(key);
}

// export async function setCache(key, data) {
//   console.log(
//     "[setCache]: This operation is not needed as cache manages the data."
//   );
//   // In React's cache, you don't explicitly set data. It's handled by the cache function internally when fetching.
// }

// export async function delCache(key) {
//   console.log(
//     "[delCache]: This operation is not supported by React's cache mechanism."
//   );
//   // React's cache does not support explicit deletion of data.
// }

export default { getCache };
