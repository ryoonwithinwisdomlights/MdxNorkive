import type {
  ArticleTag,
  DataBaseMetaDataResponse,
  MenuItem,
  QueryDatabaseResponse,
  QueryDatabaseResponseArray,
  QueryPageResponse,
  RecordItem,
} from "@/app/api/types";
import { INCLUDED_MENU_TYPES } from "@/constants/menu.constants";
import { generateUserFriendlySlug } from "@/lib/utils/mdx-utils";

function generateMenuItem(page: QueryDatabaseResponse): MenuItem {
  const slugSet = new Set<string>();
  const id = page.id.replace(/-/g, "");
  const props = page.properties as any;
  const type = props.type?.select?.name;
  const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
  const sub_type = props.sub_type?.select?.name || "";
  const icon = props.menuicon?.rich_text?.[0]?.plain_text?.trim() || "";
  const slug =
    type === "Menu" ? "" : generateUserFriendlySlug(sub_type, title, slugSet);
  return {
    id: id,
    icon: icon,
    type: type,
    slug: slug,
    url: slug,
    title: title,
    subMenus: [],
  };
}

function generateRecordItem(page: QueryDatabaseResponse) {
  const slugSet = new Set<string>();

  const id = page.id.replace(/-/g, "");
  const props = page.properties as QueryPageResponse["properties"];
  const last_edited_time = page.last_edited_time;
  let pageCover: string | null = null;
  if (page.cover) {
    if (page.cover.type === "external") {
      pageCover = page.cover.external.url;
    } else if (page.cover.type === "file") {
      pageCover = page.cover.file.url;
    }
  }
  const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
  const type = props.type?.select?.name;
  const sub_type = props.sub_type?.select?.name || "";
  // 사용자 친화적 슬러그 생성
  const slug = generateUserFriendlySlug(sub_type, title, slugSet);
  const description = props.summary?.rich_text?.[0]?.plain_text?.trim() || "";
  let icon: string | null = null;
  if (page.icon) {
    if (page.icon.type === "external") {
      pageCover = page.icon.external.url;
    } else if (page.icon.type === "file") {
      pageCover = page.icon.file.url;
    }
  }
  // const icon = page.icon?.emoji || "";
  const full = false;
  const category = props.category?.multi_select?.map((t: any) => t.name) ?? [];
  const tags = props.tags?.multi_select?.map((t: any) => t.name) ?? [];
  const date = props.date?.date?.start || new Date().toISOString();
  const publishDate = new Date(
    props?.date?.date?.start || page.created_time
  ).getTime();
  const lastEditedDate = last_edited_time ? new Date(last_edited_time) : date;
  const summary = props.summary?.rich_text?.[0]?.plain_text?.trim() || "";
  const password = props.password?.rich_text?.[0]?.plain_text?.trim() || "";
  return {
    title,
    slug,
    summary,
    pageCover,
    notionId: id,
    password,
    type,
    sub_type,
    category,
    tags,
    publishDate,
    date: date.slice(0, 10),
    last_edited_time,
    lastEditedDate,
    draft: false,
    description,
    icon,
    full,
    lastModified: new Date().toISOString().slice(0, 10),
    readingTime: Math.ceil((title.length + description.length) / 200),
    wordCount: title.length + description.length,
    status: "published",
    author: "ryoon",
    version: "1.0.0",
  } as RecordItem;
}

export class NotionPageAdapter {
  private page: QueryDatabaseResponse;
  private id: string;
  private props: QueryDatabaseResponse["properties"];
  constructor(page: QueryDatabaseResponse) {
    this.page = page;
    this.id = page.id.replace(/-/g, "");
    this.props = page.properties as QueryDatabaseResponse["properties"];
  }

  // convertToArticlePageHeaderData(): ArticlePageHeaderData {
  //   const {
  //     properties: { name, description, tags, createdAt, thumbnail },
  //     created_time,
  //   } = this.page;
  //   return {
  //     title: name.title?.[0]?.plain_text ?? "",
  //     description: description.rich_text?.[0]?.plain_text ?? "",
  //     tagList: tags.multi_select.map(({ id, name }) => ({ id, name })),
  //     createdAt: new Date(createdAt.date?.start ?? created_time),
  //     thumbnailUrl: thumbnail.files?.[0]?.file.url ?? "기본 이미지 url",
  //   };
  // }

  // convertToArticleLinkerData(): ArticleLinkerData {
  //   const {
  //     id: pageId,
  //     properties: { name },
  //   } = this.page;

  //   return {
  //     pageId,
  //     title: name.title?.[0]?.plain_text ?? "",
  //   };
  // }
}

export class NotionPageListAdapter {
  private pageList: QueryDatabaseResponseArray;
  // private id = page.id.replace(/-/g, "");
  // private props = page.properties as any;
  constructor(pageList: QueryDatabaseResponseArray) {
    this.pageList = pageList;
  }

  convertToMenuItemList(): MenuItem[] {
    // const menuPages = this.pageList.filter((page) => {
    //   const type = (page.properties as any)?.type?.select?.name;
    //   return INCLUDED_MENU_TYPES.includes(type);
    // });
    const menus: MenuItem[] = [];
    if (this.pageList && this.pageList.length > 0) {
      this.pageList.sort((a, b) => {
        const typeOrder = { Menu: 0, SubMenuPage: 1, Submenu: 2 };
        return (
          typeOrder[(a.properties as any)?.type?.select?.name] -
          typeOrder[(b.properties as any)?.type?.select?.name]
        );
      });
      this.pageList.forEach((item) => {
        const menuItem = generateMenuItem(item as QueryDatabaseResponse);
        // console.log("menuItem:", menuItem);
        const type = (item.properties as any)?.type?.select?.name;
        // console.log("type:", type);
        if (type === "Menu") {
          menus.push(menuItem);
        } else {
          const parentMenu = menus[menus.length - 1];
          // console.log("parentMenu:", type);
          if (parentMenu) {
            if (parentMenu.subMenus) {
              parentMenu.subMenus.push(menuItem);
            } else {
              parentMenu.subMenus = [menuItem];
            }
          }
        }
      });
    }
    return menus;
  }

  // convertToFeaturedArticleList(): FeaturedArticle[] {
  //   return this.pageList.map(
  //     ({
  //       id: pageId,
  //       properties: { id, name, description, createdAt, thumbnail },
  //       created_time,
  //     }) => ({
  //       id: id.unique_id.number,
  //       title: name.title?.[0]?.plain_text ?? "",
  //       description: description.rich_text?.[0]?.plain_text ?? "",
  //       createdAt: new Date(createdAt.date?.start ?? created_time),
  //       thumbnailUrl: thumbnail.files?.[0]?.file.url ?? "기본 이미지 url",
  //       pageId,
  //     })
  //   );
  // }

  convertToAllRecordList(): RecordItem[] {
    return this.pageList.map((item) => generateRecordItem(item));
  }
}

export class NotionDataBaseMetaDataAdapter {
  private metaData: DataBaseMetaDataResponse;

  constructor(metaData: DataBaseMetaDataResponse) {
    this.metaData = metaData;
  }

  convertToTagList(): ArticleTag[] {
    return this.metaData.properties.tags.multi_select.options;
  }
}
