export interface WrapperProps {
  names: string;
  urls: string;
}

export type LazyImageProps = {
  priority?: boolean;
  id?: string;
  src: string;
  alt?: string;
  placeholderSrc?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  onLoad?: () => void;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  sizes?: string;
  quality?: number;
};
export type ImgProps = {
  ref: React.RefObject<HTMLImageElement | null>;
  src: string;
  alt: string;
  onLoad: () => void;
  id?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};
export type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};
