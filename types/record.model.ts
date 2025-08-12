/*----------------------------------------------------------------------
 * internal type for blog app
 * ----------------------------------------------------------------------/
 */

import { RecordFrontMatter } from "./mdx.model";

export interface mainRecordProps {
  type: string;
  subType: boolean;
  introTrue: boolean;
  records: any[];
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
  options?: any[];
  count?: number;
}
export interface CategoryItem {
  color: string;
  name?: string;
  id?: string;
  options?: any[];
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

export type BasicPageDivProps = {
  title: string;
  recordList: RecordFrontMatter[];
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
