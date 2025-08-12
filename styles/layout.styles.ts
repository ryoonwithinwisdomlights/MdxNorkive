import { cn } from "@/lib/utils/general";
export const basicDocsClass =
  "xl:w-[calc(100vw-600px)]  mt-[20px] w-full  flex flex-col justify-center items-center  pb-20   ";

export const generalIntroPageClass =
  "w-full  max-w-6xl mx-auto flex flex-col items-center p-10 gap-10";

type variationStyleProps = {
  isCompact?: boolean;
  isDefault?: boolean;
  isLarge?: boolean;
  isFeatured?: boolean;
  isHorizontal?: boolean;
  isVertical?: boolean;
  className?: string;
};

export const cardBaseClass = (
  background: "default" | "gradient" | "transparent",
  border: boolean,
  rounded: "none" | "sm" | "md" | "lg" | "xl" | "full",
  shadow: "none" | "sm" | "md" | "lg" | "xl",
  padding: "none" | "sm" | "md" | "lg" | "xl",
  hover: boolean,
  onClick: boolean,
  className: string
) =>
  cn(
    // 기본 스타일
    "transition-all duration-300",

    // 배경
    background === "default" && "bg-white dark:bg-neutral-800",
    background === "gradient" &&
      "bg-gradient-to-br from-white to-neutral-200 dark:from-neutral-900 dark:to-neutral-700",
    background === "transparent" && "bg-transparent",

    // 테두리
    border && "border border-neutral-200 dark:border-neutral-700",

    // 둥근 모서리
    rounded === "none" && "rounded-none",
    rounded === "sm" && "rounded-sm",
    rounded === "md" && "rounded-md",
    rounded === "lg" && "rounded-lg",
    rounded === "xl" && "rounded-xl",
    rounded === "full" && "rounded-full",

    // 그림자
    shadow === "none" && "shadow-none",
    shadow === "sm" && "shadow-sm",
    shadow === "md" && "shadow-md",
    shadow === "lg" && "shadow-lg",
    shadow === "xl" && "shadow-xl",

    // 패딩
    padding === "none" && "p-0",
    padding === "sm" && "p-2",
    padding === "md" && "p-4",
    padding === "lg" && "p-6",
    padding === "xl" && "p-8",

    // 호버 효과
    hover &&
      "hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-500",

    // 클릭 가능한 경우
    onClick && "cursor-pointer",

    className
  );

export const combinedCardClasses = ({
  isHorizontal,
  isVertical,
  isFeatured,
  className,
}: variationStyleProps) =>
  cn(
    isHorizontal && "flex flex-col md:flex-row md:flex-row-reverse gap-4",
    isVertical && "flex flex-col",
    isFeatured && "relative flex flex-col gap-4",
    className
  );

export const combinedSummaryClasses = ({ className }: { className?: string }) =>
  cn(
    "py-4 text-neutral-500 dark:text-neutral-200 text-sm font-light",
    className
  );

export const combinedMetaClasses = ({ className }: { className?: string }) =>
  cn(
    "flex flex-col items-start gap-2 text-neutral-500 dark:text-neutral-400 text-xs",
    className
  );

export const combinedTitleClasses = ({
  isCompact,
  isFeatured,
  isLarge,
  isDefault,
  className,
}: variationStyleProps) =>
  cn(
    "line-clamp-2 font-normal text-neutral-800 dark:text-white leading-tight  cursor-pointer hover:underline",
    isCompact && "text-lg",
    isDefault && "text-xl",
    isLarge && "text-2xl",
    isFeatured && "text-2xl lg:text-3xl font-bold",
    className
  );

export const combinedDescriptionClasses = ({
  isCompact,
  className,
}: variationStyleProps) =>
  cn(
    "text-neutral-600 dark:text-neutral-300 text-sm  line-clamp-3",
    isCompact && "line-clamp-2",
    className
  );

export const combinedImageContainerClasses = ({
  isHorizontal,
  isVertical,
  isFeatured,
  isCompact,
  isLarge,
  className,
}: variationStyleProps) =>
  cn(
    isHorizontal && "md:w-5/12 relative",
    isVertical && "h-48",
    isFeatured && "flex-1 relative flex items-center justify-center",
    isCompact ? "h-40" : "h-48",
    isLarge && "h-64",
    className
  );

export const combinedImageClasses = ({
  isHorizontal,
  isVertical,
  isFeatured,
  isCompact,
  className,
}: variationStyleProps) =>
  cn(
    "w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110",
    isHorizontal && "h-56",
    isVertical && "h-48",
    isFeatured && "h-56 w-full",
    isCompact ? "h-40 " : "h-48",
    className
  );

export const combinedContentContainerClasses = ({
  isHorizontal,
  isVertical,
  isFeatured,
  className,
}: variationStyleProps) =>
  cn(
    isHorizontal && "md:w-7/12 ",
    isVertical && "p-6",
    isFeatured && "flex-1",
    className
  );

export const combinedContentClasses = ({
  isCompact,
  isLarge,
  className,
}: variationStyleProps) =>
  cn(isCompact ? "p-4" : "p-6", isLarge && "p-8", className);
