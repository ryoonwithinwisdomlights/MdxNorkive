import { SelectOption } from "notion-types";
import { LeftSideBarNavItem, NavItem, OldNavItem } from "./layout.model";
import { NorkiveRecordData } from "./page.model";
import { SiteInfoModel } from "./siteconfig.model";

export type BasicRecordPageProps = {
  type: string;
  recordList?: NorkiveRecordData[];
};

export type AllRecordsProps = {
  title: string;
  recordList: NorkiveRecordData[];
};

export type AllRecordsListProps = {
  pagenum?: number;
  posts?: NorkiveRecordData[];
  postCount: number;
};

export type RecordCardInfoProps = {
  post: NorkiveRecordData;
  showPreview: boolean;
  showPageCover: boolean;
  showSummary: boolean;
};
export type CardProps = {
  post: NorkiveRecordData;
  className?: string;
};

export interface InitGlobalNotionData {
  siteInfo: SiteInfoModel;
  categoryOptions?: SelectOption[];
  tagOptions?: SelectOption[];
  subTypeOptions?: [];
  allNavPagesForLeftSiedBar: LeftSideBarNavItem[];
  className?: string;
  oldNav: OldNavItem[];
  customMenu: NavItem[];
  notice: any;
  post: any;
  allArchive: NorkiveRecordData[];
  allPages: NorkiveRecordData[];
  allPageIds: NorkiveRecordData[];
  latestPosts: [];
}
