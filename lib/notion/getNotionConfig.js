/**
 * Read site configuration from Notion;
 * Create a page of type CONFIG in the Notion template, and add a database form to fill in the configuration
 * Notion database configuration has the highest priority and will override vercel environment variables and configurations in blog.config.js
 * --Notice--
 * Please copy the database from the template https://www.notion.so/tanghh/287869a92e3d4d598cf366bd6994755e
 *
 */
import { getDateValue, getTextContent } from "notion-utils";
import { deepClone } from "../utils/utils";
import { getAllPageIds } from "./getAllPageIds";
import { getPage } from "./getPostBlocks";

/**
 * Read the Config configuration table from Notion
 * @param {*} allPages
 * @returns
 */
export async function getConfigMapFromConfigPage(allPages) {
  // Return configuration file by default
  const notionConfig = {};

  if (!allPages || !Array.isArray(allPages) || allPages.length === 0) {
    console.warn("[Notion configuration] Ignored configuration");
    return null;
  }
  // Find the Config class
  const configPage = allPages?.find((post) => {
    return (
      post &&
      post?.type &&
      (post?.type === "CONFIG" ||
        post?.type === "config" ||
        post?.type === "Config")
    );
  });

  if (!configPage) {
    console.warn("[[Notion Configuration] Configuration page not found");
    return null;
  }
  const configPageId = configPage.id;
  //   console.log('[Notion Configuration] Request configuration data', configPage.id)
  let pageRecordMap = await getPage(configPageId, "config-table");
  //   console.log('Configuration Center Page', configPageId, pageRecordMap)
  let content = pageRecordMap.block[configPageId].value.content;
  for (const table of ["Config-Table", "CONFIG-TABLE"]) {
    if (content) break;
    pageRecordMap = await getPage(configPageId, table);
    content = pageRecordMap.block[configPageId].value.content;
  }

  if (!content) {
    console.warn(
      "[Notion Configuration] Configuration table not found",
      pageRecordMap.block[configPageId],
      pageRecordMap.block[configPageId].value
    );
    return null;
  }

  // Find the database in the PAGE file
  const configTableId = content?.find((contentId) => {
    return pageRecordMap.block[contentId].value.type === "collection_view";
  });

  // eslint-disable-next-line no-constant-condition, no-self-compare
  if (!configTableId) {
    console.warn(
      "[Notion Configuration]Configuration table data not found",
      pageRecordMap.block[configPageId],
      pageRecordMap.block[configPageId].value
    );
    return null;
  }

  // Page search
  const databaseRecordMap = pageRecordMap.block[configTableId];
  const block = pageRecordMap.block || {};
  const rawMetadata = databaseRecordMap.value;
  // Check Type Page-Database和Inline-Database
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`pageId "${configTableId}" is not a database`);
    return null;
  }
  //   console.log('sheet', databaseRecordMap, block, rawMetadata)
  const collectionId = rawMetadata?.collection_id;
  const collection = pageRecordMap.collection[collectionId].value;
  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;
  const schema = collection?.schema;
  const viewIds = rawMetadata?.view_ids;
  const pageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  );
  if (pageIds?.length === 0) {
    console.error(
      "[Notion configuration] The obtained article list is empty, please check the notification template",
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      databaseRecordMap
    );
  }
  // Iterate over the user's table
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const value = block[id]?.value;
    if (!value) {
      continue;
    }
    const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
    const excludeProperties = ["date", "select", "multi_select", "person"];
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
          default:
            break;
        }
      }
    }

    if (properties) {
      // Map fields in the table to English
      const config = {
        enable: (properties["enable"] || properties.Enable) === "Yes",
        key: properties["Configuration name"] || properties.Name,
        value: properties["configuration value"] || properties.Value,
      };

      // Only import effective configurations
      if (config.enable) {
        // console.log('[Notion configuration]', config.key, config.value)
        notionConfig[config.key] = config.value;
      }
    }
  }

  // Finally, check the INLINE_CONFIG of the Notion_Config page to see if it is a js object
  const combine = Object.assign(
    {},
    deepClone(notionConfig),
    parseConfig(notionConfig?.INLINE_CONFIG)
  );
  return combine;
}

/**
 * Parse INLINE_CONFIG
 * @param {*} configString
 * @returns
 */
export function parseConfig(configString) {
  if (!configString) {
    return {};
  }
  // parse object
  try {
    // eslint-disable-next-line no-eval
    const config = eval("(" + configString + ")");
    return config;
  } catch (evalError) {
    console.error(
      "analytic image eval(INLINE_CONFIG)  An error occurred while configuring:",
      evalError
    );
    return {};
  }
}
