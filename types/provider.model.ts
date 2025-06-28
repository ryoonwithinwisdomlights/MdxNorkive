import { Dispatch, SetStateAction } from "react";
import { LeftSideBarNavItem, NavItem, OldNavItem } from "./layout.model";
import { SiteInfoModel } from "./siteconfig.model";
import { SelectOption } from "notion-types";

export interface GlobalValueInferface {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  siteInfo: SiteInfoModel;
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
  subTypeOptions?: [];
  filteredNavPages: LeftSideBarNavItem[];
  setFilteredNavPages?: Dispatch<SetStateAction<LeftSideBarNavItem[]>>;
  allNavPagesForLeftSiedBar?: LeftSideBarNavItem[];
  className?: string;
  oldNav: OldNavItem[];
  customMenu: NavItem[];
  notice: any;
  post: any;
  latestPosts: [];
}

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
}
