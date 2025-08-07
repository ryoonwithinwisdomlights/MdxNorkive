export const BLOG = {
  APP_NAME: "Norkive",
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || "",
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  LANG: process.env.NEXT_PUBLIC_LANG || "kr-KR", // e.g ,'en-US'  see /lib/constants for more.
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || "light",
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6], //Night mode start time, false to disable automatic switching of night mode based on time
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2024, // e.g if leave this empty, current year will be used.
  TAG_SORT_BY_COUNT: true, // Whether the tags are sorted in descending order by the number of datas, with tags with more datas ranked first.
  IS_TAG_COLOR_DISTINGUISHED:
    process.env.NEXT_PUBLIC_IS_TAG_COLOR_DISTINGUISHED === "true" || true, //Whether to distinguish the color of tags with the same name

  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true,
  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || "ryoonwithinwisdomlights", //Your nickname
  BIO:
    process.env.NEXT_PUBLIC_BIO ||
    "A Software Engineer who likes to Giveaway to the World with Joy, Love and Lights.", //About the author
  LINK: process.env.NEXT_PUBLIC_LINK || "", // website address process.env.NEXT_PUBLIC_LINK || NEXT_PUBLIC_LINK,
  KEYWORDS:
    process.env.NEXT_PUBLIC_KEYWORD ||
    "Norkive, Gitbook Themed-Static Website, with Notion API", // Website keywords separated by English commas

  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  CONTACT_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || "",
  CONTACT_GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB || "",
  CONTACT_INSTAGRAM: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "",
  CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "",

  NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || "https://www.notion.so", // Notion domain name, you can choose to use your own domain name for reverse proxy. If you do not know what a reverse proxy is, please do not modify this item.

  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || "/favicon.ico", //Blog favicon configuration, uses /public/favicon.ico by default, supports online images, such as https://img.imesong.com/favicon.png
  IMAGE_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_WIDTH || 800, // Default image compression width, applied to blog cover and data content
  IMAGE_ZOOM_IN_WIDTH: process.env.NEXT_PUBLIC_IMAGE_ZOOM_IN_WIDTH || 1200, // The image quality width after clicking on the data image to enlarge it does not represent the actual display width on the web page.

  RANDOM_IMAGE_URL: process.env.NEXT_PUBLIC_RANDOM_IMAGE_URL || "", //Random picture API, if the following keywords are not configured, the homepage cover, avatar, and Archive cover image will be replaced with random pictures.
  RANDOM_IMAGE_REPLACE_TEXT:
    process.env.NEXT_PUBLIC_RANDOM_IMAGE_NOT_REPLACE_TEXT ||
    "images.unsplash.com",
  // Random picture API, if the following keywords are not configured, the homepage cover, avatar, and data cover image will be replaced with random pictures.

  // START ************website font*****************
  FONT_SANS: [
    '"PingFang SC"',
    "-apple-system",
    "BlinkMacSystemFont",
    '"Hiragino Sans GB"',
    '"Microsoft YaHei"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Segoe UI"',
    '"Noto Sans SC"',
    "HarmonyOS_Regular",
    '"Helvetica Neue"',
    "Helvetica",
    '"Source Han Sans SC"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
  ],

  FONT_SERIF: [
    "Bitter",
    '"Noto Serif SC"',
    "SimSun",
    '"Times New Roman"',
    "Times",
    "serif",
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Apple Color Emoji"',
  ],
  // END ************website font*****************

  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY, //|| true, // Whether to allow copying of page content is allowed by default. If set to false, copying of content is prohibited in the entire stack.

  BACKGROUND_LIGHT: "#eeeeee", // use hex value, don't forget '#' e.g #fffefc
  BACKGROUND_DARK: "#000000", // use hex value, don't forget '#'

  RECORD_SHARE_SERVICE:
    process.env.NEXT_PUBLIC_RECORD_SHARE_SERVICES || "email,twitter,link", // Shared services, displayed in order, separated by commas
  // All supported sharing services: link (copy link), email (mail),facebook,twitter,telegram,messenger,line,reddit,whatsapp,linkedin,instapaper

  RECORD_PER_PAGE: 12, // record counts per page

  RECORD_SUBSTR_BASIC_NUMBER: 80,
  RECORD_SUBSTR_NAVBAR_NUMBER: 24,

  // ----> Site statistics
  ANAYLTICS_GOOGLE_ID: process.env.NEXT_PUBLIC_ANAYLTICS_GOOGLE_ID || false,
  ANALYTICS_BUSUANZI_ENABLE:
    process.env.NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE || true, // Display website reading volume and number of visits see http://busuanzi.ibruce.info/

  // Obsolete configuration
  AVATAR: "/images/norkive_black.png", // The author's avatar is covered by the ICON in the notice. If there is no ICON, take avatar.png in the public directory.
  TITLE: process.env.NEXT_PUBLIC_TITLE || "Norkive", // Click title, which will be covered by the page title in the notice; please do not leave a blank here, otherwise the server will not be able to compile
  HOME_BANNER_IMAGE:
    process.env.NEXT_PUBLIC_HOME_BANNER_IMAGE || "/images/bg_image.png", // The home page background image will be covered by the cover image in the notice. If there is no cover image, the /public/bg_image.jpg file in the code will be used.
  DESCRIPTION:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    "Norkive - A Static WebBlog for your every Recorded Archive in Notion with Next.js 15", // Site description, overridden by the page description in the notice

  // Website pictures
  IMG_URL_TYPE: process.env.NEXT_PUBLIC_IMG_TYPE || "Notion", // This configuration is invalid, please do not use it; the AMAZON solution is no longer supported, only the Notion solution is supported. ['Notion','AMAZON'] Site image prefix Default Notion:(https://notion.so/images/xx) , AMAZON(https://s3.us-west-2.amazonaws.com/xxx)

  // development related
  ENABLE_CACHE:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === "build" ||
    process.env.npm_lifecycle_event === "export", // The cache can be selectively turned on during development, debugging, and packaging. It does not make much sense to turn this feature on during formal deployment.
  isProd: process.env.NEXT_VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};
