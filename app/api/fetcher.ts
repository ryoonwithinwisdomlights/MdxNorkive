import { cache } from "react";

//************* Custom adapter ************* */
import { NotionPageListAdapter } from "@/app/api/adapter";

//*************  clients ************* */
import { notion } from "@/app/api/clients";
import { EXTERNAL_CONFIG } from "@/config/external.config";
//*************  utils ************* */
import { getSiteInfo } from "@/lib/utils/site";

//*************  types ************* */
import type { DocFrontMatter } from "@/types/mdx.model";
import type {
  ModifiedQueryDatabaseResponseArray,
  QueryPageResponse,
} from "@/types/notion.client.model";
import type { MenuItem } from "@/types/docdata.model";
import { DOCS_CONFIG } from "@/config/docs.config";

export const fetchMenuList = cache(async (): Promise<MenuItem[]> => {
  try {
    const queryResponse = await notion.databases.query({
      database_id: EXTERNAL_CONFIG.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
          },
          { property: "type", select: { equals: "Menu" } },
        ],
      },
    });

    const datalist =
      queryResponse.results as ModifiedQueryDatabaseResponseArray;

    const convertedMenuItemList = await new NotionPageListAdapter(
      datalist
    ).convertToBasicMenuItemList();

    return convertedMenuItemList;
  } catch (error) {
    console.warn("Failed to fetch menu list from Notion API:", error);
    return [];
  }
});

export const fetchAllDocsList = cache(async (): Promise<DocFrontMatter[]> => {
  try {
    const queryResponse = await notion.databases.query({
      database_id: EXTERNAL_CONFIG.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "type",
            select: {
              is_not_empty: true, // type이 null(비어있지 않음)
            },
          },
          {
            property: "type",
            select: {
              equals: DOCS_CONFIG.DOCS_TYPE.DOCS as string, // type이 Docs
            },
          },
        ],
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    const convertedAllDocsList = new NotionPageListAdapter(
      queryResponse.results as Array<QueryPageResponse>
    ).convertToAllDocsList();

    convertedAllDocsList.map((item: DocFrontMatter) => {
      const siteInfo = getSiteInfo({ docItem: item });
      // console.log("siteInfo:", siteInfo);
      return {
        ...item,
        siteInfo,
      };
    });
    return convertedAllDocsList;
  } catch (error) {
    console.warn("Failed to fetch Docs from Notion API:", error);
    return [];
  }
});
