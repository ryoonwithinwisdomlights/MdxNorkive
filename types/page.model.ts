import { ParsedUrlQuery } from "querystring";
import { BaseArchivePageBlock } from "./record.model";
import { RecordFrontMatter } from "@/types/mdx.model";
export interface ChildrenProp {
  children: React.ReactNode;
}

export type ClassNameProp = {
  className: string;
};

export interface PageError {
  message?: string;
  statusCode: number;
}

export interface Params extends ParsedUrlQuery {
  pageId: string;
}

export type PageParams = Promise<{ [key: string]: string }>;

export type PageSearchParams = Promise<{
  [key: string]: number | undefined;
}>;

export type TotalPageParams = {
  params: PageParams;
  searchParams: PageSearchParams;
};

export type SlugConvertProps = {
  slug: string;
  type: string;
};

export type CardInfoPageDivProps = {
  type: string;
  recordList: BaseArchivePageBlock[];
};

export type BasicPageDivProps = {
  title: string;
  recordList: BaseArchivePageBlock[];
};

export type PaginationDivProps = {
  pagenum?: number;
  allPages?: BaseArchivePageBlock[];
  pageCount: number;
};

export type CardInfoDivProps = {
  page: any;
  showPreview: boolean;
  showPageCover: boolean;
  showSummary: boolean;
};
export type NavListDivProps = {
  record: RecordFrontMatter;
  className?: string;
  substr?: boolean;
  substrNumber?: number;
};

export interface PageUrlOverridesMap {
  // maps from a URL path to the notion page id the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pagePath: string]: string;
}

export interface PageUrlOverridesInverseMap {
  // maps from a notion page id to the URL path the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pageId: string]: string;
}
