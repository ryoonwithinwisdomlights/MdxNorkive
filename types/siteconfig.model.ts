import type * as types from "@/types";

export interface SiteInfoModel {
  title: string;
  description?: string;
  home_banner_image?: string;
  icon?: any;
  pageCover?: any;
  avatar?: string;
  link?: string;
  author?: string;
}
// title: string;
// description?: string;
// home_banner_image?: string;
// icon?: any;
// pageCover?: any;
// avatar?: string;
// link?: string;
// author?: string;
// export interface GeneralSiteInfoModel {
//   defaultPageIcon?: string | null;
//   defaultTitle: string;
//   defaultPageCover?: string | null;
//   defaultDescription: string;
//   defaultPageCoverPosition?: number | null;
// }
export interface SiteConfigModel {
  app_name: string;
  since?: string | number;
  notion_database_id: string;
  notion_spaceid?: string | null;
  notion_active_user: string;
  notion_access_token: string;
  notion_host: string;
  link: string;
  dev_link: string;
  author?: string;
  bio: string;
  keywords: string;
  blog_favicon?: string;
  language: string;
  email?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
  newsletter?: string;

  appearance?: string;
  appearance_dark_time?: number[];
  custom_menu: boolean;

  image_compress_width?: number;
  image_zoom_in_width?: number;
  image_lazy_load_placeholder?: string;
  image_url_type?: string;
  image_shadow?: boolean;
  random_image_url?: string;
  random_image_replace_text?: string;

  can_copy?: string;
  right_click_context_menu?: string;
  isPreviewImageSupportEnabled?: boolean;
  isTweetEmbedSupportEnabled?: boolean;
  isRedisEnabled?: boolean;
  includeNotionIdInUrls?: boolean;
  pageUrlOverrides?: types.PageUrlOverridesMap | null;
  pageUrlAdditions?: types.PageUrlOverridesMap | null;

  navigationStyle: string;
  navigationLinks?: Array<NavigationLink>;
  isSearchEnabled?: boolean;

  defaultPageIcon?: string | null;
  defaultTitle: string;
  defaultPageCover?: string | null;
  defaultDescription: string;
  defaultPageCoverPosition?: number | null;

  background_light?: string;
  background_dark?: string;

  sub_path: string;
  archive_share_bar_enable?: boolean;
  archive_share_service?: string;
  archive_url_prefix?: string;
  archive_list_stye?: string;
  archive_recommend_count?: number;
  archive_per_page?: number;
  archive_sort_by?: string;
  archive_waiting_time_for_404?: string;

  preview_category_count?: number;
  preview_tag_count?: number;
  archive_disable_gallery_click?: boolean;

  tag_sort_by_count: boolean;
  is_tag_color_distinguised?: boolean;
  debug?: boolean;
  enable_cache: string | boolean;
  isProd: boolean;
  bundle_analyzer?: boolean;
}

export interface NavigationLink {
  title: string;
  pageId?: string;
  url?: string;
}
export interface notionPropertyStatusModel {
  password?: string;
  type: string;
  type_able_arr: string[];
  type_record: string;
  type_page: string;
  type_notice: string;
  type_menu: string;
  type_sub_menu: string;
  type_sub_menu_page: string;
  type_project: string;
  type_engineering: string;
  title: string;
  status: string;
  status_publish: string;
  status_invisible: string;
  summary: string;
  slug: string;
  category: string;
  date: string;
  tags: string;
  icon: string;
}
export interface externalLibModel {
  font_style?: string;
  font_url?: string[];
  font_sans?: string[];
  font_serif?: string[];
  font_awesome?: string;
  prism_js_path?: string;
  prism_js_auto_loader?: string;
  prism_theme_prefix_path?: string;
  prism_theme_switch?: boolean;
  prism_theme_light_path?: string;
  prism_theme_dark_path?: string;
  code_mac_bar?: boolean;
  code_line_numbers?: boolean;
  code_collapse?: boolean;
  code_collapse_expand_default?: boolean;
  memaid_cdn?: string;
  analytics_google_id?: boolean;

  analytics_busuanzi_enable?: boolean;
  seo_google_verification?: string;
  animate_css_url?: string;
}
