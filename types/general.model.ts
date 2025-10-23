export type NavigationStyle = "default" | "custom";
export interface Site {
  name: string;
  link?: string;
  domain?: string;
  rootNotionPageId: string;
  rootNotionSpaceId: string | null;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;
}

export interface SiteInfoModel {
  title: string;
  description?: string;
  home_banner_image?: string;
  icon?: string | undefined;
  pageCover?: string | undefined;
  avatar?: string;
  link?: string;
  author?: string;
}
