/* eslint-disable no-unused-vars */
//import * as Icons from "@fortawesome/free-solid-svg-icons"; // 모든 아이콘을 가져옴
import { BLOG } from "@/blog.config";
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

export function substringWithNumberDots(str: string, number: number) {
  const result = str.length > number ? str.substring(0, number) + "..." : str;
  return result;
}
/**
 * Convert string to json
 * @param {*} str
 * @returns
 */
export function convertToJSON(str: unknown): Record<string, unknown> {
  if (!str) {
    return {};
  }

  // 문자열이 아닌 경우 문자열로 변환
  const stringValue = typeof str === "string" ? str : String(str);

  // Use regular expressions to remove spaces and newlines. The latest article is marked with a red dot.
  try {
    // 더 안전한 정리 과정
    const cleanedString = stringValue
      .replace(/\s+/g, " ") // 연속된 공백을 하나로
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // 제어 문자 제거
      .trim();

    return JSON.parse(cleanedString);
  } catch (error) {
    console.warn("Invalid JSON", stringValue, error);
    return {};
  }
}

export function convertUrlStartWithOneSlash(
  str: string | null | undefined
): string {
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

export const convertCleanJsonString = (val: string): string => {
  // Use regular expressions to remove unnecessary spaces, newlines and tabs
  return val.replace(/\s+/g, " ").trim();
};

/**
 * URL의 마지막 슬래시 이후의 콘텐츠를 가져옵니다.
 * @param {*} url
 * @returns
 */
export function getLastSegmentFromUrl(url: string | null | undefined): string {
  if (!url) {
    return "";
  }
  // URL에서 쿼리 매개변수를 제거합니다.
  const trimmedUrl = url.split("?")[0];
  // 마지막 슬래시 이후의 콘텐츠를 가져옵니다.
  const segments = trimmedUrl.split("/");
  return segments[segments.length - 1];
}

// export const parseIcon = (iconString: string) => {
//   if (!iconString) return null;
//   const [prefix, iconName] = iconString.split(" ");
//   if (!iconName) return null;

//   // fa- 이후의 단어를 CamelCase로 변환
//   const iconKey = iconName
//     .replace("fa-", "") // "fa-" 제거
//     .split("-") // "-"로 나누기
//     .map((word, index) => {
//       if (index === 0) return word; // 첫 단어는 소문자로 유지
//       return word.charAt(0).toUpperCase() + word.slice(1); // 나머지 단어는 첫 글자 대문자
//     })
//     .join("");
//   return (
//     Icons[`fa${iconKey.charAt(0).toUpperCase()}${iconKey.slice(1)}`] || null
//   );
// };

/**
 * Load external resources
 * @param url address e.g. https://xx.com/xx.js
 * @param type js or css
 * @returns {Promise<unknown>}
 */
export function loadExternalResource(
  url: string,
  type: "js" | "css" | "font"
): Promise<string> {
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
export function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

/**
 * Is iterable
 * @param {*} obj
 * @returns
 */
export function isIterable(obj: unknown): obj is Iterable<unknown> {
  return (
    obj != null &&
    typeof obj === "object" &&
    typeof (obj as { [Symbol.iterator]?: unknown })[Symbol.iterator] ===
      "function"
  );
}

/**
 * Whether it is a relative or absolute path to the ur class
 * @param {*} str
 * @returns
 */
export function isUrl(str: string | null | undefined): boolean {
  if (!str) {
    return false;
  }

  return str.indexOf("/") === 0 || isStartWithHttp(str);
}

export function isEmptyString(str: unknown): boolean {
  if (typeof str == "undefined" || str == null || str == "") return true;
  else return false;
}
export function isEmoji(str: string): boolean {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}]/u;
  return emojiRegex.test(str);
}
// Check if there is an external link
export function isStartWithHttp(str: string | null | undefined): boolean {
  // Check if string contains http
  if (!str) return false;
  if (str.indexOf("http:") === 0 || str.indexOf("https:") === 0) {
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
export function getQueryVariable(key: string): string | false {
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
export function getQueryParam(url: string, param: string): string | null {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.get(param);
}

/**
 * Deep merge two objects
 * @param target
 * @param sources
 */
export function mergeDeep(
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
): Record<string, unknown> {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        );
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
export function deepClone(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    // If obj is an array, create a new array and deep clone each element
    return obj.map((item) => deepClone(item));
  } else if (obj && typeof obj === "object") {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as Record<string, unknown>)[key];
        if (value instanceof Date) {
          newObj[key] = new Date(value.getTime()).toISOString();
        } else {
          newObj[key] = deepClone(value);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

// function deepCloneGpt(value: unknown): unknown {
//   // 원시값은 그대로 리턴
//   if (value === null || typeof value !== "object") {
//     return value;
//   }

//   // Date 객체 복사
//   if (value instanceof Date) {
//     return new Date(value.getTime());
//   }

//   // Array 복사
//   if (Array.isArray(value)) {
//     return value.map(deepClone);
//   }

//   // Object 복사 (plain object만 대상)
//   if (value && typeof value === "object" && value.constructor === Object) {
//     return Object.keys(value).reduce((acc, key) => {
//       acc[key] = deepClone((value as Record<string, unknown>)[key]);
//       return acc;
//     }, {} as Record<string, unknown>);
//   }

//   // Map, Set, Function, Symbol 등 특별 객체는 여기서 필요 시 추가 지원
//   // 현재 버전은 일반 Object / Array / Date만 deep copy

//   throw new Error(
//     `Unsupported type in deepClone: ${Object.prototype.toString.call(value)}`
//   );
// }
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
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

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

// ❌ Before (14줄의 복잡한 중첩 조건문)
// export const isObjectNotEmpty = (obj: any): boolean => {
//   if (!obj) {
//     return false;
//   } else {
//     if (typeof obj !== "undefined") {
//       if (Object.keys(obj).length == 0 && obj.constructor === Object) {
//         return false;
//       } else {
//         return true;
//       }
//     }
//   }
//   return false;
// };
export const isObjectNotEmpty = (obj: unknown): boolean => {
  if (Array.isArray(obj)) {
    return obj.length > 0;
  }
  return isObject(obj) && Object.keys(obj).length > 0;
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

/**
 * Intercept the language prefix of page-id
 * The format of notionPageId can be en:xxxxx
 * @param {*} str
 * @returns en|kr|xx
 */
export function extractLangPrefix(str: string): string {
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
export function extractLangId(str: string): string {
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

export function toBlogNumber(a: string | number) {
  let tempVal: number;
  if (typeof a === "string") {
    tempVal = Number(BLOG.SINCE) as number;
  } else if (typeof a === "number") {
    tempVal = BLOG.SINCE as number;
    return tempVal;
  }
}

// Copyright date를 정적으로 계산하여 메모리 누수 방지
const CURRENT_YEAR = new Date().getFullYear();
const COPYRIGHT_DATE = (() => {
  // 한 번만 계산되고 재사용
  const blogSince = toBlogNumber(BLOG.SINCE);
  if (Number.isInteger(BLOG.SINCE) && blogSince && blogSince < CURRENT_YEAR) {
    return BLOG.SINCE + "-" + CURRENT_YEAR;
  }
  return CURRENT_YEAR;
})();

// 정적 상수로 export하여 중복 계산 방지
export const COPYRIGHT_DATE_STATIC = COPYRIGHT_DATE;

export function getCopyrightDate(a: string | number) {
  return COPYRIGHT_DATE;
}
