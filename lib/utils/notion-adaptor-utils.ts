import { notion } from "@/app/api/clients";
import {
  ModifiedQueryDatabaseResponse,
  QueryPageResponse,
  RecordFrontMatter,
  MenuItem,
} from "@/types";
import { generateUserFriendlySlug } from "@/lib/utils";

export async function generateChildRelations(
  childRelations: Array<{ id: string }>
): Promise<MenuItem[]> {
  const childIds = childRelations.map((rel) => rel.id);
  // 하위항목 id로 각각의 페이지 정보 가져오기
  const children: MenuItem[] = await Promise.all(
    childIds.map(async (childId): Promise<MenuItem> => {
      const childPage = await notion.pages.retrieve({ page_id: childId });
      const childProps = await generateMenuItem(
        childPage as ModifiedQueryDatabaseResponse
      );
      return childProps!;
    })
  );

  return children;
}

export async function generateMenuItem(
  page: ModifiedQueryDatabaseResponse
): Promise<MenuItem | undefined> {
  const slugSet = new Set<string>();
  const id = page.id.replace(/-/g, "");
  const props = page.properties as any;
  const childRelations = props.sub_item?.relation || [];
  const type = props.type?.select?.name;
  const publishDate = new Date(
    props?.date?.date?.start || page.created_time
  ).getTime();
  const status = props.status?.select?.name;
  // const sub_type = props.sub_type?.select?.name || "";
  const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
  const icon = props.menuicon?.rich_text?.[0]?.plain_text?.trim() || "";
  const slug = props.slug?.rich_text?.[0]?.plain_text?.trim() || "";
  const subMenus: MenuItem[] =
    childRelations.length > 0
      ? await generateChildRelations(childRelations)
      : [];

  const url =
    type.toLowerCase() + "/" + generateUserFriendlySlug(type, title, slugSet);

  if (status === "Published") {
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
}

export function generateRecordItem(
  page: ModifiedQueryDatabaseResponse
): RecordFrontMatter {
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
  const favorite = props.favorite?.checkbox || false;
  const category = props.category?.select?.name || "";
  const tags = props.tags?.multi_select?.map((t: any) => t.name) || [];
  const date = props.date?.date?.start || new Date().toISOString();
  const publishDate = new Date(
    props?.date?.date?.start || page.created_time
  ).getTime();
  const lastEditedTime = last_edited_time
    ? new Date(last_edited_time).toISOString()
    : date;
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
    favorite,
    publishDate,
    date: date.slice(0, 10),
    lastEditedTime,
    draft: false,
    description,
    icon,
    full: false,
    readingTime: Math.ceil((title.length + description.length) / 200),
    wordCount: title.length + description.length,
    status: "published",
    author: "ryoon",
    version: "1.0.0",
  } as RecordFrontMatter;
}
