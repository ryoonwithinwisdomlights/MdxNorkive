// /* eslint-disable no-unused-vars */
// import { BLOG } from "@/blog.config";
// import { notion_api } from "@/lib/notion/api/notion";

// import {
//   BlockMap,
//   CollectionPropertySchemaMap,
//   Decoration,
//   SelectOption,
//   User,
// } from "notion-types";

// import {
//   adjustPageProperties,
//   mapProperties,
// } from "@/lib/notion/functions/function";
// import { getRecordBlockMapWithRetry } from "@/lib/notion/api/getPageWithRetry";
// import { mapImgUrl } from "@/lib/notion/functions/utils";
// import { getUsers } from "@/lib/notion/api/getUsers";
// import { formatDate } from "@/lib/utils/utils";
// import { BaseArchivePageBlock } from "@/types";
// import { getDateValue, getPageTitle, getTextContent } from "notion-utils";

// export async function getPageProperties(
//   id: string,
//   pageId: string,
//   block: BlockMap,
//   schema: CollectionPropertySchemaMap,
//   authToken: string | null,
//   tagOptions: SelectOption[]
// ): Promise<BaseArchivePageBlock | null> {
//   const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
//   const excludeProperties = ["date", "select", "multi_select", "person"];
//   const value = block[id]?.value;
//   const properties: Partial<BaseArchivePageBlock> & {
//     id: string;
//     [key: string]: any;
//   } = { id };
//   rawProperties.forEach(async ([key, val]) => {
//     properties.id = id;
//     if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
//       properties[schema[key].name] = getTextContent(val as Decoration[]);
//     } else {
//       switch (schema[key]?.type) {
//         case "date": {
//           const dateProperty = getDateValue(val as Decoration[]);
//           // delete dateProperty.type;
//           properties[schema[key].name] = dateProperty;
//           break;
//         }
//         case "select":
//         case "multi_select": {
//           const selects = getTextContent(val as Decoration[]);
//           if (selects[0]?.length) {
//             properties[schema[key].name] = selects.split(",");
//           }
//           break;
//         }
//         case "person": {
//           const rawUsers = (val as Decoration[]).flat();
//           const users: User[] = [];
//           for (let i = 0; i < rawUsers.length; i++) {
//             if (rawUsers[i][0][1]) {
//               const userArr = rawUsers[i][0];
//               const userList = await getUsers(pageId, userArr as string[]);
//               const userResult: any[] = userList.results;
//               const userValue: User = userResult[1].value;
//               users.push(userValue);
//             }
//           }
//           properties[schema[key].name] = users;
//           break;
//         }
//         default:
//           break;
//       }
//     }
//   });

//   // Mapping key: user-defined header name
//   const fieldNames = BLOG.NOTION_PROPERTY_NAME;
//   if (fieldNames) {
//     Object.keys(fieldNames).forEach((key) => {
//       if (fieldNames[key] && properties[fieldNames[key]]) {
//         properties[key] = properties[fieldNames[key]];
//       }
//     });
//   }

//   // type\status\category It is a single-select drop-down box.
//   // Take the first one in the array.
//   properties.type = properties.type?.[0] || "";
//   properties.status = properties.status?.[0] || "";
//   properties.category = properties.category?.[0] || "";
//   properties.comment = properties.comment?.[0] || "";

//   // Mapping value: drop-down box options for user personalized type and status fields,
//   //  mapped back to the English identifier of the code here
//   mapProperties(properties);

//   properties.publishDate = new Date(
//     properties?.date?.start_date || value.created_time
//   ).getTime();
//   properties.publishDay = formatDate(properties.publishDate, BLOG.LANG);
//   properties.lastEditedDate = new Date(value?.last_edited_time);
//   properties.lastEditedDay = formatDate(
//     new Date(value?.last_edited_time),
//     BLOG.LANG
//   );
//   properties.fullWidth = value.format?.page_full_width ?? false;
//   properties.pageIcon =
//     mapImgUrl(block[id].value?.format?.page_icon, block[id].value) ?? "";
//   properties.pageCover =
//     mapImgUrl(block[id].value?.format?.page_cover, block[id].value) ?? "";
//   properties.pageCoverThumbnail =
//     mapImgUrl(
//       block[id].value?.format?.page_cover,
//       block[id].value,
//       "block",
//       "pageCoverThumbnail"
//     ) ?? "";
//   properties.content = value.content ?? [];
//   properties.tagItems =
//     properties?.tags?.map((tag) => {
//       return {
//         name: tag,
//         color: tagOptions?.find((t) => t.value === tag)?.color || "gray",
//       };
//     }) || [];

//   if (id === pageId) {
//     const blockMap = await getRecordBlockMapWithRetry({
//       pageId: pageId,
//       retryAttempts: 3,
//     });
//     properties.blockMap = blockMap;
//   }
//   adjustPageProperties(properties);
//   delete properties.content;
//   return properties as BaseArchivePageBlock;
// }

// export async function getSinglePageProperties(
//   pageId: string,
//   block,
//   recordMap,
//   schema: CollectionPropertySchemaMap,
//   tagOptions: SelectOption[]
// ): Promise<BaseArchivePageBlock> {
//   const rawProperties = Object.entries(block?.value?.properties || []);
//   const excludeProperties = ["date", "select", "multi_select", "person"];
//   const value: any = block?.value;
//   const properties: Partial<BaseArchivePageBlock> & {
//     id: string;
//     [key: string]: any;
//   } = { id: pageId };

//   rawProperties.forEach(async ([key, val]) => {
//     properties.id = pageId;
//     if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
//       // properties[schema[key].name] = getPageProperty(
//       //   schema[key].name,
//       //   block,
//       //   recordMap
//       // );
//       properties[schema[key].name] = getTextContent(val as Decoration[]);
//     } else {
//       switch (schema[key]?.type) {
//         case "date": {
//           const dateProperty = getDateValue(val as Decoration[]);
//           properties[schema[key].name] = dateProperty;
//           break;
//         }
//         case "select":
//         case "multi_select": {
//           const selects = getTextContent(val as Decoration[]);
//           if (selects[0]?.length) {
//             properties[schema[key].name] = selects.split(",");
//           }
//           break;
//         }
//         case "person": {
//           const rawUsers = (val as Decoration[]).flat();
//           const users: User[] = [];

//           for (let i = 0; i < rawUsers.length; i++) {
//             if (rawUsers[i][0][1]) {
//               const userArr = rawUsers[i][0];
//               const userList = await notion_api.getUsers(userArr as string[]);
//               const userResult: any[] = userList.results;
//               const userValue: User = userResult[1].value;
//               users.push(userValue);
//             }
//           }
//           properties[schema[key].name] = users;
//           break;
//         }
//         default:
//           properties[schema[key].name] = getTextContent(val as Decoration[]);
//           break;
//       }
//     }
//   });

//   const fieldNames = BLOG.NOTION_PROPERTY_NAME;
//   if (fieldNames) {
//     Object.keys(fieldNames).forEach((key) => {
//       if (fieldNames[key] && properties[fieldNames[key]]) {
//         properties[key] = properties[fieldNames[key]];
//       }
//     });
//   }

//   // type\status\category It is a single-select drop-down box.
//   // Take the first one in the array.
//   properties.title = getPageTitle(recordMap) || "";
//   properties.type = properties.type?.[0] || "";
//   properties.status = properties.status?.[0] || "";
//   properties.category = properties.category?.[0] || "";
//   properties.comment = properties.comment?.[0] || "";

//   // Mapping value: drop-down box options for user personalized type and status fields,
//   //  mapped back to the English identifier of the code here
//   mapProperties(properties);

//   properties.publishDate = new Date(
//     properties?.date?.start_date || value.created_time
//   ).getTime();
//   properties.publishDay = formatDate(properties.publishDate, BLOG.LANG);
//   properties.lastEditedDate = new Date(value?.last_edited_time);
//   properties.lastEditedDay = formatDate(
//     new Date(value?.last_edited_time),
//     BLOG.LANG
//   );
//   properties.fullWidth = value.format?.page_full_width ?? false;
//   properties.pageIcon =
//     mapImgUrl(block.value?.format?.page_icon, block.value) ?? "";
//   properties.pageCover =
//     mapImgUrl(block.value?.format?.page_cover, block.value) ?? "";
//   properties.pageCoverThumbnail =
//     mapImgUrl(
//       block.value?.format?.page_cover,
//       block.value,
//       "block",
//       "pageCoverThumbnail"
//     ) ?? "";
//   properties.content = value.content ?? [];
//   properties.tagItems =
//     properties?.tags?.map((tag) => {
//       return {
//         name: tag,
//         color: tagOptions?.find((t) => t.value === tag)?.color || "gray",
//       };
//     }) || [];

//   adjustPageProperties(properties);
//   delete properties.content;
//   return properties as BaseArchivePageBlock;
// }
