//*************  types ************* */
import type { DocFrontMatter } from "@/types/mdx.model";
import type {
  DataBaseMetaDataResponse,
  ModifiedQueryDatabaseResponse,
  ModifiedQueryDatabaseResponseArray,
} from "@/types/notion.client.model";
import type { MenuItem, DocTag } from "@/types/docdata.model";

//*************  utils ************* */
import {
  generateMenuItem,
  generateDocItem,
} from "@/lib/utils/notion-adaptor-utils";

export class NotionPageAdapter {
  private page: ModifiedQueryDatabaseResponse;
  private id: string;
  private props: ModifiedQueryDatabaseResponse["properties"];
  constructor(page: ModifiedQueryDatabaseResponse) {
    this.page = page;
    this.id = page.id.replace(/-/g, "");
    this.props = page.properties as ModifiedQueryDatabaseResponse["properties"];
  }
}

export class NotionPageListAdapter {
  private pageList: ModifiedQueryDatabaseResponseArray;
  constructor(pageList: ModifiedQueryDatabaseResponseArray) {
    this.pageList = pageList;
  }

  async convertToBasicMenuItemList(): Promise<MenuItem[]> {
    let menus: MenuItem[] = [];
    if (this.pageList && this.pageList.length > 0) {
      const menuPromises = this.pageList.map(async (item) => {
        return await generateMenuItem(item as ModifiedQueryDatabaseResponse);
      });
      menus = (await Promise.all(menuPromises)).filter(
        (item): item is MenuItem => item !== undefined
      );
    }

    return menus;
  }

  convertToAllDocsList(): DocFrontMatter[] {
    return this.pageList.map((item) => generateDocItem(item));
  }
}

export class NotionDataBaseMetaDataAdapter {
  private metaData: DataBaseMetaDataResponse;

  constructor(metaData: DataBaseMetaDataResponse) {
    this.metaData = metaData;
  }

  convertToTagList(): DocTag[] {
    return this.metaData.properties.tags.multi_select.options;
  }
}
