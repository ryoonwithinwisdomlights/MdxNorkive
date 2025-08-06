/* eslint-disable no-unused-vars */
import * as Icons from "@fortawesome/free-solid-svg-icons"; // 모든 아이콘을 가져옴
import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const uuidToId = (uuid: string) => uuid.replaceAll("-", "");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNil = (input: unknown): input is null => {
  return input === null;
};

export function substringWithNumberDots(str, number) {
  const result = str.length > number ? str.substring(0, number) + "..." : str;
  return result;
}
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

/**
 * URL의 마지막 슬래시 이후의 콘텐츠를 가져옵니다.
 * @param {*} url
 * @returns
 */
export function getLastSegmentFromUrl(url) {
  if (!url) {
    return "";
  }
  // URL에서 쿼리 매개변수를 제거합니다.
  const trimmedUrl = url.split("?")[0];
  // 마지막 슬래시 이후의 콘텐츠를 가져옵니다.
  const segments = trimmedUrl.split("/");
  return segments[segments.length - 1];
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

export function isEmptyString(str) {
  if (typeof str == "undefined" || str == null || str == "") return true;
  else return false;
}
export function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}]/u;
  return emojiRegex.test(str);
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

function deepCloneGpt(value) {
  // 원시값은 그대로 리턴
  if (value === null || typeof value !== "object") {
    return value;
  }

  // Date 객체 복사
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Array 복사
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  // Object 복사 (plain object만 대상)
  if (value.constructor === Object) {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = deepClone(value[key]);
      return acc;
    }, {});
  }

  // Map, Set, Function, Symbol 등 특별 객체는 여기서 필요 시 추가 지원
  // 현재 버전은 일반 Object / Array / Date만 deep copy

  throw new Error(
    `Unsupported type in deepClone: ${Object.prototype.toString.call(value)}`
  );
}
export function calculateReadingTime(wordCount: number): string {
  const WORDS_PER_MINUTE = 225; // Average adult reading speed
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} min read`;
}

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

export const isObjectNotEmpty = (obj) => {
  if (!obj) {
    return false;
  } else {
    if (typeof obj !== "undefined") {
      if (Object.keys(obj).length == 0 && obj.constructor === Object) {
        return false;
      } else {
        return true;
      }
    }
  }
};

export function formatToKoreanDate(utcDateString): string {
  const date = new Date(utcDateString);
  const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getDate()).padStart(2, "0");
  const hours = String(koreaTime.getHours()).padStart(2, "0");
  const minutes = String(koreaTime.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

/**
 * Format date
 * @param date
 * @param local
 * @returns {string}
 */
export function formatDate(date, local) {
  if (!date || !local) return date || "";
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const res = d.toLocaleDateString(local, options);
  // If the format is Chinese date, it will be converted to a horizontal bar
  const format =
    local.slice(0, 2).toLowerCase() === "zh"
      ? res.replace("年", "-").replace("月", "-").replace("日", "")
      : res;
  return format;
}

export function formatDateFmt(timestamp, fmt) {
  const date = new Date(timestamp);
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt.trim();
}

// const locales = (function () {
//   // Check how many languages ​​are supported based on NOTION_DATABASE_ID.
//   // Supports configuring multiple language page ids in the following format: xxx,zh:xxx,en:xxx
//   const langs = [BLOG.LANG];
//   if ((BLOG.NOTION_DATABASE_ID as string).indexOf(",") > 0) {
//     const siteIds = (BLOG.NOTION_DATABASE_ID as string).split(",");
//     for (let index = 0; index < siteIds.length; index++) {
//       const siteId = siteIds[index];
//       const prefix = extractLangPrefix(siteId);
//       //If it contains a prefix such as zh , en etc.
//       if (prefix) {
//         if (!langs.includes(prefix)) {
//           langs.push(prefix);
//         }
//       }
//     }
//   }
//   return langs;
// })();

const youtubeDomains = new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

export const getYoutubeId = (url: string): string | null => {
  try {
    const { hostname } = new URL(url);
    if (!youtubeDomains.has(hostname)) {
      return null;
    }
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

    const match = url.match(regExp);
    if (match && match[2]?.length === 11) {
      return match[2];
    }
  } catch {
    // ignore invalid urls
  }

  return null;
};
export const getUrlParams = (
  url: string
): Record<string, string> | undefined => {
  try {
    const { searchParams } = new URL(url);
    const result: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      result[key] = value;
    }

    return result;
  } catch {
    // ignore invalid urls
  }

  return;
};
