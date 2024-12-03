"use client";

import { BLOG } from "@/blog.config";

import { deepClone } from "./utils.js";
import { useGlobal } from "./providers/globalProvider.jsx";
import { isUrl } from "./utils/utils.js";

/**
 *Config 읽는 순서
 * 1.먼저 NotionConfig 테이블을 읽어보세요
 * 2. 두 번째로 환경 변수를 읽으십시오.
 * 3. 그런 다음 blog.config.js / 또는 각 테마의 CONFIG 파일을 읽으십시오.
 * @param {*} key ； 매개변수 이름

 * @param {*} defaultVal ; 매개변수에 대한 기본 반환 값이 없습니다.
 * @param {*} extendConfig ; 참조 구성 객체{key:val}.공지사항에서 찾을 수 없다면 먼저 여기서 찾아보세요.
 * @returns
 */
export const siteConfig = ({
  key,
  defaultVal,
  extendConfig = {},
}: {
  key: string;
  defaultVal?: string;
  extendConfig?: {};
}) => {
  if (!key) {
    return null;
  }
  switch (key) {
    case "NEXT_REVALIDATE_SECOND":
    case "POST_RECOMMEND_COUNT":
    case "IMAGE_COMPRESS_WIDTH":
    case "PSEUDO_STATIC":
    case "POSTS_SORT_BY":
    case "POSTS_PER_PAGE":
    case "POST_PREVIEW_LINES":
    case "POST_URL_PREFIX":
    case "POST_LIST_STYLE":
    case "POST_LIST_PREVIEW":
    case "POST_URL_PREFIX_MAPPING_CATEGORY":
    case "IS_TAG_COLOR_DISTINGUISHED":
    case "TAG_SORT_BY_COUNT":
      return convertVal(extendConfig[key] || defaultVal || BLOG[key]);
    default:
  }
  let global: any = {};
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    global = useGlobal({ from: "index" });
  } catch (error) {}

  // First, configure the table configuration in NOTION to be read first
  let val = null;
  let siteInfo: any = null;

  if (global) {
    val = global.NOTION_CONFIG?.[key];
    siteInfo = global.siteInfo;
    // console.log('current variable', key, val)
  }

  if (!val) {
    // Here we do some compatibility processing for some keys.
    switch (key) {
      case "HOME_BANNER_IMAGE":
        val = siteInfo?.pageCover; // The cover image is taken from the cover of Notion
        break;
      case "AVATAR":
        val = siteInfo?.icon; // The cover image is taken from Notion’s avatar.
        break;
      case "TITLE":
        val = siteInfo?.title; // The title takes the title in Notion
        break;
      case "DESCRIPTION":
        val = siteInfo?.description; // The DESCRIPTION takes the DESCRIPTION in Notion
        break;
    }
  }

  // Secondly, if there is an incoming configuration reference, try to read
  if (!val && extendConfig) {
    val = extendConfig[key];
  }

  // Secondly, if NOTION does not find the configuration, it will read the blog.config.js file.
  if (!val) {
    val = BLOG[key];
  }

  if (!val) {
    return defaultVal;
  } else {
    if (typeof val === "string") {
      if (val === "true" || val === "false") {
        return JSON.parse(val);
      }
      return val;
    } else {
      try {
        return JSON.parse(val);
      } catch (error) {
        // If the value is a string but not in valid JSON format, return the string directly
        return val;
      }
    }
  }
};

export const cleanJsonString = (val) => {
  // Use regular expressions to remove unnecessary spaces, newlines and tabs
  return val.replace(/\s+/g, " ").trim();
};

export const convertVal = (val) => {
  // If the incoming parameter itself is obj, array, or boolean, there is no need to process it.
  if (typeof val !== "string" || !val) {
    return val;
  }

  // Check if it is a number and avoid numerical overflow
  if (/^\d+$/.test(val)) {
    const parsedNum = Number(val);
    // If the number is greater than JavaScript's maximum safe integer, it is returned as a string
    if (parsedNum > Number.MAX_SAFE_INTEGER) {
      return val + "";
    }
    return parsedNum;
  }

  // Check if it is a boolean value
  if (val === "true" || val === "false") {
    return JSON.parse(val);
  }

  // Check whether it is URL
  if (isUrl(val)) {
    return val;
  }

  // 配置值前可能有污染的空格
  // 如果字符串中没有 '[' 或 '{'，则直接返回
  // Pèizhì zhí qián kěnéng yǒu wūrǎn de kònggé
  // rúguǒ zìfú chuàn zhōng méiyǒu'[' huò'{', zé zhíjiē fǎnhuí
  // There may be contaminated spaces before the configuration value
  // If there is no '[' or '{' in the string, return directly
  if (!val.trim().startsWith("{") && !val.trim().startsWith("[")) {
    return val;
  }

  //Convert strings like [], {} into objects
  try {
    val = cleanJsonString(val);
    const parsedJson = JSON.parse(val);
    // Check whether the parsed result is an object
    if (parsedJson !== null) {
      return parsedJson;
    }
  } catch (error) {
    // Parsing fails, original string returned
    return val;
  }

  return val;
};

/**
 * Read all configurations
 * 1. Read the NotionConfig table first
 * 2. Secondly read the environment variables
 * 3. Read the blog.config.js file again
 * @param {*} key
 * @returns
 */
export const siteConfigMap = () => {
  const val = deepClone(BLOG);
  for (const key in val) {
    val[key] = siteConfig({ key: key });
    // console.log('site', key, val[key], siteConfig(key))
  }
  return val;
};
