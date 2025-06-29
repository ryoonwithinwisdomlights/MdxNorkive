import { type ExtendedRecordMap } from "notion-types";
import { type ParsedUrlQuery } from "node:querystring";
import { type PageMap } from "notion-types";

export type NavigationStyle = "default" | "custom";
export interface Site {
  name: string;
  link: string;

  rootNotionPageId: string;
  rootNotionSpaceId: string | null;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;
}

export interface PageError {
  message?: string;
  statusCode: number;
}

export interface PageProps {
  site?: Site;
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
}

export interface ChildrenProp {
  children: React.ReactNode;
}
export type PageBlockDataProps = {
  pageId: string;
  from?: string;
  type?: string;
  slice?: number;
};

export type ClassNameProp = {
  className: string;
};

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

export type ConfirmModalProps = {
  children: React.ReactNode;
  onConfirm: () => void;
};

export interface Params extends ParsedUrlQuery {
  pageId: string;
}

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}
export interface SiteMap {
  site: Site;
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
}

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
