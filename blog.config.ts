import { DOCS_CONFIG } from "@/config/docs.config";
import { FONT_CONFIG } from "@/config/font.config";
import { CONTACT_CONFIG } from "@/config/contact.config";
import { IMAGE_CONFIG } from "@/config/image.config";
import { ANALYTICS_CONFIG } from "@/config/analytics.config";
import { DEV_CONFIG } from "@/config/dev.config";
import { SITE_CONFIG } from "@/config/site.config";
import { EXTERNAL_CONFIG } from "./config/external.config";

export const BLOG = {
  APP_NAME: "Norkive",
  LANG: process.env.NEXT_PUBLIC_LANG || "kr-KR", // e.g ,'en-US'  see /lib/constants for more.
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2024, // e.g if leave this empty, current year will be used.

  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || "light",
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6], //Night mode start time, false to disable automatic switching of night mode based on time
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 5,

  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || "ryoonwithinwisdomlights", //Your nickname
  BIO:
    process.env.NEXT_PUBLIC_BIO ||
    "A Software Engineer who likes to Giveaway to the World with Joy, Love and Lights.", //About the author

  KEYWORDS:
    process.env.NEXT_PUBLIC_KEYWORD ||
    "Norkive, Gitbook Themed-Static Website, with Notion API", // Website keywords separated by English commas
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || "/favicon.ico", //Blog favicon configuration, uses /public/favicon.ico by default, supports online images, such as https://img.imesong.com/favicon.png

  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY, //|| true, // Whether to allow copying of page content is allowed by default. If set to false, copying of content is prohibited in the entire stack.
  ...SITE_CONFIG,
  ...IMAGE_CONFIG,
  ...CONTACT_CONFIG,
  ...FONT_CONFIG,
  ...DOCS_CONFIG,
  ...ANALYTICS_CONFIG,
  ...DEV_CONFIG,
  ...EXTERNAL_CONFIG,
};
