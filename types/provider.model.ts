import { Dispatch, SetStateAction } from "react";
import { MenuItem, RecordItem } from "@/app/api/types";
import { PageData } from "fumadocs-core/source";
import { SiteInfoModel } from "./index";

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
  data: RecordItem;
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
  handleChangeDarkMode: (boolean) => void;
  locale: any;
  updateLocale: Dispatch<SetStateAction<string>>;
  lang: string;
  changeLang: (text: string) => void;
  changeOppositeLang: () => void;
  setting: boolean;
  handleSettings: () => void;
}

export interface GlobalNavInfoProps {
  recordList: RecordItem[];
  serializedAllPages: SerializedPage[];
  menuList: MenuItem[];
}
