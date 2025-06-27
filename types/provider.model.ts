import { Dispatch, SetStateAction } from "react";
import { SiteInfoModel } from "./siteconfig.model";
interface SiteInfo {
  title: any;
  description: any;
  pageCover: any;
  icon: any;
}

interface AllPageIds {
  id: any;
  type: any;
  status: any;
  category?: any;
  publishDate?: any;
  publishDay?: string;
  lastEditedDate?: Date;
  lastEditedDay?: string;
  fullWidth?: any;
  pageIcon?: any;
  pageCover?: any;
  pageCoverThumbnail?: any;
  password?: any;
  slug?: any;
}

interface tagItemsProps {
  name: string;
  color: string;
}
interface AllPosts {
  id: any;
  type: any;
  title: any;
  status: any;
  category: any;
  publishDate: any;
  publishDay: string;
  lastEditedDate: Date;
  lastEditedDay: string;
  date: { start_date: string };
  fullWidth: any;
  pageIcon: any;
  pageCover: any;
  pageCoverThumbnail: any;
  password: any;
  summary?: any;
  slug: any;
  results?: any;
  tagItems?: tagItemsProps[];
}

interface AllPages {
  id: any;
  type: any;
  status: any;
  category: any;
  publishDate: any;
  publishDay: string;
  lastEditedDate: Date;
  lastEditedDay: string;
  fullWidth: any;
  pageIcon: any;
  pageCover: any;
  pageCoverThumbnail: any;
  password: any;
  slug: any;
}
interface AllNavPages {
  id: any;
  title: any;
  pageCoverThumbnail: any;
  category: any;
  tags: any;
  summary: any;
  slug: any;
  pageIcon: any;
  lastEditedDate: any;
  type: any;
}

interface CustomNavList {
  icon: string;
  name: any;
  to: string;
  target?: string;
  show: boolean;
}

interface InitGlobalNotionData {
  siteInfo: SiteInfo;
  categoryOptions?: [];
  allNavPagesForLeftSiedBar: AllNavPages[];
  subTypeOptions?: [];
  tagOptions?: [];
  className?: string;
  oldNav: CustomNavList[];
  customMenu: any[];
  notice: any;
  post: any;
  allPosts: AllPosts[];
  allPages: AllPages[];
  allPageIds: AllPageIds[];
  allNavPages: AllNavPages[];
  latestPosts: [];
}
interface GlobalValueInferface {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;

  siteInfo: SiteInfo;
  categoryOptions?: [];
  subTypeOptions?: [];
  tagOptions?: [];
  filteredNavPages: AllNavPages[];
  setFilteredNavPages?: Dispatch<SetStateAction<AllNavPages[]>>;
  allNavPagesForLeftSiedBar?: AllNavPages[];
  className?: string;
  oldNav: CustomNavList[];
  customMenu: any[];
  notice: any;
  post: any;
  latestPosts: [];
}

type GbP = {
  from?: string;
};

export type {
  AllPageIds,
  AllPosts,
  InitGlobalNotionData,
  CustomNavList,
  AllNavPages,
  AllPages,
  SiteInfo,
  GlobalValueInferface,
  GbP,
};

export interface NorKiveThemeProviderContext {
  onLoading: boolean;
  setOnLoading: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  siteInfo?: SiteInfoModel;
  isDarkMode: boolean;
  pageNavVisible: boolean;
  changePageNavVisible: () => void;
  handleChangeDarkMode: (boolean) => void;
  locale: any;
  updateLocale: Dispatch<SetStateAction<string>>;
  changeLang: (text: string) => void;
  changeOppositeLang: () => void;
  lang: string;
  // theme?: string | null;
  // setTheme?: Dispatch<SetStateAction<"light" | "dark" | null>>;
}
