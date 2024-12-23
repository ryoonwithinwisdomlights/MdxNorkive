/* eslint-disable no-unused-vars */
import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Icons from "@fortawesome/free-solid-svg-icons"; // 모든 아이콘을 가져옴
import { RecommendPost } from "@/lib/models/page.model";
import { SlugConvertProps } from "@/lib/models";

/**
 * Convert string to json
 * @param {*} str
 * @returns
 */
export function convertToJSON(str) {
  if (!str) {
    return {};
  }
  // Use regular expressions to remove spaces and newlines. The latest article is marked with a red dot.
  try {
    return JSON.parse(str.replace(/\s/g, ""));
  } catch (error) {
    console.warn("Invalid JSON", str);
    return {};
  }
}

export function convertUrlStartWithOneSlash(str) {
  if (!str) {
    return "#";
  }
  // Determine whether the url ends with / beginning
  if (!str.startsWith("/")) {
    // If not, splice one in front /
    str = "/" + str;
  }
  // Remove multiple consecutive slashes at the beginning, leaving only one
  str = str.replace(/\/+/g, "/");
  return str;
}

export const convertCleanJsonString = (val) => {
  // Use regular expressions to remove unnecessary spaces, newlines and tabs
  return val.replace(/\s+/g, " ").trim();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseIcon = (iconString: string) => {
  if (!iconString) return null;
  const [prefix, iconName] = iconString.split(" ");
  if (!iconName) return null;

  // fa- 이후의 단어를 CamelCase로 변환
  const iconKey = iconName
    .replace("fa-", "") // "fa-" 제거
    .split("-") // "-"로 나누기
    .map((word, index) => {
      if (index === 0) return word; // 첫 단어는 소문자로 유지
      return word.charAt(0).toUpperCase() + word.slice(1); // 나머지 단어는 첫 글자 대문자
    })
    .join("");
  return (
    Icons[`fa${iconKey.charAt(0).toUpperCase()}${iconKey.slice(1)}`] || null
  );
};

export const exchangeSlugToType = (slug) => {
  const typeApp: SlugConvertProps[] = [
    { slug: "devproject", type: "Devproject" },
    { slug: "engineering", type: "Engineering" },
  ];

  if (!slug) return null;

  const found = typeApp.find((item) => item.slug === slug);
  return found ? found.type : null;
};

/**
 * Load external resources
 * @param url address e.g. https://xx.com/xx.js
 * @param type js or css
 * @returns {Promise<unknown>}
 */
export function loadExternalResource(url, type) {
  // Check if it already exists
  const elements =
    type === "js"
      ? document.querySelectorAll(`[src='${url}']`)
      : document.querySelectorAll(`[href='${url}']`);

  return new Promise((resolve, reject) => {
    if (elements.length > 0 || !url) {
      resolve(url);
      return url;
    }

    let tag;

    if (type === "css") {
      tag = document.createElement("link");
      tag.rel = "stylesheet";
      tag.href = url;
    } else if (type === "font") {
      tag = document.createElement("link");
      tag.rel = "preload";
      tag.as = "font";
      tag.href = url;
    } else if (type === "js") {
      tag = document.createElement("script");
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => {
        console.log("[Load Success]", url);
        resolve(url);
      };
      tag.onerror = () => {
        console.log("[Load Error]", url);
        reject(url);
      };
      document.head.appendChild(tag);
    }
  });
}

//#############################Checking Function###############################
/**
 * Determine whether the client
 * @returns {boolean}
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Determine whether to move the device
 */
export const isMobile = () => {
  let isMobile = false;
  if (!isBrowser) {
    return isMobile;
  }

  if (!isMobile && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
    isMobile = true;
  }

  if (typeof window.orientation !== "undefined") {
    isMobile = true;
  }

  return isMobile;
};

/**
 * Whether object

 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Is iterable
 * @param {*} obj
 * @returns
 */
export function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === "function";
}

/**
 * Whether it is a relative or absolute path to the ur class
 * @param {*} str
 * @returns
 */
export function isUrl(str) {
  if (!str) {
    return false;
  }

  return str?.indexOf("/") === 0 || isStartWithHttp(str);
}

// Check if there is an external link
export function isStartWithHttp(str) {
  // Check if string contains http
  if (str?.indexOf("http:") === 0 || str?.indexOf("https:") === 0) {
    // If included, find the location of http
    return true;
  } else {
    // Not included
    return false;
  }
}

/**
 * 객체에 특정 키가 존재하는지 확인하는 타입 가드 함수
 * @param obj 확인할 객체
 * @param key 확인할 키
 * @returns 키가 객체에 존재하면 true, 그렇지 않으면 false
 */
export function isHasKey<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}

//#############################Query related Function###############################

/**
 * Query the query parameters in the url
 * @param {}} variable
 * @returns
 */
export function getQueryVariable(key) {
  const query = isBrowser ? window.location.search.substring(1) : "";
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}

/**
 * Get the value of the specified parameter in the URL
 * @param {string} url
 * @param {string} param
 * @returns {string|null}
 */
export function getQueryParam(url, param) {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.get(param);
}

//############################Merge & Clone Function###############################

/**
 * Deep merge two objects
 * @param target
 * @param sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

/**
 * deep copy object
 * Deep copy based on source object type, supports object and array
 * @param {*} obj
 * @returns
 */
export function deepClone(obj) {
  if (Array.isArray(obj)) {
    // If obj is an array, create a new array and deep clone each element
    return obj.map((item) => deepClone(item));
  } else if (obj && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] instanceof Date) {
          newObj[key] = new Date(obj[key].getTime()).toISOString();
        } else {
          newObj[key] = deepClone(obj[key]);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

//############################Record related Function###############################

/**
 * Get the list of recommended articles associated with the article, currently filtered based on tag relevance
 * @param post
 * @param {*} allPosts
 * @param {*} count
 * @returns
 */
export function getRecommendPost(
  post: RecommendPost,
  allPosts: RecommendPost[],
  count: number = 6
): RecommendPost[] {
  let recommendPosts: RecommendPost[] = []; // 추천 게시물 배열
  const postIds: string[] = []; // 추천된 게시물 ID 배열
  const currentTags: string[] = post?.tags || []; // 현재 게시물의 태그
  for (let i = 0; i < allPosts.length; i++) {
    const p = allPosts[i];
    // 현재 게시물과 동일한 게시물이거나 타입이 'Post'가 아니면 건너뜀
    if (p.id === post.id || p.type.indexOf("Post") < 0) {
      continue;
    }

    for (let j = 0; j < currentTags.length; j++) {
      const t = currentTags[j];
      // 이미 추천된 게시물인지 확인getNotionPageData:
      if (postIds.indexOf(p.id) > -1) {
        continue;
      }
      // 태그가 일치하면 추천 게시물에 추가
      if (p.tags && p.tags.indexOf(t) > -1) {
        recommendPosts.push(p);
        postIds.push(p.id);
      }
    }
  }

  // 추천 게시물 개수를 제한
  if (recommendPosts.length > count) {
    recommendPosts = recommendPosts.slice(0, count);
  }
  return recommendPosts;
}

/**
 * Get articles from page 1 to the specified page number
 * @param pageIndex which page
 * @param list All articles
 * @param pageSize Number of articles per page
 * @returns {*}
 */
export const getListByPage = function (list, pageIndex, pageSize) {
  return list.slice(0, pageIndex * pageSize);
};

/**
 * delay
 * @param {*} ms
 * @returns
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Lazy load
 * @param {*} componentImportFn
 * @returns
 */

export const getLazyComponent = (componentImportFn: Function) =>
  React.lazy(async () => {
    let obj = await componentImportFn();
    return typeof obj.default === "function" ? obj : obj.default;
  });
