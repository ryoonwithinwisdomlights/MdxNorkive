export const RECORD_CONFIG = {
  ENTIRE_RECORDS_CARDS_PER_PAGE: 4,
  FEATURED_RECORDS_CARDS_PER_PAGE: 6,
  LATEST_RECORDS_CARDS_PER_PAGE: 3,
  DEFAULT_RECORDS_CARDS_PER_PAGE: 6,
  TAG_SORT_BY_COUNT: true, // Whether the tags are sorted in descending order by the number of datas, with tags with more datas ranked first.
  IS_TAG_COLOR_DISTINGUISHED:
    process.env.NEXT_PUBLIC_IS_TAG_COLOR_DISTINGUISHED === "true" || true, //Whether to distinguish the color of tags with the same name
  RECORD_SHARE_SERVICE:
    process.env.NEXT_PUBLIC_RECORD_SHARE_SERVICES ||
    "email,twitter,facebook,linkedin,link", // Shared services, displayed in order, separated by commas
  // All supported sharing services: link (copy link), email (mail),facebook,twitter,linkedin

  RECORD_PER_PAGE: 12, // record counts per page

  RECORD_SUBSTR_BASIC_NUMBER: 80,
  RECORD_SUBSTR_NAVBAR_NUMBER: 24,
};
