import { LocaleDict } from "@/types/locale.model";
import { TransferedDataProps } from "@/types/docdata.model";

export type CardInfoDivProps = {
  data: TransferedDataProps;
  showPreview: boolean;

  showSummary: boolean;
};

export interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "gradient" | "transparent";
}
export interface ImageCardProps {
  data: TransferedDataProps;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "horizontal" | "vertical" | "featured";
  showMeta?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  locale?: LocaleDict;
  lang: string;
  // 슬라이더 관련 props
  isSlider?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  currentIndex?: number;
  totalSlides?: number;
  onSlideChange?: (index: number) => void;
  priority?: boolean;
}

export interface ContentCardProps {
  data: TransferedDataProps;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact" | "featured";
  showMeta?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  locale?: LocaleDict;
  lang: string;
  hover?: boolean;
  border?: boolean;
  background?: "default" | "gradient" | "transparent";
}
export interface GridCardProps {
  title: string;
  type?: string;
  subType?: string;
  author?: string;
  description?: string;
  date?: string;
  distanceFromToday?: string;
  tags?: string[];
  imageUrl?: string;
  imageAlt?: string;
  url: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact" | "large";
  showImage?: boolean;
  showMeta?: boolean;
  showTags?: boolean;
  showDescription?: boolean;
  locale?: LocaleDict;
}
