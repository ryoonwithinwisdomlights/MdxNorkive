import { SelectOption } from "notion-types";
import { Dispatch, SetStateAction } from "react";
import { LeftSideBarNavItem, NavItem, OldNavItem } from "./layout.model";
import { SiteInfoModel } from "./siteconfig.model";
import { NorkiveRecordData, RecordPagingData } from "./page.model";

export interface EssentialNavInfo {
  siteInfo: SiteInfoModel;
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
  subTypeOptions?: [];
  // className?: string;
  oldNav: OldNavItem[];
  customMenu: NavItem[];
  notice: any;
  latestRecords: [];
  showTocButton: boolean;
  // currentRecordData: NorkiveRecordData | null;
  handleRouter: (record: RecordPagingData) => void;
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
  allArchive: NorkiveRecordData[];
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
}
