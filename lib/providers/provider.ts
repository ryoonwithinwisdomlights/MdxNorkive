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

interface CustomNavObj {
  id: string;
  icon: "fa-solid fa-mug-hot";
  date: {
    start_date: "2023-03-23";
  };
  type: "Menu";
  slug: "/";
  summary: "Normal menu Jump to the specified web page";
  title: "_";
  status: "Published";
  category: "";
  publishDate: 1679529600000;
  publishDay: "Mar 23, 2023";
  lastEditedDate: "2024-11-22T06:24:43.694Z";
  lastEditedDay: "Nov 22, 2024";
  fullWidth: false;
  pageIcon: "🍋";
  pageCover: "";
  pageCoverThumbnail: "";
  tagItems: [];
  to: "/";
  name: "_";
  password: "";
  show: true;
  subMenus: [
    {
      id: "1341eb5c-0337-8112-ba09-cb77aa3db04e";
      icon: "fa-solid fa-address-card";
      date: {
        start_date: "2023-03-23";
      };
      type: "SubMenu";
      slug: "/ryoon";
      summary: "메뉴 슬러그를 비워두거나 다음 하위 메뉴에 사용되는 #을 입력하세요.";
      title: "Ryoon";
      status: "Published";
      category: "";
      publishDate: 1679529600000;
      publishDay: "Mar 23, 2023";
      lastEditedDate: "2024-11-04T10:06:29.008Z";
      lastEditedDay: "Nov 4, 2024";
      fullWidth: false;
      pageIcon: "🍹";
      pageCover: "";
      pageCoverThumbnail: "";
      tagItems: [];
      to: "/ryoon";
      name: "Ryoon";
      password: "";
      show: true;
    },
    {
      id: "1341eb5c-0337-81be-960b-c573287179cc";
      icon: "fa-brands fa-github";
      date: {
        start_date: "2023-11-30";
      };
      type: "SubMenu";
      slug: "https://github.com/ryoon-with-wisdomtrees";
      title: "Github";
      status: "Published";
      category: "";
      publishDate: 1701302400000;
      publishDay: "Nov 30, 2023";
      lastEditedDate: "2024-11-04T10:06:29.005Z";
      lastEditedDay: "Nov 4, 2024";
      fullWidth: false;
      pageIcon: "🍹";
      pageCover: "";
      pageCoverThumbnail: "";
      tagItems: [];
      to: "https://github.com/ryoon-with-wisdomtrees";
      name: "Github";
      password: "";
      show: true;
      target: "_blank";
    },
    {
      id: "1341eb5c-0337-81dd-8fef-cd5d6ffc2834";
      icon: "fa-solid fa-hand-point-right";
      date: {
        start_date: "2021-07-02";
      };
      type: "SubMenu";
      slug: "/about";
      title: "more Ryoon";
      status: "Published";
      category: "";
      publishDate: 1625184000000;
      publishDay: "Jul 2, 2021";
      lastEditedDate: "2024-11-04T10:06:28.994Z";
      lastEditedDay: "Nov 4, 2024";
      fullWidth: false;
      pageIcon: "🍹";
      pageCover: "";
      pageCoverThumbnail: "";
      tagItems: [];
      to: "/about";
      name: "more Ryoon";
      password: "";
      show: true;
    },
    {
      id: "1341eb5c-0337-819c-95a5-d39b77531f36";
      icon: "fa-solid fa-stamp";
      date: {
        start_date: "2023-12-01";
      };
      type: "SubMenu";
      slug: "/guest-book";
      title: "Guest Book";
      status: "Published";
      category: "";
      publishDate: 1701388800000;
      publishDay: "Dec 1, 2023";
      lastEditedDate: "2024-11-04T10:06:29.005Z";
      lastEditedDay: "Nov 4, 2024";
      fullWidth: false;
      pageIcon: "🍹";
      pageCover: "";
      pageCoverThumbnail: "";
      tagItems: [];
      to: "/guest-book";
      name: "Guest Book";
      password: "";
      show: true;
    },
  ];
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
  customNav: CustomNavList[];
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
  CustomNavList,
  AllNavPages,
  AllPages,
  SiteInfo,
  GlobalValueInferface,
};
