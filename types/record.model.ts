import { NorkiveRecordData } from "./page.model";

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
  records?: NorkiveRecordData[];
  recordCount: number;
};

export type RecordCardInfoProps = {
  record: NorkiveRecordData;
  showPreview: boolean;
  showPageCover: boolean;
  showSummary: boolean;
};
export type CardProps = {
  record: NorkiveRecordData;
  className?: string;
};
