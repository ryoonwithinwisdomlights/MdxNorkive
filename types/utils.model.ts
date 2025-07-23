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
};
export type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};
