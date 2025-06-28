import { deepClone, formatDateFmt } from "@/lib/utils/utils";
import { BLOG } from "@/blog.config";

export function getSortedPostObject(obj) {
  const postsSortByDate = Object.create(obj);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });
  return postsSortByDate;
}

export function getPostsGroupByDate(array) {
  const allPosts = {};

  array.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (allPosts[date]) {
      allPosts[date].push(post);
    } else {
      allPosts[date] = [post];
    }
  });
  return allPosts;
}

/**
 * Compress Pictures
 * 1.Notion image bed can compress and crop images by specifying url-query parameters, for example?xx=xx&width=400
 * 2. UnPlash pictures can control the compression quality through api q=50 width=400 control the picture size
 * @param {*} image
 */
export const compressImage = ({
  image,
  width = 800,
  quality = 50,
  fmt = "webp",
}: {
  image: string;
  width?: number;
  quality?: number;
  fmt?: string;
}) => {
  // if (!image) {
  //   return null;
  // }

  if (
    image.indexOf(BLOG.NOTION_HOST) === 0 &&
    image.indexOf("amazonaws.com") > 0
  ) {
    return `${image}&width=${width}`;
  }
  // Compress unsplash images
  if (image.indexOf("https://images.unsplash.com/") === 0) {
    // Parse URL into an object
    const urlObj = new URL(image);
    // Get URL parameters
    const params = new URLSearchParams(urlObj.search);
    // Replace the value of the q parameter with
    params.set("q", quality.toString());
    // size
    params.set("width", width.toString());
    // Format
    params.set("fmt", fmt);
    params.set("fm", fmt);
    // Generate new URL
    urlObj.search = params.toString();
    return urlObj.toString();
  }

  // You can also add your custom image transmission cover image compression parameters here.
  // .e.g
  if (image.indexOf("https://your_picture_bed") === 0) {
    return "do_somethin_here";
  }

  return image;
};

/**
 * Image mapping
 * 1. If it is /xx.xx relative path format, it will be converted into a complete notification domain name image
 * 2. If it is a bookmark type block picture cover, there is no need to process it.
 * @param {*} img
 * @param {*} value
 * @returns
 */
export const mapImgUrl: any = (img, block, type = "block", from) => {
  if (!img) {
    return null;
  }
  let ret: string = "";
  // Relative directories are regarded as the notation's own pictures.
  if (img.startsWith("/")) {
    ret = BLOG.NOTION_HOST + img;
  } else {
    ret = img;
  }

  // Notion image bed converted to permanent address
  const isNotionImg =
    ret.indexOf("secure.notion-static.com") > 0 ||
    ret.indexOf("prod-files-secure") > 0;
  const isImgBlock = BLOG.IMG_URL_TYPE === "Notion" || type !== "block";
  if (isNotionImg && isImgBlock) {
    ret =
      BLOG.NOTION_HOST +
      "/image/" +
      encodeURIComponent(ret) +
      "?table=" +
      type +
      "&id=" +
      block.id;
  }

  if (!isEmoji(ret) && ret.indexOf("notion.so/images/page-cover") < 0) {
    if (BLOG.RANDOM_IMAGE_URL) {
      // Only when the random picture interface is configured, the picture will be replaced.
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT;
      let isReplace = false;
      if (texts) {
        const textArr = texts.split(",");
        // Determine whether replacement text is included
        textArr.forEach((text) => {
          if (ret.indexOf(text) > -1) {
            isReplace = true;
          }
        });
      } else {
        isReplace = true;
      }

      if (isReplace) {
        ret = BLOG.RANDOM_IMAGE_URL;
      }
    }
    const separator = ret.includes("?") ? "&" : "?";
    // Splice unique identification parameters to prevent requested images from being cached
    ret = `${ret.trim()}${separator}t=${block.id}`;
  }

  // Article cover

  if (from === "pageCoverThumbnail") {
    ret = compressImage({ image: ret });
  }

  return ret;
};

export function dbDeepClone(data) {
  const db = deepClone(data);

  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;
  // Sensitive data not returned
  return db;
}

/**

* Intercept the language prefix of page-id
 * The format of notionPageId can be en:xxxxx
 * @param {*} str
 * @returns en|kr|xx
 */
export function extractLangPrefix(str) {
  const match = str.match(/^(.+?):/);
  if (match && match[1]) {
    return match[1];
  } else {
    return "";
  }
}

/**
  
  * Intercept the id of page-id
   * The format of notionPageId can be en:xxxxx   * @param {*} str
   * @returns xxxxx
   */
export function extractLangId(str) {
  // If the match is successful, return the matched content
  const match = str.match(/:\s*(.+)/);
  // If the match is successful, return the matched content
  if (match && match[1]) {
    return match[1];
  } else {
    // If there is no match, return an empty string or other value you want to return.
    return str;
  }
}

/**
 * To distinguish pages in the list, only the end ID is enough.
 */

export function getShortId(uuid) {
  if (!uuid || uuid.indexOf("-") < 0) {
    return uuid;
  }
  // Find the position of the first '-'
  const index = uuid.indexOf("-");
  //Extract the part from the beginning to before the first '-'
  return uuid.substring(0, index);
}

function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}]/u;
  return emojiRegex.test(str);
}

// function isEmoji2(str: string): boolean {
//   const emojiRegex =
//     /[\uD83C\uDF00-\uD83D\uDEFF\uD83C\uDDE0-\uD83C\uDDFF\u2600-\u26FF\u2700-\u27BF\uD83E\uDD00-\uD83E\uDDFF\uD83D\uDC18-\uD83D\uDC70]/;
//   return emojiRegex.test(str);
// }
