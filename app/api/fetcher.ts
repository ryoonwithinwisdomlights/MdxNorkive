import { cache } from "react";

//************* Custom adapter ************* */
import { NotionPageListAdapter } from "@/app/api/adapter";

//*************  clients ************* */
import { notion } from "@/app/api/clients";
import { NOTION_DATABASE_ID } from "./clients";

//*************  utils ************* */
import { getSiteInfo } from "@/lib/utils/site";

//*************  types ************* */
import type { RecordFrontMatter } from "@/types/mdx.model";
import type {
  ModifiedQueryDatabaseResponseArray,
  QueryPageResponse,
} from "@/types/notion.client.model";
import type { MenuItem } from "@/types/recorddata.model";

export const fetchMenuList = cache(async (): Promise<MenuItem[]> => {
  try {
    const queryResponse = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
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

export const fetchAllRecordList = cache(
  async (): Promise<RecordFrontMatter[]> => {
    try {
      const queryResponse = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
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
                equals: "RECORDS", // type이 Record
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

      const convertedAllRecordList = new NotionPageListAdapter(
        queryResponse.results as Array<QueryPageResponse>
      ).convertToAllRecordList();

      convertedAllRecordList.map((item: RecordFrontMatter) => {
        const siteInfo = getSiteInfo({ recordItem: item });
        // console.log("siteInfo:", siteInfo);
        return {
          ...item,
          siteInfo,
        };
      });
      return convertedAllRecordList;
    } catch (error) {
      console.warn("Failed to fetch records from Notion API:", error);
      return [];
    }
  }
);
