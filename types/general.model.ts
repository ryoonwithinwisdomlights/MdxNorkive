import { type PageMap } from "notion-types";

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
  icon?: any;
  pageCover?: any;
  avatar?: string;
  link?: string;
  author?: string;
}

export type ConfirmModalProps = {
  children: React.ReactNode;
  onConfirm: () => void;
};

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}
export interface SiteMap {
  site: Site;
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
}
