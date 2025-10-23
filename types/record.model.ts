/*----------------------------------------------------------------------
 * internal type for blog app
 * ----------------------------------------------------------------------/
 */

import { ReactNode } from "react";
import { LocaleDict, RecordFrontMatter } from "@/types";

import type { SerializedPage } from "./provider.model";

export interface mainRecordProps {
  type: "BOOKS" | "PROJECTS" | "RECORDS" | "ENGINEERINGS" | "";
  subType: boolean;
  introTrue: boolean;
  records: SerializedPage[];
}
export interface TransferedDataProps {
  title: string;
  summary?: string;
  type?: string;
  subType?: string;
  date?: string;
  author?: string;
  tags?: string[];
  isLocked?: boolean;
  url?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export type RecommendPage = {
  id: string;
  type: string;
  tags?: string[];
};

export interface TagItem {
  color: string;
  name?: string;
  id?: string;
  options?: string[];
  count?: number;
}
export interface CategoryItem {
  color: string;
  name?: string;
  id?: string;
  options?: string[];
  count?: number;
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

export interface RecordTag {
  id: string;
  name: string;
}

// export interface OptionItem {
//   id: number;
//   title: string;
//   option: string;
//   isActive?: boolean;
// }

export type BasicPageDivProps = {
  title: string;
  recordList: Record<string, SerializedPage[]>;
};

export type PaginationDivProps = {
  pagenum?: number;
  allPages?: RecordFrontMatter[];
  pageCount: number;
};

export type CardInfoDivProps = {
  data: TransferedDataProps;
  showPreview: boolean;

  showSummary: boolean;
};
export type NavListDivProps = {
  record: RecordFrontMatter;
  className?: string;
  substr?: boolean;
  substrNumber?: number;
};

export type PageParams = Promise<{ [key: string]: string }>;

export type PageSearchParams = Promise<{
  [key: string]: number | undefined;
}>;

export type TotalPageParams = {
  params: PageParams;
  searchParams: PageSearchParams;
};

export type TOCItemType = {
  title: ReactNode;
  url: string;
  depth: number;
};

export interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "gradient" | "transparent";
}

export interface ContentCardProps {
  data: TransferedDataProps;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact" | "featured";
  showMeta?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  locale?: LocaleDict;
  lang: string;
  hover?: boolean;
  border?: boolean;
  background?: "default" | "gradient" | "transparent";
}
export interface ImageCardProps {
  data: TransferedDataProps;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "horizontal" | "vertical" | "featured";
  showMeta?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  locale?: LocaleDict;
  lang: string;
  // 슬라이더 관련 props
  isSlider?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  currentIndex?: number;
  totalSlides?: number;
  onSlideChange?: (index: number) => void;
}

export interface GridCardProps {
  title: string;
  type?: string;
  subType?: string;
  author?: string;
  description?: string;
  date?: string;
  distanceFromToday?: string;
  tags?: string[];
  imageUrl?: string;
  imageAlt?: string;
  url: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact" | "large";
  showImage?: boolean;
  showMeta?: boolean;
  showTags?: boolean;
  showDescription?: boolean;
  locale?: LocaleDict;
}
