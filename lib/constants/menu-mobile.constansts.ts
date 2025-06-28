export const MENU_MOBILE = {
  INDEX_PAGE: "archive",
  // Articles displayed on the document homepage, please make sure this path is included in your notice database
  AUTO_SORT: process.env.NEXT_PUBLIC_AUTO_SORT || true,
  // Whether to automatically sort articles by category name; automatic grouping may disrupt the order of articles in your Notion
  // Menu
  MENU_CATEGORY: true, // Show categories
  MENU_TAG: true, // show label
  MENU_RECORDS: true, // show archive
  MENU_DEVPROJECT: true, // show devproject
  MENU_ENGINEERING: true, // show engineering
  MENU_SEARCH: true, // show search
  RECORD_DETAIL_CATEGORY: true, // Article display category
  RECORD_DETAIL_TAG: true, // Article display tags
};
