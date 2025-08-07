import { EmojiRequest } from "@/types";
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

/*----------------------------------------------------------------------
 * internal type for notion client response
 * ----------------------------------------------------------------------*/
type IdRequest = string | string;
type SelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";
type PartialSelectResponse = {
  id: string;
  name: string;
  color: SelectColor;
};
type CustomEmojiResponse = {
  id: IdRequest;
  name: string;
  url: string;
};
type TextRequest = string;
export type RecordItem = {
  title: string;
  slug: string;
  summary: string;
  pageCover: string | null;
  notionId: string;
  password: string;
  type: string;
  sub_type: string;
  category: string[];
  tags: string[];
  publishDate?: number;
  date: string;
  last_edited_time: string;
  lastEditedDate: string | Date;
  draft: boolean;
  description: string;
  icon: string | null;
  full: boolean;
  lastModified: string;
  readingTime: number;
  wordCount: number;
  status: string;
  author: string;
  version: string;
};
export type QueryDatabaseResponseArray = Array<QueryDatabaseResponse>;
export type QueryDatabaseResponse = QueryPageResponse | DatabaseObjectResponse;
/**
 * api로 부터 받아오는 노션 page response
 * property들은 노션 데이터베이스 schema를 따른다.
 */
export interface QueryPageResponse
  extends Omit<PageObjectResponse, "properties"> {
  properties: {
    id: {
      type: "unique_id";
      unique_id: {
        prefix: string | null;
        /** 데이터베이스 상에서 자동으로 부여되는 ID */
        number: number;
      };
      id: string;
    };
    title: {
      type: "title";
      title: Array<TextRichTextItemResponse>;
      id: string;
    };
    password: {
      type: "rich_text";
      rich_text: Array<TextRichTextItemResponse>;
      id: string;
    };
    summary: {
      type: "rich_text";
      rich_text: Array<TextRichTextItemResponse>;
      id: string;
    };
    type: {
      type: "select";
      select: PartialSelectResponse | null;
    };
    sub_type: {
      type: "select";
      select: PartialSelectResponse | null;
    };
    status: {
      type: "select";
      select: PartialSelectResponse | null;
    };
    category: {
      type: "multi_select";
      multi_select: Array<PartialSelectResponse>;
      id: string;
    };
    tags: {
      type: "multi_select";
      multi_select: Array<PartialSelectResponse>;
      id: string;
    };
    favorite: {
      type: "checkbox";
      checkbox: boolean;
      id: string;
    };
    menuicon: {
      type: "rich_text";
      rich_text: Array<TextRichTextItemResponse>;
      id: string;
    };
    slug: {
      type: "rich_text";
      rich_text: Array<TextRichTextItemResponse>;
      id: string;
    };
    date: {
      type: "date";
      date: {
        start: string;
        end: string | null;
      } | null;
      id: string;
    };
    upper_item: {
      type: "relation";
      relation: Array<PartialSelectResponse>;
      id: string;
    };
    sub_item: {
      type: "relation";
      relation: Array<PartialSelectResponse>;
      id: string;
    };

    cover:
      | {
          type: "external";
          external: {
            url: TextRequest;
          };
        }
      | null
      | {
          type: "file";
          file: {
            url: string;
            expiry_time: string;
          };
        }
      | null;
  };
}

export interface DataBaseMetaDataResponse
  extends Omit<DatabaseObjectResponse, "properties"> {
  properties: {
    tags: {
      type: "multi_select";
      multi_select: {
        options: Array<{
          id: string;
          name: string;
          description: string | null;
        }>;
      };
      id: string;
      name: string;
    };
  };
}

/*----------------------------------------------------------------------
 * internal type for blog app
 * ----------------------------------------------------------------------/

/** 주요 게시글 */
export interface FeaturedArticle {
  /** notion database id property */
  id: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 description */
  description: string;
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
  /** queried notion page id */
  pageId: string;
}

export interface MenuItem {
  id: string;
  icon?: string;
  url?: string;
  slug?: string;
  type: string;
  title?: string;
  publishDate: number;
  childRelations?: Array<{
    id: string;
  }>;
  subMenus?: MenuItem[]; // 재귀적 구조
}

export interface FeaturedArticleWithBlur extends FeaturedArticle {
  /** blurData url */
  blurDataUrl: string;
}

/** 게시글 태그 */
export interface ArticleTag {
  id: string;
  name: string;
}

/** 모든 게시글 항목에 있는 게시글 */
export interface AllArticle {
  /** notion database id property */
  id: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 태그 목록 */
  tagList: ArticleTag[];
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
  /** queried notion page id */
  pageId: string;
}

export interface AllArticleWithBlur extends AllArticle {
  /** blurData url */
  blurDataUrl: string;
}

export interface ArticlePageHeaderData {
  /** 게시글 제목 */
  title: string;
  /** 게시글 요약 설명 */
  description: string;
  /** 게시글 태그 목록 */
  tagList: ArticleTag[];
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
}

export interface ArticlePageHeaderDataWithBlur extends ArticlePageHeaderData {
  blurDataUrl: string;
}

export interface ArticleLinkerData {
  pageId: AllArticle["pageId"];
  title: AllArticle["title"];
}

export interface ArticlePageFooterData {
  prevArticle?: ArticleLinkerData;
  nextArticle?: ArticleLinkerData;
}

export type FileImageBlock = {
  type: "file";
  file: {
    url: string;
  };
};
