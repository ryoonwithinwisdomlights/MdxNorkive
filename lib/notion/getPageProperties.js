/* eslint-disable no-unused-vars */
import { getTextContent, getDateValue } from "notion-utils";
import { NotionAPI } from "notion-client";
import { BLOG } from "@/blog.config";
import formatDate from "../formatDate";
// import { createHash } from 'crypto'
import md5 from "js-md5";
import { mapImgUrl } from "./mapImage";
import { checkStartWithHttp, convertUrlStartWithOneSlash } from "../utils";
import { siteConfig } from "../config";

export default async function getPageProperties(
  id,
  block,
  schema,
  authToken,
  tagOptions,
  subTypeOptions
) {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const value = block[id]?.value;
  const properties = {};
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val);
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const dateProperty = getDateValue(val);
          delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }
        case "select":
        case "multi_select": {
          const selects = getTextContent(val);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",");
          }
          break;
        }
        case "person": {
          const rawUsers = val.flat();
          const users = [];
          const api = new NotionAPI({ authToken });

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0];
              const res = await api.getUsers(userId);
              const resValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo,
              };
              users.push(user);
            }
          }
          properties[schema[key].name] = users;
          break;
        }
        default:
          break;
      }
    }
  }

  // Mapping key: user-defined header name
  const fieldNames = BLOG.NOTION_PROPERTY_NAME;
  if (fieldNames) {
    Object.keys(fieldNames).forEach((key) => {
      if (fieldNames[key] && properties[fieldNames[key]]) {
        properties[key] = properties[fieldNames[key]];
      }
    });
  }

  // type\status\category It is a single-select drop-down box. Take the first one in the array.
  properties.type = properties.type?.[0] || "";
  properties.status = properties.status?.[0] || "";
  properties.category = properties.category?.[0] || "";
  // console.log("properties.type:::", properties.type);
  // Mapping value: drop-down box options for user personalized type and status fields, mapped back to the English identifier of the code here
  mapProperties(properties);

  properties.publishDate = new Date(
    properties?.date?.start_date || value.created_time
  ).getTime();
  properties.publishDay = formatDate(properties.publishDate, BLOG.LANG);
  properties.lastEditedDate = new Date(value?.last_edited_time);
  properties.lastEditedDay = formatDate(
    new Date(value?.last_edited_time),
    BLOG.LANG
  );
  properties.fullWidth = value.format?.page_full_width ?? false;
  properties.pageIcon =
    mapImgUrl(block[id].value?.format?.page_icon, block[id].value) ?? "";
  properties.pageCover =
    mapImgUrl(block[id].value?.format?.page_cover, block[id].value) ?? "";
  properties.pageCoverThumbnail =
    mapImgUrl(
      block[id].value?.format?.page_cover,
      block[id].value,
      "block",
      "pageCoverThumbnail"
    ) ?? "";
  properties.content = value.content ?? [];
  properties.tagItems =
    properties?.tags?.map((tag) => {
      return {
        name: tag,
        color: tagOptions?.find((t) => t.value === tag)?.color || "gray",
      };
    }) || [];

  delete properties.content;
  const isAbleType = BLOG.NOTION_PROPERTY_NAME.type_able_arr.includes(
    properties.type
  );

  // Handle URL
  if (isAbleType) {
    if (properties.type === "Post") {
      properties.slug = BLOG.POST_URL_PREFIX
        ? generateCustomizeUrlWithType(properties, "Post")
        : properties.slug ?? properties.id;
    } else if (properties.type === BLOG.NOTION_PROPERTY_NAME.type_page) {
      properties.slug = properties.slug ?? properties.id;
    } else if (
      properties.type === BLOG.NOTION_PROPERTY_NAME.type_menu ||
      properties.type === BLOG.NOTION_PROPERTY_NAME.type_sub_menu
    ) {
      // The menu path is empty and used as an expandable menu.
      properties.to = properties.slug ?? "#";
      properties.name = properties.title ?? "";
    } else {
      // console.log("dddddd?", properties.slug, "ddddd===", properties.id);
      properties.slug = generateCustomizeUrlWithType(
        properties,
        properties.type
      );
      // console.log(" properties.slug?", properties.slug);
    }
  }

  // Enable pseudo-static path
  if (JSON.parse(BLOG.PSEUDO_STATIC)) {
    if (
      !properties?.slug?.endsWith(".html") &&
      !properties?.slug?.startsWith("http")
    ) {
      properties.slug += ".html";
    }
  }
  properties.password = properties.password
    ? md5(properties.slug + properties.password)
    : "";
  return properties;
}

/**
 * Convert string to json
 * @param {*} str
 * @returns
 */
function convertToJSON(str) {
  if (!str) {
    return {};
  }
  // Use regular expressions to remove spaces and newlines. The latest article is marked with a red dot.
  try {
    return JSON.parse(str.replace(/\s/g, ""));
  } catch (error) {
    console.warn("无效JSON", str);
    return {};
  }
}

/**
 * Mapping user-defined headers
 */
function mapProperties(properties) {
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_post) {
    properties.type = "Post";
  }

  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_general) {
    properties.type = "General-records";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_engineering) {
    properties.type = "Engineering-records";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_writing) {
    properties.type = "Writing-records";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_guestbook) {
    properties.type = "GuestBook";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_sideproject) {
    properties.type = "Sideproject";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_page) {
    properties.type = "Page";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_notice) {
    properties.type = "Notice";
  }
  if (properties?.status === BLOG.NOTION_PROPERTY_NAME.status_publish) {
    properties.status = "Published";
  }
  if (properties?.status === BLOG.NOTION_PROPERTY_NAME.status_invisible) {
    properties.status = "Invisible";
  }
}

/**
 * Get custom URL
 * URLs can be generated based on variables
 * support: %year%/%month%/%day%/%slug%
 * @param {*} postProperties
 * @returns
 */
function generateCustomizeUrl(postProperties) {
  let fullPrefix = "";
  const allSlugPatterns = BLOG.POST_URL_PREFIX.split("/");
  // console.log("allSlugPatterns", allSlugPatterns);
  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        0
      );
    } else if (pattern === "%day%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0);
    } else if (pattern === "%slug%") {
      fullPrefix += postProperties.slug ?? postProperties.id;
    } else if (!pattern.includes("%")) {
      fullPrefix += pattern;
    } else {
      return;
    }
    if (idx !== allSlugPatterns.length - 1) {
      fullPrefix += "/";
    }
  });
  if (fullPrefix.startsWith("/")) {
    fullPrefix = fullPrefix.substring(1); // head removed('/')
  }
  if (fullPrefix.endsWith("/")) {
    fullPrefix = fullPrefix.substring(0, fullPrefix.length - 1); // Remove the tail "/"
  }
  // console.log("fullPrefix", fullPrefix);
  return `${fullPrefix}/${postProperties.slug ?? postProperties.id}`;
}

function generateCustomizeUrlWithType(postProperties, type) {
  let fullPrefix = "";
  const allSlugPatterns = BLOG.POST_URL_PREFIX.split("/");
  // console.log("allSlugPatterns", allSlugPatterns);
  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        0
      );
    } else if (pattern === "%day%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0);
    } else if (pattern === "%slug%") {
      fullPrefix += postProperties.slug ?? postProperties.id;
    } else if (!pattern.includes("%")) {
      fullPrefix += pattern;
    } else {
      return;
    }
    if (idx !== allSlugPatterns.length - 1) {
      fullPrefix += "/";
    }
  });
  if (fullPrefix.startsWith("/")) {
    fullPrefix = fullPrefix.substring(1); // head removed('/')
  }
  if (fullPrefix.endsWith("/")) {
    fullPrefix = fullPrefix.substring(0, fullPrefix.length - 1); // Remove the tail "/"
  }

  let res;
  // type === "Post"
  //   ? `${fullPrefix.toLowerCase()}/${
  //       postProperties.slug ?? postProperties.id
  //     }`
  //   : `${fullPrefix.toLowerCase()}/${type.toLowerCase()}/${
  //       postProperties.slug ?? postProperties.id
  //     }`;
  // console.log('res', res)

  if (type === "Post") {
    res = `${fullPrefix.toLowerCase()}/${
      postProperties.slug ?? postProperties.id
    }`;
  } else if (
    type == "Sideproject" ||
    "General-records" ||
    "Writing-records" ||
    "Engineering-records" ||
    "GuestBook"
  ) {
    res = `${fullPrefix.toLowerCase()}/${type.toLowerCase()}/${
      postProperties.slug ?? postProperties.id
    }`;
  } else {
    res = `${fullPrefix.toLowerCase()}/${type.toLowerCase()}/${
      postProperties.slug ?? postProperties.id
    }`;
  }

  return res;
}

/**
 * Filter and process page data
 * The filtering process will use the configuration in NOTION_CONFIG
 */
export function adjustPageProperties(properties, NOTION_CONFIG) {
  // handle URL
  // 1. Convert the slug according to the URL_PREFIX configured by the user
  // 2. Add an href field to the article to store the final adjusted path
  if (properties.type === "Post") {
    if (siteConfig("POST_URL_PREFIX", "", NOTION_CONFIG)) {
      properties.slug = generateCustomizeSlug(properties, NOTION_CONFIG);
    }
    properties.href = properties.slug ?? properties.id;
  } else if (properties.type === "Page") {
    properties.href = properties.slug ?? properties.id;
  } else if (properties.type === "Menu" || properties.type === "SubMenu") {
    // The menu path is empty and used as an expandable menu.
    properties.href = properties.slug ?? "#";
    properties.name = properties.title ?? "";
  }

  // Anything starting with http or https is considered an external link
  if (checkStartWithHttp(properties?.href)) {
    properties.href = properties?.slug;
    properties.target = "_blank";
  } else {
    properties.target = "_self";
    // Pseudo-static path splicing on the right side.html
    if (siteConfig("PSEUDO_STATIC", false, NOTION_CONFIG)) {
      if (
        !properties?.href?.endsWith(".html") &&
        properties?.href !== "" &&
        properties?.href !== "#" &&
        properties?.href !== "/"
      ) {
        properties.href += ".html";
      }
    }

    // Convert the path to an absolute path: Splice the left side of the url /
    properties.href = convertUrlStartWithOneSlash(properties?.href);
  }

  // If the jump link is multi-lingual, it will open in a new window
  if (BLOG.NOTION_PAGE_ID.indexOf(",") > 0) {
    const siteIds = BLOG.NOTION_PAGE_ID.split(",");
    for (let index = 0; index < siteIds.length; index++) {
      const siteId = siteIds[index];
      const prefix = extractLangPrefix(siteId);
      if (getLastSegmentFromUrl(properties.href) === prefix) {
        properties.target = "_blank";
      }
    }
  }

  // Password field md5
  properties.password = properties.password
    ? md5(properties.slug + properties.password)
    : "";
}

/**
 * Get custom URL
 * URL can be generated based on variables
 * Support: %category%/%year%/%month%/%day%/%slug%
 * @param {*} postProperties
 * @returns
 */
function generateCustomizeSlug(postProperties, NOTION_CONFIG) {
  // 外链不处理
  if (checkStartWithHttp(postProperties.slug)) {
    return postProperties.slug;
  }
  let fullPrefix = "";
  const allSlugPatterns = siteConfig(
    "POST_URL_PREFIX",
    "",
    NOTION_CONFIG
  ).split("/");

  const POST_URL_PREFIX_MAPPING_CATEGORY = siteConfig(
    "POST_URL_PREFIX_MAPPING_CATEGORY",
    {},
    NOTION_CONFIG
  );

  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        0
      );
    } else if (pattern === "%day%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0);
    } else if (pattern === "%slug%") {
      fullPrefix += postProperties.slug ?? postProperties.id;
    } else if (pattern === "%category%" && postProperties?.category) {
      let categoryPrefix = postProperties.category;
      // Allows mapping of category names, usually used to map Chinese categories into English and beautify u
      if (POST_URL_PREFIX_MAPPING_CATEGORY[postProperties?.category]) {
        categoryPrefix =
          POST_URL_PREFIX_MAPPING_CATEGORY[postProperties?.category];
      }
      fullPrefix += categoryPrefix;
    } else if (!pattern.includes("%")) {
      fullPrefix += pattern;
    } else {
      return;
    }
    if (idx !== allSlugPatterns.length - 1) {
      fullPrefix += "/";
    }
  });
  if (fullPrefix.startsWith("/")) {
    fullPrefix = fullPrefix.substring(1); // head removed"/"
  }
  if (fullPrefix.endsWith("/")) {
    fullPrefix = fullPrefix.substring(0, fullPrefix.length - 1); // Remove the tail"/"
  }

  if (fullPrefix) {
    return `${fullPrefix}/${postProperties.slug ?? postProperties.id}`;
  } else {
    return `${postProperties.slug ?? postProperties.id}`;
  }
}
