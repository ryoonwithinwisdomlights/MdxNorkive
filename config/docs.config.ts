export const DOCS_CONFIG = {
  ENTIRE_DOCS_CARDS_PER_PAGE: 4,
  FEATURED_DOCS_CARDS_PER_PAGE: 6,
  LATEST_DOCS_CARDS_PER_PAGE: 3,
  DEFAULT_DOCS_CARDS_PER_PAGE: 6,
  TAG_SORT_BY_COUNT: true, // Whether the tags are sorted in descending order by the number of datas, with tags with more datas ranked first.
  IS_TAG_COLOR_DISTINGUISHED:
    process.env.NEXT_PUBLIC_IS_TAG_COLOR_DISTINGUISHED === "true" || true, //Whether to distinguish the color of tags with the same name
  DOCS_SHARE_SERVICE:
    process.env.NEXT_PUBLIC_DOCS_SHARE_SERVICES ||
    "email,twitter,facebook,linkedin,link", // Shared services, displayed in order, separated by commas
  // All supported sharing services: link (copy link), email (mail),facebook,twitter,linkedin

  DOCS_PER_PAGE: 12, // doc counts per page

  DOCS_SUBSTR_BASIC_NUMBER: 80,
  DOCS_SUBSTR_NAVBAR_NUMBER: 24,
  DOCS_ROOT_DIR_NAME: "all-docs",
  DOCS_ROOT_DIR_TEST: "TEST",
  DOCS_TYPE: {
    GENERALS: "generals",
    PORTFOLIOS: "portfolios",
    TECHS: "techs",
    SUBMENU_PAGES: "submenupages",
  },
};
