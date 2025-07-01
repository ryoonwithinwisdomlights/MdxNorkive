import { ExtendedRecordMap, SelectOption } from "notion-types";
import { TableOfContentsEntry } from "notion-utils";

export type RecommendPage = {
  id: string;
  type: string;
  tags?: string[];
};

export interface TagItem {
  color: string;
  name?: string;
  id?: string;
  options?: SelectOption[];
  count?: number;
}
export interface CategoryItem {
  color: string;
  name?: string;
  id?: string;
  options?: SelectOption[];
  count?: number;
}

export type DateObj = {
  type?: string;
  start_date?: string;
  date_format?: string;
};

export type NorkiveRecordData = {
  id: string;
  date: DateObj;
  type: string;
  category: string;
  sub_type?: string[];
  tags?: string[];
  title: string;
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
  tableOfContents?: TableOfContentsEntry[] | [];
  blockMap?: ExtendedRecordMap | null;
};

export interface RecordPagingData extends NorkiveRecordData {
  prev?: NorkiveRecordData | null;
  next?: NorkiveRecordData | null;
  recommendRecords?: NorkiveRecordData[] | [];
}
