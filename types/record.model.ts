import { AllPosts } from "./provider.model";

interface AllRecordsArchiveItemProps {
  archiveTitle: string;
  archiveRecords: [];
}

interface AllRecordsPostCardProps {
  post: AllPosts;
  className: string;
}
interface AllRecordsPostListPageProps {
  pagenum?: number;
  posts?: AllPosts[];
  postCount: number;
}

interface BasicRecordCardInfoItemProps {
  post: AllPosts;
  showPreview: boolean;
  showPageCover: boolean;
  showSummary: boolean;
}
export type {
  AllRecordsArchiveItemProps,
  AllRecordsPostListPageProps,
  AllRecordsPostCardProps,
  BasicRecordCardInfoItemProps,
};
