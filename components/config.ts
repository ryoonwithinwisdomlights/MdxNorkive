const GITBOOKCONFIG = {
  INDEX_PAGE: "records",
  // Articles displayed on the document homepage, please make sure this path is included in your notice database

  AUTO_SORT: process.env.NEXT_PUBLIC_GITBOOK_AUTO_SORT || true,
  // Whether to automatically sort articles by category name; automatic grouping may disrupt the order of articles in your Notion

  // Menu
  MENU_CATEGORY: true, // Show categories
  MENU_TAG: true, // show label
  MENU_RECORDS: true, // show archive
  MENU_SIDEPROJECT: true, // show search
  MENU_SEARCH: true, // show search
  RECORD_DETAIL_CATEGORY: true, // Article display category
  RECORD_DETAIL_TAG: true, // Article display tags
};
export default GITBOOKCONFIG;
