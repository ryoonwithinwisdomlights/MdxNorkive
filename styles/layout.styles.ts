import { cn } from "@/lib/utils/general";
export const basicDocsClass =
  "xl:w-[calc(100vw-600px)]  mt-[20px] w-full  flex flex-col justify-center items-center  pb-20   ";

export const generalIntroPageClass =
  "w-full  max-w-6xl mx-auto flex flex-col items-center p-10 gap-10";

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
