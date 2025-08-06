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
import { notion } from "@/app/api/clients";

async function generateChildRelations(childRelations: Array<{ id: string }>) {
  const childIds = childRelations.map((rel) => rel.id);
  // 하위항목 id로 각각의 페이지 정보 가져오기
  const children = await Promise.all(
    childIds.map(async (childId) => {
      const childPage = await notion.pages.retrieve({ page_id: childId });
      const childProps = generateMenuItem(childPage as QueryDatabaseResponse);
      return childProps;
    })
  );

  // console.log("children:::", children);
  return children;
}
async function generateMenuItem(page: QueryDatabaseResponse) {
  const slugSet = new Set<string>();
  const id = page.id.replace(/-/g, "");
  const props = page.properties as any;
  const childRelations = props.sub_item?.relation || [];
  const type = props.type?.select?.name;
  const publishDate = new Date(
    props?.date?.date?.start || page.created_time
  ).getTime();
  const sub_type = props.sub_type?.select?.name || "";
  const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
  const icon = props.menuicon?.rich_text?.[0]?.plain_text?.trim() || "";
  const slug = props.slug?.rich_text?.[0]?.plain_text?.trim() || "";
  const subMenus =
    childRelations.length > 0
      ? await generateChildRelations(childRelations)
      : [];
  const url =
    type.toLowerCase() + "/" + generateUserFriendlySlug(type, title, slugSet);
  return {
    id: id,
    icon: icon,
    type: type,
    slug: slug,
    url: url,
    title: title,
    publishDate: publishDate,
    childRelations: childRelations,
    subMenus: subMenus,
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
  constructor(pageList: QueryDatabaseResponseArray) {
    this.pageList = pageList;
  }

  async convertToBasicMenuItemList(): Promise<MenuItem[]> {
    let menus: MenuItem[] = [];
    if (this.pageList && this.pageList.length > 0) {
      const menuPromises = this.pageList.map(async (item) => {
        return await generateMenuItem(item as QueryDatabaseResponse);
      });
      menus = await Promise.all(menuPromises);
    }

    // console.log("menus:::", menus);
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
