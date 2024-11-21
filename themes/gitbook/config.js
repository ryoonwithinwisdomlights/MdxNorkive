const CONFIG = {
  INDEX_PAGE: 'archive', // Articles displayed on the document homepage, please make sure this path is included in your notice database

  AUTO_SORT: process.env.NEXT_PUBLIC_GITBOOK_AUTO_SORT || true,
  // 카테고리 이름별로 기사를 자동으로 정렬할지 여부, 자동 그룹화는 Notion의 기사 순서를 방해할 수 있습니다.

  // 메뉴
  MENU_CATEGORY: true, // Show categories
  MENU_TAG: true, // show label
  MENU_ARCHIVE: true, // show archive
  MENU_SEARCH: true, // show search
  MENU_WRITING: true, // show search
  MENU_SIDEPROJECT: true, // show search
  MENU_INSPIRATION: true, // show search
  MENU_AGIVEAWAYLOG: true, // show search
  // Widget
  WIDGET_REVOLVER_MAPS: process.env.NEXT_PUBLIC_WIDGET_REVOLVER_MAPS || 'false', // Map plugin
  WIDGET_TO_TOP: true // Jump back to top
}
export default CONFIG
