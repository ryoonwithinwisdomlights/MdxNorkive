/*----------------------------------------------------------------------
 * internal type for Database Page
 * ----------------------------------------------------------------------/
 */

import { ReactNode } from "react";

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

export type TOCItemType = {
  title: ReactNode;
  url: string;
  depth: number;
};
