import { SelectOption } from "notion-types";
import { Dispatch, SetStateAction } from "react";
import { LeftSideBarNavItem, NavItem, OldNavItem } from "./layout.model";
import { BaseArchivePageBlock } from "./page.model";
import { SiteInfoModel } from "./siteconfig.model";

export interface EssentialNavInfo {
  siteInfo: SiteInfoModel;
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
  subTypeOptions?: [];
  oldNav: OldNavItem[];
  customMenu: NavItem[];
  notice: any;
  latestRecords: [];
  showTocButton: boolean;
  // currentRecordData: BaseArchivePageBlock | null;
  handleRouter: (page: BaseArchivePageBlock) => void;
  cleanCurrentRecordData: () => void;
}

export interface GlobalNotionData {
  notice: any;
  siteInfo: SiteInfoModel;
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
  subTypeOptions?: [];
  oldNav: OldNavItem[];
  customMenu: NavItem[];
  latestRecords: [];
  allArchive: BaseArchivePageBlock[];
}
export interface GeneralSiteSettingsProviderContext {
  onLoading: boolean;
  setOnLoading: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  allNavPagesForLeftSideBar: LeftSideBarNavItem[];
  filteredNavPages: LeftSideBarNavItem[];
  setFilteredNavPages?: Dispatch<SetStateAction<LeftSideBarNavItem[]>>;
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
