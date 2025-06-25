import { Dispatch, SetStateAction } from "react";

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
  allNavPagesForGitBook: AllNavPages[];
  subTypeOptions?: [];
  tagOptions?: [];
  className?: string;
  customNav: CustomNavList[];
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
  onLoading: boolean;
  setOnLoading: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  locale: any;
  updateLocale: Dispatch<SetStateAction<string>>;
  isDarkMode: boolean;
  updateDarkMode: Dispatch<SetStateAction<boolean>>;
  siteInfo: SiteInfo;
  categoryOptions?: [];
  subTypeOptions?: [];
  tagOptions?: [];
  filteredNavPages: AllNavPages[];
  setFilteredNavPages?: Dispatch<SetStateAction<AllNavPages[]>>;
  allNavPagesForGitBook?: AllNavPages[];
  className?: string;
  lang: string;
  customNav: CustomNavList[];
  customMenu: any[];
  showTocButton?: boolean;
  notice: any;
  post: any;
  latestPosts: [];
  handleChangeDarkMode: (boolean) => void;
  changeLang: (text: string) => void;
  changeOppositeLang: () => void;
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
