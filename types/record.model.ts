/*----------------------------------------------------------------------
 * internal type for blog app
 * ----------------------------------------------------------------------/
 */

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

export type DateObj = {
  type?: string;
  start_date?: string;
  date_format?: string;
};

export type BaseArchivePageBlock = {
  id: string;
  description?: string;
  author?: string;
  date: DateObj;
  type: string;
  category: string;
  sub_type?: string[];
  favorite?: boolean;
  comment?: string;
  tags?: string[];
  title: string;
  content?: string[];
  status: string;
  publishDate: number;
  publishDay: string;
  lastEditedDate?: Date;
  lastEditedDay?: string;
  fullWidth?: boolean;
  pageIcon?: string;
  pageCover?: string;
  pageCoverThumbnail?: string;
  tagItems?: TagItem[];
  summary?: any;
  slug: string;
  icon?: string;
  results?: any;
  password?: string;
  tableOfContents?: any[] | [];
  RecordMap?: any | null;
  blockMap?: any | null;
  prev?: BaseArchivePageBlock | null;
  next?: BaseArchivePageBlock | null;
  recommendPages?: RecommendPage[] | [];
};

export type BaseArchivePageBlock2 = {
  id: string;
  description?: string;
  author?: string;
  date: DateObj;
  type: string;
  category: string;
  sub_type?: string;
  favorite?: boolean;
  comment?: string;
  tags?: string[];
  title: string;
  content?: string;
  status: string;
  publishDate: number;
  publishDay: string;
  lastEditedDate?: Date;
  lastEditedDay?: string;
  fullWidth?: boolean;
  pageIcon?: string;
  pageCover?: string;
  pageCoverThumbnail?: string;
  tagItems?: TagItem[];
  summary?: any;
  slug: string;
  icon?: string;
  results?: any;
  password?: string;
  tableOfContents?: any[] | [];
  RecordMap?: any | null;
  blockMap?: any | null;
  prev?: BaseArchivePageBlock | null;
  next?: BaseArchivePageBlock | null;
  recommendPages?: RecommendPage[] | [];
};

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
