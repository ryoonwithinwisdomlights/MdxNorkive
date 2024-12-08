/* eslint-disable no-unused-vars */
// Encapsulate asynchronous resource loading method
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import * as Icons from "@fortawesome/free-solid-svg-icons"; // 모든 아이콘을 가져옴

type AppType = {
  slug: string;
  type: string;
};

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
  const typeApp: AppType[] = [
    { slug: "sideproject", type: "Sideproject" },
    { slug: "general", type: "General" },
    { slug: "engineering", type: "Engineering" },
    { slug: "writing", type: "Writing" },
    { slug: "guest-book", type: "GuestBook" },
  ];

  if (!slug) return null;

  const found = typeApp.find((item) => item.slug === slug);
  return found ? found.type : null;
};

/**
 * Determine whether the client
 * @returns {boolean}
 */
export const isBrowser = typeof window !== "undefined";

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
        console.log("Load Success", url);
        resolve(url);
      };
      tag.onerror = () => {
        console.log("Load Error", url);
        reject(url);
      };
      document.head.appendChild(tag);
    }
  });
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

  return str?.indexOf("/") === 0 || checkStartWithHttp(str);
}

// Check if there is an external link
export function checkStartWithHttp(str) {
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
/**
 * delay
 * @param {*} ms
 * @returns
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
 * Determine whether to move the device
 */
export const isMobile = () => {
  let isMobile = false;
  if (!isBrowser) {
    return isMobile;
  }

  // This judgment will trigger TypeError: navigator.userAgentData.mobile is undefined Problem causing the blog to not work properly
  // if (!isMobile && navigator.userAgentData.mobile) {
  //   isMobile = true
  // }

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
 * 객체에 특정 키가 존재하는지 확인하는 타입 가드 함수
 * @param obj 확인할 객체
 * @param key 확인할 키
 * @returns 키가 객체에 존재하면 true, 그렇지 않으면 false
 */
// export function hasKey<T extends object, K extends PropertyKey>(obj: T, key: K): key is keyof T {
//     return key in obj;
// }
/**
 * 객체에 특정 키가 존재하는지 확인하는 타입 가드 함수
 * @param obj 확인할 객체
 * @param key 확인할 키
 * @returns 키가 객체에 존재하면 true, 그렇지 않으면 false
 */
export function hasKey<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}
