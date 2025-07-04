import { BaseArchivePageBlock } from "./page.model";

export type BasicRecordPageProps = {
  type: string;
  recordList?: BaseArchivePageBlock[];
};

export type AllRecordsProps = {
  title: string;
  recordList: BaseArchivePageBlock[];
};

export type AllRecordsListProps = {
  pagenum?: number;
  records?: BaseArchivePageBlock[];
  recordCount: number;
};

export type RecordCardInfoProps = {
  record: BaseArchivePageBlock;
  showPreview: boolean;
  showPageCover: boolean;
  showSummary: boolean;
};
export type CardProps = {
  record: BaseArchivePageBlock;
  className?: string;
};
