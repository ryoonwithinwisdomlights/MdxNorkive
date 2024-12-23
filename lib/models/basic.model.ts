import { ReactNode } from "react";

export interface ChildrenProp {
  children: React.ReactNode;
}
export type ProviderProps = ChildrenProp;
export type LayoutProps = ChildrenProp;
export type TemplateProps = ChildrenProp;
export type ClassNameProp = {
  className: string;
};

export type PageParams = Promise<{ [key: string]: string }>;
export type PageSearchParams = Promise<{
  [key: string]: number | undefined;
}>;
export type TotalPageParams = {
  params: PageParams;
  searchParams: PageSearchParams;
};

export type LazyImageProps = {
  priority?: any;
  id?: any;
  src: any;
  alt?: any;
  placeholderSrc?: string;
  className?: any;
  width?: any;
  height?: any;
  title?: any;
  onLoad?: any;
  style?: any;
};

export type ImgProps = {
  ref: React.RefObject<HTMLImageElement>;
  src: string;
  alt: string;
  onLoad: () => void;
  id?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
};

export type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};
