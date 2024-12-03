import { Dispatch, SetStateAction } from "react";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SiteInfo {
  title: any;
  description: any;
  pageCover: any;
  icon: any;
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

interface CustomNav {
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
  customNav: CustomNav[];
  customMenu: any[];
  notice: any;
  post: any;
  allPages: AllPages[];
  allNavPages: AllNavPages[];
  latestPosts: [];
}
interface GlobalValueInferface {
  onLoading: boolean;
  setOnLoading: Dispatch<SetStateAction<boolean>>;
  locale: any;
  updateLocale: Dispatch<SetStateAction<string>>;
  isDarkMode: boolean;
  updateDarkMode: Dispatch<SetStateAction<boolean>>;
  theme?: string;
  setTheme?: Dispatch<SetStateAction<string>>;
  siteInfo: SiteInfo;
  categoryOptions?: [];
  subTypeOptions?: [];
  tagOptions?: [];
  filteredNavPages: AllNavPages[];
  setFilteredNavPages?: Dispatch<SetStateAction<AllNavPages[]>>;
  allNavPagesForGitBook?: AllNavPages[];
  className?: string;
  customNav: CustomNav[];
  customMenu: any[];
  allPages: AllPages[];
  allNavPages: AllNavPages[];
  showTocButton?: boolean;
  notice: any;
  post: any;
  latestPosts: [];
}
export type {
  ChangeFrequency,
  InitGlobalNotionData,
  CustomNav,
  AllNavPages,
  AllPages,
  SiteInfo,
  GlobalValueInferface,
};
