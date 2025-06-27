export type GlobalData = {
  pageId: string;
  from?: string;
  type?: string;
  slice?: number;
};

export type GetPostBlockData = {
  pageId: string;
  from?: string;
  type?: string;
  slice?: number;
};

export type GetSiteInfo = {
  collection?: any;
  block?: any;
  NOTION_CONFIG?: string;
};

export type tocItem = {
  id: string;
  type?: string;
  text?: string;
  indentLevel?: number;
};
