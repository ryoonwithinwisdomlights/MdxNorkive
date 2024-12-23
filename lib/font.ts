// import { BLOG } from "@/blog.config";

import { BLOG } from "../blog.config";

function CJK() {
  switch (BLOG.LANG.toLowerCase()) {
    case "ko":
    case "kr-KR":
      return "KR";
    case "en-US":
      return "EN";
    case "zh-cn":
    case "zh-sg":
      return "SC";
    case "ja":
    case "ja-jp":
      return "JP";
    default:
      return null;
  }
}

const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`];
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`];

export const fontFamilies = {
  sans: [...BLOG.FONT_SANS, ...fontSansCJK],
  serif: [...BLOG.FONT_SERIF, ...fontSerifCJK],
  noEmoji: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "sans-serif",
  ],
};
