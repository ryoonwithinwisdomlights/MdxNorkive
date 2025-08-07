import { Dispatch, SetStateAction } from "react";
import { LeftSideBarNavItem, NavItem, OldNavItem } from "./layout.model";

import { MenuItem } from "@/app/api/types";
import { SiteInfoModel } from "./index";
import { BaseArchivePageBlock } from "./record.model";

export interface EssentialMenuInfo {
  menuData: MenuItem[];
}

export interface EssentialNavInfo {
  siteInfo: SiteInfoModel;
  categoryOptions?: any[];
  tagOptions?: any[];
  subTypeOptions?: [];

  notice: any;
  latestRecords: [];
  allPages: BaseArchivePageBlock[];
  handleRouter: (page: BaseArchivePageBlock) => void;
  cleanCurrentRecordData: () => void;
  allPagesForLeftNavBar: LeftSideBarNavItem[];
  filteredNavPages: LeftSideBarNavItem[];
  setFilteredNavPages?: Dispatch<SetStateAction<LeftSideBarNavItem[]>>;
}

export interface GlobalNotionData {
  notice: any;
  siteInfo: SiteInfoModel;
  categoryOptions?: any[];
  tagOptions?: any[];
  subTypeOptions?: [];
  oldNav?: OldNavItem[];
  customMenu: NavItem[];
  latestRecords?: [];
  allPagesForLeftNavBar: LeftSideBarNavItem[];
  allPages?: BaseArchivePageBlock[];
}
export interface GeneralSiteSettingsProviderContext {
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
