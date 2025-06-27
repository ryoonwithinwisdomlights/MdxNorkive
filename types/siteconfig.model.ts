import type * as types from "@/types/types";
export interface BlogConfigModel {
  rootNotionPageId: string;
  rootNotionSpaceId?: string | null;
  appearance?: string;
  appearance_dark_time?: number[];
  notion_host: string;
  name: string;
  domain: string;
  author: string;
  title?: string;
  description?: string;
  language?: string;
  since?: number;
  email?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
  newsletter?: string;
  youtube?: string;
  zhihu?: string;
  mastodon?: string;

  defaultPageIcon?: string | null;
  defaultPageCover?: string | null;
  defaultPageCoverPosition?: number | null;

  isPreviewImageSupportEnabled?: boolean;
  isTweetEmbedSupportEnabled?: boolean;
  isRedisEnabled?: boolean;
  isSearchEnabled?: boolean;

  includeNotionIdInUrls?: boolean;
  pageUrlOverrides?: types.PageUrlOverridesMap | null;
  pageUrlAdditions?: types.PageUrlOverridesMap | null;

  navigationStyle?: types.NavigationStyle;
  navigationLinks?: Array<NavigationLink>;
  is_tag_color_distinguised?: boolean;
  tag_sort_by_count?: boolean;
  bio?: string;
  random_image_url?: string;
  random_image_replace_text?: string;
  img_lazy_load_placeholder: string;
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
  background_light?: string;
  background_dark?: string;
}

export interface SiteInfoModel {
  title: string;
  description?: string;
  home_banner_image?: string;
  avatar?: string;
  link?: string;
  author?: string;
}
export interface NavigationLink {
  title: string;
  pageId?: string;
  url?: string;
}
