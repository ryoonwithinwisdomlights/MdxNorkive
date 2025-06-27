import { Dispatch, SetStateAction } from "react";
import { SiteInfoModel } from "@/types/siteconfig.model";

// interface InitGlobalNotionData {
//   siteInfo: SiteInfoModel;
//   categoryOptions?: [];
//   allNavPagesForGitBook: AllNavPages[];
//   subTypeOptions?: [];
//   tagOptions?: [];
//   className?: string;
//   customNav: CustomNavList[];
//   customMenu: any[];
//   notice: any;
//   post: any;
//   allPosts: AllPosts[];
//   allPages: AllPages[];
//   allPageIds: AllPageIds[];
//   allNavPages: AllNavPages[];
//   latestPosts: [];
// }
export interface NorKiveThemeProviderContext {
  onLoading: boolean;
  setOnLoading: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  siteInfo?: SiteInfoModel;
  isDarkMode: boolean;
  handleChangeDarkMode: (boolean) => void;
  // theme?: string | null;
  // setTheme?: Dispatch<SetStateAction<"light" | "dark" | null>>;
}
