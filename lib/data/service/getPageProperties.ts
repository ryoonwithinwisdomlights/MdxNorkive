/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { getOldsiteConfig } from "@/lib/utils/get-config-value";

import {
  BlockMap,
  CollectionPropertySchemaMap,
  Decoration,
  SelectOption,
  User,
} from "notion-types";
import { NorkiveRecordData } from "@/types";
import {
  AVAILABLE_PAGE_TYPES,
  ARCHIVE_PROPERTIES_STATUS_MAP,
  ARCHIVE_PROPERTIES_TYPE_MAP,
  GENERAL_TYPE_MENU,
  PAGE_TYPE_MENU,
} from "@/constants/menu.constants";

import md5 from "js-md5";
import { NotionAPI } from "notion-client";

import { getDateValue, getTextContent } from "notion-utils";

import {
  formatDate,
  convertUrlStartWithOneSlash,
  getLastSegmentFromUrl,
  isStartWithHttp,
} from "@/lib/utils/utils";
import { extractLangPrefix, mapImgUrl } from "./utils";
import { getRecordBlockMap } from "./getPostBlocks";
const NOTION_DB_ID = BLOG.NOTION_DATABASE_ID as string;
export async function getPageProperties(
  id: string,
  pageId: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap,
  authToken: string | null,
  tagOptions: SelectOption[]
): Promise<NorkiveRecordData | null> {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const value = block[id]?.value;
  const properties: Partial<NorkiveRecordData> & {
    id: string;
    [key: string]: any;
  } = { id };
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val as Decoration[]);
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const dateProperty = getDateValue(val as Decoration[]);
          // delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }
        case "select":
        case "multi_select": {
          const selects = getTextContent(val as Decoration[]);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",");
          }
          break;
        }
        case "person": {
          const rawUsers = (val as Decoration[]).flat();
          const users: User[] = [];
          const api = new NotionAPI({});

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userArr = rawUsers[i][0];
              const userList = await api.getUsers(userArr as string[]);
              const userResult: any[] = userList.results;
              const userValue: User = userResult[1].value;
              users.push(userValue);
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

  // console.log("ddfdfdff:", value);
  // Mapping key: user-defined header name
  const fieldNames = BLOG.NOTION_PROPERTY_NAME;
  if (fieldNames) {
    Object.keys(fieldNames).forEach((key) => {
      if (fieldNames[key] && properties[fieldNames[key]]) {
        properties[key] = properties[fieldNames[key]];
      }
    });
  }

  // type\status\category It is a single-select drop-down box.
  // Take the first one in the array.
  properties.type = properties.type?.[0] || "";
  properties.status = properties.status?.[0] || "";
  properties.category = properties.category?.[0] || "";
  properties.comment = properties.comment?.[0] || "";

  // Mapping value: drop-down box options for user personalized type and status fields,
  //  mapped back to the English identifier of the code here
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
  const isAblePage = AVAILABLE_PAGE_TYPES.includes(properties.type);
  handleRecordsUrl(isAblePage, properties);
  if (id === pageId && pageId !== NOTION_DB_ID) {
    const blockMap = await getRecordBlockMap({
      pageId: pageId,
    });
    properties.blockMap = blockMap;
  }
  return properties as NorkiveRecordData;
}

/**
 * Mapping user-defined headers
 */
function mapProperties(
  properties: Partial<NorkiveRecordData> & { [key: string]: any }
) {
  if (properties?.type && ARCHIVE_PROPERTIES_TYPE_MAP[properties.type]) {
    properties.type = ARCHIVE_PROPERTIES_TYPE_MAP[properties.type];
  }

  if (properties?.status && ARCHIVE_PROPERTIES_STATUS_MAP[properties.status]) {
    properties.status = ARCHIVE_PROPERTIES_STATUS_MAP[properties.status];
  }
}

/**
 * Filter and process page data
 * The filtering process will use the configuration in NOTION_CONFIG
 */
export function adjustPageProperties(properties, NOTION_CONFIG) {
  // handle URL
  // 1. Convert the slug according to the URL_PREFIX configured by the user
  // 2. Add an href field to the achive to store the final adjusted path
  if (properties.type === "Record") {
    if (
      getOldsiteConfig({
        key: BLOG.RECORD_URL_PREFIX as string,
        defaultVal: "",
        extendConfig: NOTION_CONFIG,
      })
    ) {
      properties.slug = generateCustomizeUrlWithType({
        recordProperties: properties,
        type: "",
        extendConfig: NOTION_CONFIG,
      });
    }
    properties.href = properties.slug ?? properties.id;
  } else if (PAGE_TYPE_MENU.includes(properties.type)) {
    properties.slug = `/intro/${properties.id}`;
  } else if (GENERAL_TYPE_MENU.includes(properties.type)) {
    // The menu path is empty and used as an expandable menu.
    properties.href = properties.slug ?? "#";
    properties.name = properties.title ?? "";
  }

  // Anything starting with http or https is considered an external link
  if (isStartWithHttp(properties?.href)) {
    properties.href = properties?.slug;
    properties.target = "_blank";
  } else {
    properties.target = "_self";
    // Pseudo-static path splicing on the right side.html

    if (
      getOldsiteConfig({
        key: "PSEUDO_STATIC",
        defaultVal: false,
        extendConfig: NOTION_CONFIG,
      })
    ) {
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
  if ((BLOG.NOTION_DATABASE_ID as string).indexOf(",") > 0) {
    const siteIds = (BLOG.NOTION_DATABASE_ID as string).split(",");
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
 * URLs can be generated based on variables
 * support: %year%/%month%/%day%/%slug%
 * @param {*} recordProperties
 * @returns
 */
export function generateCustomizeUrlWithType({
  recordProperties,
  type,
  extendConfig,
}: {
  recordProperties: Partial<NorkiveRecordData> & { [key: string]: any };
  type: string;
  extendConfig?: {};
}) {
  let fullPrefix = "";
  const allSlugPatterns = BLOG.RECORD_URL_PREFIX.split("/");

  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && recordProperties?.publishDay) {
      const formatPostCreatedDate = new Date(recordProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && recordProperties?.publishDay) {
      const formatPostCreatedDate = new Date(recordProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        "0"
      );
    } else if (pattern === "%day%" && recordProperties?.publishDay) {
      const formatPostCreatedDate = new Date(recordProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, "0");
    } else if (pattern === "%slug%") {
      fullPrefix += recordProperties.slug ?? recordProperties.id;
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

  if (type === "Record") {
    res = `${BLOG.RECORD_URL_PREFIX.toLowerCase()}/${
      recordProperties.slug ?? recordProperties.id
    }`;
  } else if (type == "Project" || "Engineering") {
    res = `${type.toLowerCase()}/${recordProperties.slug ?? recordProperties.id}`;
  } else {
    res = `${fullPrefix.toLowerCase()}/${type.toLowerCase()}/${
      recordProperties.slug ?? recordProperties.id
    }`;
  }

  return res;
}

export const handleRecordsUrl = (isAblePage, properties) => {
  if (isAblePage) {
    const customedUrl = generateCustomizeUrlWithType({
      recordProperties: properties,
      type: properties.type,
    });

    properties.slug = BLOG.RECORD_URL_PREFIX
      ? customedUrl
      : (properties.slug ?? properties.id);
  } else if (PAGE_TYPE_MENU.includes(properties.type)) {
    properties.slug = `/intro/${properties.id}`;
  } else if (GENERAL_TYPE_MENU.includes(properties.type)) {
    // The menu path is empty and used as an expandable menu.
    properties.to = properties.slug ?? "#";
    properties.name = properties.title ?? "";
  }

  // Enable pseudo-static path
  if (JSON.parse(BLOG.PSEUDO_STATIC as string)) {
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
  // return properties;
};
