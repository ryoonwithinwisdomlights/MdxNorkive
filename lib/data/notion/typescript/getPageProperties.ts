/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { siteConfig } from "@/lib/config";
import formatDate from "@/lib/utils/formatDate";
import { isStartWithHttp } from "@/lib/utils/utils";
import { CollectionData } from "@/types";
import md5 from "js-md5";
import { NotionAPI } from "notion-client";
import {
  BlockMap,
  CollectionPropertySchemaMap,
  Decoration,
  SelectOption,
  User,
} from "notion-types";
import { getDateValue, getTextContent } from "notion-utils";
import { mapImgUrl } from "./mapImage";

export async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap,
  authToken: string | null,
  tagOptions: SelectOption[]
): Promise<CollectionData | null> {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const value = block[id]?.value;
  const properties: Partial<CollectionData> & {
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
    properties.slug = BLOG.RECORD_URL_PREFIX
      ? generateCustomizeUrlWithType(properties, properties.type)
      : (properties.slug ?? properties.id);
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
    properties.slug = generateCustomizeUrlWithType(properties, properties.type);
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
  return properties as CollectionData;
}

/**
 * Mapping user-defined headers
 */
function mapProperties(
  properties: Partial<CollectionData> & { [key: string]: any }
) {
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_record) {
    properties.type = "Record";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_devproject) {
    properties.type = "Devproject";
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_engineering) {
    properties.type = "Engineering";
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
function generateCustomizeUrlWithType(
  postProperties: Partial<CollectionData> & { [key: string]: any },
  type: string
) {
  let fullPrefix = "";
  const allSlugPatterns = BLOG.RECORD_URL_PREFIX.split("/");
  // console.log("allSlugPatterns", allSlugPatterns);
  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        "0"
      );
    } else if (pattern === "%day%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, "0");
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

  if (type === "Record") {
    res = `${fullPrefix.toLowerCase()}/${
      postProperties.slug ?? postProperties.id
    }`;
  } else if (type == "Devproject" || "Engineering") {
    res = `/${type.toLowerCase()}/${postProperties.slug ?? postProperties.id}`;
  } else {
    res = `${fullPrefix.toLowerCase()}/${type.toLowerCase()}/${
      postProperties.slug ?? postProperties.id
    }`;
  }

  return res;
}

/**
 * Get custom URL
 * URL can be generated based on variables
 * Support: %category%/%year%/%month%/%day%/%slug%
 * @param {*} postProperties
 * @returns
 */
function generateCustomizeSlug(
  postProperties: Partial<CollectionData> & { [key: string]: any },
  NOTION_CONFIG: any
) {
  // External links are not processed
  if (isStartWithHttp(postProperties.slug)) {
    return postProperties.slug;
  }
  let fullPrefix = "";

  const allSlugPatterns = siteConfig({
    key: "RECORD_URL_PREFIX",
    defaultVal: null,
    extendConfig: NOTION_CONFIG,
  }).split("/");

  const RECORD_URL_PREFIX_MAPPING_CATEGORY = siteConfig({
    key: "RECORD_URL_PREFIX_MAPPING_CATEGORY",
    defaultVal: null,
    extendConfig: NOTION_CONFIG,
  });

  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        "0"
      );
    } else if (pattern === "%day%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, "0");
    } else if (pattern === "%slug%") {
      fullPrefix += postProperties.slug ?? postProperties.id;
    } else if (pattern === "%category%" && postProperties?.category) {
      let categoryPrefix = postProperties.category;
      // Allows mapping of category names, usually used to map Chinese categories into English and beautify u
      if (RECORD_URL_PREFIX_MAPPING_CATEGORY[postProperties?.category]) {
        categoryPrefix =
          RECORD_URL_PREFIX_MAPPING_CATEGORY[postProperties?.category];
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
