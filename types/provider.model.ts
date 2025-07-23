import { SelectOption } from "notion-types";
import { Dispatch, SetStateAction } from "react";
import { LeftSideBarNavItem, NavItem, OldNavItem } from "./layout.model";

import { BaseArchivePageBlock } from "./record.model";
import { SiteInfoModel } from "./index";
import { MenuItem } from "@/app/api/types";

export interface EssentialMenuInfo {
  menuData: MenuItem[];
}

export interface EssentialNavInfo {
  siteInfo: SiteInfoModel;
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
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
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
  subTypeOptions?: [];
  oldNav?: OldNavItem[];
  customMenu: NavItem[];
  latestRecords?: [];
  allPagesForLeftNavBar: LeftSideBarNavItem[];
  allPages?: BaseArchivePageBlock[];
}
export interface GeneralSiteSettingsProviderContext {
  onLoading: boolean;
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
