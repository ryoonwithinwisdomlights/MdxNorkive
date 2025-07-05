import { DateObj } from "./record.model";

export type OldNavItem = {
  icon: string;
  name: any;
  to?: string;
  href?: string;
  target?: string;
  show: boolean;
};

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
  id: string;
  title?: string;
  pageCoverThumbnail?: string;
  category?: string;
  tags?: any;
  summary?: string;
  slug?: string;
  pageIcon?: string;
  date: DateObj;
  lastEditedDate?: Date;
  type?: string;
  subMenus?: LeftSideBarNavItem[];
};

export const NorKiveMenuItem = ["Menu", "SubMenu", "SubMenuPage"];
