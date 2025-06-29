import { BLOG } from "@/blog.config";

export const ARCHIVE_PROPERTIES_TYPE_MAP = {
  [BLOG.NOTION_PROPERTY_NAME.type_record]: "Record",
  [BLOG.NOTION_PROPERTY_NAME.type_devproject]: "Project",
  [BLOG.NOTION_PROPERTY_NAME.type_engineering]: "Engineering",
  [BLOG.NOTION_PROPERTY_NAME.type_page]: "Page",
  [BLOG.NOTION_PROPERTY_NAME.type_notice]: "Notice",
  [BLOG.NOTION_PROPERTY_NAME.type_menu]: "Menu",
  [BLOG.NOTION_PROPERTY_NAME.type_sub_menu]: "SubMenu",
  [BLOG.NOTION_PROPERTY_NAME.type_sub_menu_page]: "SubMenuPage",
};
export const ARCHIVE_PROPERTIES_STATUS_MAP = {
  [BLOG.NOTION_PROPERTY_NAME.status_publish]: "Published",
  [BLOG.NOTION_PROPERTY_NAME.status_invisible]: "Invisible",
};

export const EXCLUDED_PAGE_TYPES = ["Menu", "SubMenu", "SubMenuPage", "Notice"];
export const AVAILABLE_PAGE_TYPES = BLOG.NOTION_PROPERTY_NAME.type_able_arr;

export const INCLUDED_MENU_TYPES = ["Menu", "SubMenu", "SubMenuPage"];

export const GENERAL_TYPE_MENU = ["Menu", "SubMenu"];
export const PAGE_TYPE_MENU = ["Page", "SubMenuPage"];
