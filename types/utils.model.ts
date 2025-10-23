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
};
export type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

export type OptionItem = {
  id: number;
  title: string;
  option: any;
  isActive?: boolean; // 현재 선택된지 확인
};

export interface OptionCarouselProps {
  allOptions: OptionItem[];
  handleOptionTypeChange: (option: string) => void;
  className?: string;
  currentOption?: string;
  initString?: string;
}
