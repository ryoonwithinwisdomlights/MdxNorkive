import { BLOG } from "@/blog.config";
import { convertCleanJsonString, deepClone, isUrl } from "@/lib/utils/utils";
import { useGlobal } from "../context/EssentialNavInfoProvider";

export const isServer = typeof window === "undefined";

export function getEnv<T>(
  key: string,
  defaultValue?: string | T,
  env = process.env
): string | T {
  const value = env[key];

  if (value !== undefined) {
    return value as string;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  if (isServer) {
    throw new Error(`Config error: missing required env variable "${key}"`);
  }

  return null as unknown as T;
}

/**
* Read configuration sequence
 * 1. Read the NotionConfig table first
 * 2. Secondly read the environment variables
 * 3. Then read blog.config.js / or the CONFIG filee
 * @param {*} key ；Parameter name

 * @param {*} defaultVal ; There is no default return value for the parameter
 * @param {*} extendConfig ; Refer to the configuration object {key:val}. If it cannot be found in the notice, try to find it here first.
 * @returns
 */
export const getOldsiteConfig = ({
  key,
  defaultVal = null,
  extendConfig = {},
}: {
  key: string;
  defaultVal?: any;
  extendConfig?: {};
}) => {
  if (!key) {
    return null;
  }
  switch (key) {
    case "NEXT_REVALIDATE_SECOND":
    case "RECORD_RECOMMEND_COUNT":
    case "IMAGE_COMPRESS_WIDTH":
    case "PSEUDO_STATIC":
    case "RECORD_SORT_BY":
    case "RECORD_PER_PAGE":
    case "RECORD_PREVIEW_LINES":
    case "RECORD_URL_PREFIX":
    case "RECORD_LIST_STYLE":
    case "RECORD_LIST_PREVIEW":
    case "RECORD_URL_PREFIX_MAPPING_CATEGORY":
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

  // There may be contaminated spaces before the configuration value
  // If there is no '[' or '{' in the string, return directly
  if (!val.trim().startsWith("{") && !val.trim().startsWith("[")) {
    return val;
  }

  //Convert strings like [], {} into objects
  try {
    val = convertCleanJsonString(val);
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
    val[key] = getOldsiteConfig({ key: key });
  }
  return val;
};
