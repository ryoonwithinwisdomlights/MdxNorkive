import { CollectionPropertySchema, SelectOption } from "notion-types";
import { AllPosts } from "./provider.model";

interface RecommendPost {
  id: string;
  type: string;
  tags?: string[];
}

interface BasicRecordPageType {
  pageType: string;
  recordList?: any[];
}

export type { RecommendPost, BasicRecordPageType };

export interface TagItem {
  color: string;
  name?: string;
  id?: string;
  options?: SelectOption[];
  count?: number;
}
export interface CategoryItem extends CollectionPropertySchema {
  color: string;
  id?: string;
  count?: number;
}

export type NavItem = {
  icon?: string;
  name?: string;
  href?: string;
  target?: string;
  show?: boolean;
  slug?: string;
  type?: string;
  title?: string;
  subMenus?: any[];
};

export type LeftSideBarNavItem = {
  id?: string;
  title?: string;
  pageCoverThumbnail?: string;
  category?: string;
  tags?: any;
  summary?: string;
  slug?: string;
  pageIcon?: string;
  lastEditedDate?: Date;
  type?: string;
  subMenus?: any[];
};

export const NorKiveMenuItem = ["Menu", "SubMenu", "SubMenuPage"];

// export type PageSchema ={
//       id: string;
//     "date": {
//         "start_date": "2025-06-27",
//         "date_format": "relative"
//     },
//     "type": string;
//     "category": string;
//     "sub_type": [
//         "Record"
//     ],
//     "tags": string[],
// }

export type dateObj = {
  start_date?: string;
  date_format?: string;
};
export type CollectionData = {
  id: string;
  date?: dateObj;
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
  tagItems: TagItem[];
  summary?: any;
  slug: string;
  results?: any;
  password?: string;
};
