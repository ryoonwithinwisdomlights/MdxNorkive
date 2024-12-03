import BLOG from "@/blog.config";
import { getPageContentText } from "@/pages/search/[keyword]";
import algoliasearch from "algoliasearch";

/**
 * Generate full-text index
 * @param {*} allPages
 */
const generateAlgoliaSearch = async ({ allPages, force = false }) => {
  allPages?.forEach((p) => {
    // Determine whether this article needs to be re-indexed
    if (p && !p.password) {
      uploadDataToAlgolia(p);
    }
  });
};

/**
 * Upload data
 * Determine whether the algolia index needs to be updated based on the last modified article date and the last updated index data
 */
const uploadDataToAlgolia = async (post) => {
  // Connect and authenticate with your Algolia app
  const client = algoliasearch(BLOG.ALGOLIA_APP_ID, BLOG.ALGOLIA_ADMIN_APP_KEY);

  // Create a new index and add a record
  const index = client.initIndex(BLOG.ALGOLIA_INDEX);

  if (!post) {
    return;
  }

  // Check if there is an index
  let existed;
  let needUpdateIndex = false;
  try {
    existed = await index.getObject(post.id);
  } catch (error) {
    // Usually there is no index
  }

  if (!existed || !existed?.lastEditedDate || !existed?.lastIndexDate) {
    needUpdateIndex = true;
  } else {
    const lastEditedDate = new Date(post.lastEditedDate);
    const lastIndexDate = new Date(existed.lastIndexDate);
    if (lastEditedDate.getTime() > lastIndexDate.getTime()) {
      needUpdateIndex = true;
    }
  }

  // If you need to update the search
  if (needUpdateIndex) {
    const record = {
      objectID: post.id,
      title: post.title,
      category: post.category,
      tags: post.tags,
      pageCover: post.pageCover,
      slug: post.slug,
      summary: post.summary,
      lastEditedDate: post.lastEditedDate, // Update article time
      lastIndexDate: new Date(), // Update index time
      content: truncate(getPageContentText(post, post.blockMap), 8192), //The index is 8192 characters, and the API limits the total requested content to 10,000 bytes.
    };
    // console.log('Update Algolia index', record)
    index
      .saveObject(record)
      .wait()
      .then((r) => {
        console.log("Algolia index update", r);
      })
      .catch((err) => {
        console.log("Algolia anomaly", err);
      });
  }
};

/**
 * Limit content bytes
 * @param {*} str
 * @param {*} maxBytes
 * @returns
 */
function truncate(str, maxBytes) {
  let count = 0;
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x7f) {
      count += 1;
    } else if (code <= 0x7ff) {
      count += 2;
    } else if (code <= 0xffff) {
      count += 3;
    } else {
      count += 4;
    }
    if (count <= maxBytes) {
      result += str[i];
    } else {
      break;
    }
  }
  return result;
}

export { uploadDataToAlgolia, generateAlgoliaSearch };
