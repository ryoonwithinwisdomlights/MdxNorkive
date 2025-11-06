import { Dispatch, SetStateAction } from "react";
import {
  MenuItem,
  DocFrontMatter,
  TOCItemType,
  SiteInfoModel,
  LocaleDict,
} from "@/types";

export type SerializedPage = {
  file: {
    dirname: string;
    name: string;
    ext: string;
    path: string;
    flattenedPath: string;
  };
  absolutePath: string;
  path: string;
  url: string;
  slugs: string[];
  data: DocFrontMatter;
  locale: string | undefined;
};
export interface GeneralSiteSettingsProps {
  onLoading: boolean;
  isMobileTopNavOpen: boolean;
  toggleMobileTopNavOpen: () => void;
  setOnLoading: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  siteInfo?: SiteInfoModel;
  isDarkMode: boolean;
  pageNavVisible: boolean;
  handleLeftNavVisible: () => void;
  tocVisible: boolean;
  handleTOCVisible: () => void;
  handleChangeDarkMode: (newStatus?: boolean) => void;
  locale: LocaleDict;
  updateLocale: Dispatch<SetStateAction<LocaleDict>>;
  lang: string;
  changeLang: (text: string) => void;
  changeOppositeLang: () => void;
  setting: boolean;
  handleSettings: () => void;
  rightSideInfoBarMode: "info" | "author";
  handleChangeRightSideInfoBarMode: (newMode: "info" | "author") => void;
  tocContent: TOCItemType[];
  handleSetTocContent: (toc: TOCItemType[]) => void;
  isMobileLeftSidebarOpen: boolean;
  toggleMobileLeftSidebarOpen: () => void;
}

export interface GlobalNavInfoProps {
  docsList?: DocFrontMatter[];
  serializedAllPages: SerializedPage[];
  menuList: MenuItem[];
}
