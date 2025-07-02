export const ARCHIVE_CONFIG = {
  AUTO_SORT: process.env.NEXT_PUBLIC_AUTO_SORT || true, // Whether to automatically sort records by category name; automatic grouping may disrupt the order of Archives in your Notion
  RECORD_DETAIL_CATEGORY: true, // Archive display category
  RECORD_DETAIL_TAG: true, // Archive display tags
};
