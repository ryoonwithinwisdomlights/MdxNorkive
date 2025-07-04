export const BLOG = {
  APP_NAME: "Norkive",
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || "",
  NOTION_ACCESS_TOKEN: process.env.NOTION_TOKEN_V2 || "", // Useful if you prefer not to make your database public
  PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || false, //Pseudo-static path, after it is turned on, all archive URLs will end with .html.
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
  DEV_LINK: process.env.NEXT_PUBLIC_LINK_DEV, // link only for dev mode.
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
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || "font-sans font-light", // ['font-serif','font-sans'] There are two options, serif and sans-serif: refer to https://www.jianshu.com/p/55e410bd2115
  // Font CSS example https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
  FONT_URL: [
    "https://fonts.googleapis.com/css?family=Bitter&display=swap",
    "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap",
    "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap",
  ],

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
  FONT_AWESOME:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  // font-awesome Font icon address; optional /css/all.min.css ， https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css
  // END ************website font*****************

  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY, //|| true, // Whether to allow copying of page content is allowed by default. If set to false, copying of content is prohibited in the entire stack.
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU, //|| true, // Customize the right-click menu and override the system menu

  // START ********Code related********
  // PrismJs Code related
  PRISM_JS_PATH: "https://npm.elemecdn.com/prismjs@1.29.0/components/",
  PRISM_JS_AUTO_LOADER:
    "https://npm.elemecdn.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js",

  // code theme @see https://github.com/PrismJS/prism-themes
  PRISM_THEME_PREFIX_PATH:
    process.env.NEXT_PUBLIC_PRISM_THEME_PREFIX_PATH ||
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.css", // Code block default theme
  PRISM_THEME_SWITCH: process.env.NEXT_PUBLIC_PRISM_THEME_SWITCH || true, // Whether to enable light/dark mode code theme switching; when enabled, the following two themes will be displayed
  PRISM_THEME_LIGHT_PATH:
    process.env.NEXT_PUBLIC_PRISM_THEME_LIGHT_PATH ||
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.css", // Light mode theme
  PRISM_THEME_DARK_PATH:
    process.env.NEXT_PUBLIC_PRISM_THEME_DARK_PATH ||
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css", // dark mode theme

  CODE_MAC_BAR: process.env.NEXT_PUBLIC_CODE_MAC_BAR || true, // The red, stone and green icon of mac is displayed in the upper left corner of the code
  CODE_LINE_NUMBERS: process.env.NEXT_PUBLIC_CODE_LINE_NUMBERS || false, // Whether to display line numbers
  CODE_COLLAPSE: process.env.NEXT_PUBLIC_CODE_COLLAPSE || true, // Whether to support folding code box
  CODE_COLLAPSE_EXPAND_DEFAULT:
    process.env.NEXT_PUBLIC_CODE_COLLAPSE_EXPAND_DEFAULT || true, // The folded code is in the expanded state by default

  // END ********Code related********

  // Mermaid ChartCDN
  MERMAID_CDN:
    process.env.NEXT_PUBLIC_MERMAID_CDN ||
    "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.2.4/mermaid.min.js", // CDN

  BACKGROUND_LIGHT: "#eeeeee", // use hex value, don't forget '#' e.g #fffefc
  BACKGROUND_DARK: "#000000", // use hex value, don't forget '#'
  SUB_PATH: "", // leave this empty unless you want to deploy in a folder

  RECORD_SHARE_BAR_ENABLE: process.env.NEXT_PUBLIC_RECORD_SHARE_BAR || "true", // Record Archive sharing function, a sharing bar will be displayed at the bottom
  RECORD_SHARE_SERVICE:
    process.env.NEXT_PUBLIC_RECORD_SHARE_SERVICES || "email,twitter,link", // Shared services, displayed in order, separated by commas
  // All supported sharing services: link (copy link), email (mail),facebook,twitter,telegram,messenger,line,reddit,whatsapp,linkedin,instapaper

  RECORD_URL_PREFIX: process.env.NEXT_PUBLIC_RECORD_URL_PREFIX || "archive",
  //The default path prefix for RECORD type Archives, for example, the default RECORD type path is /records/[slug]
  // If this item is configured as '' empty, the Archive will have no prefix path
  // Supports functions similar to WP's customizable Archive link format: https://wordpress.org/documentation/archive/customize-permalinks/, currently only %year%/%month%/%day% is implemented first
  //Example: If you want to change the link to the prefix Archive + timestamp, you can change it to: 'archive/%year%/%month%/%day%'

  RECORD_LIST_STYLE: "page", // ['page','scroll] Archive list style: page number paging, single page scrolling loading
  PAGE_RECOMMEND_COUNT: 6, // Number of recommended datas
  RECORD_PER_PAGE: 12, // record counts per page
  PAGE_SORT_BY: process.env.NEXT_PUBLIC_PAGE_SORT_BY || "notion", //Sorting method 'date' is by time, 'notion' is controlled by notification

  RECORD_WAITING_TIME_FOR_404:
    process.env.NEXT_PUBLIC_RECORD_WAITING_TIME_FOR_404 || "8",

  PREVIEW_CATEGORY_COUNT: 16, // The maximum number of categories displayed on the homepage, 0 means no limit
  PREVIEW_TAG_COUNT: 16, // The maximum number of tags displayed on the homepage, 0 means no limit

  RECORD_DISABLE_GALLERY_CLICK:
    process.env.NEXT_PUBLIC_RECORD_DISABLE_GALLERY_CLICK || false, // Clicking is prohibited in the picture album view, making it easier to insert links into the picture album on the friend link page.

  // giscus @see https://giscus.app/
  COMMENT_GISCUS_REPONAME: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPONAME, // Your Github repository name e.g 'ryoonwithinwisdomlights/norkive'
  COMMENT_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID, // Your Github Repo ID e.g (you can see it after setting up giscus)
  NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY:
    process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY,
  NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID:
    process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID, // Category ID in your Github Discussions (you can see it after setting up giscus)
  COMMENT_GISCUS_MAPPING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_MAPPING, // Which method does your Github Discussions use to demarcate datas? Default is 'pathname'
  COMMENT_GISCUS_REACTIONS_ENABLED:
    process.env.NEXT_PUBLIC_COMMENT_GISCUS_REACTIONS_ENABLED, // Does your Giscus enable data emoticons? '1' is on "0" is off and is on by default.
  COMMENT_GISCUS_EMIT_METADATA:
    process.env.NEXT_PUBLIC_COMMENT_GISCUS_EMIT_METADATA, // Whether your Giscus extracts Metadata '1' On '0' Off The default is off
  COMMENT_GISCUS_INPUT_POSITION:
    process.env.NEXT_PUBLIC_COMMENT_GISCUS_INPUT_POSITION, // Your Giscus comment position 'bottom' tail 'top' top, default 'bottom'
  COMMENT_GISCUS_LANG: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LANG, // Your Giscus language e.g 'en', 'zh-TW', 'zh-CN', default 'en'
  COMMENT_GISCUS_LOADING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LOADING, // Whether your Giscus load is progressive, default is 'lazy'
  COMMENT_GISCUS_CROSSORIGIN: "anonymous", // Your Giscus can be cross-domain, default 'anonymous'

  // ----> Site statistics
  ANAYLTICS_GOOGLE_ID: process.env.NEXT_PUBLIC_ANAYLTICS_GOOGLE_ID || false,
  ANALYTICS_VERCEL: process.env.NEXT_PUBLIC_ANALYTICS_VERCEL || false, //
  ANALYTICS_BUSUANZI_ENABLE:
    process.env.NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE || true, // Display website reading volume and number of visits see http://busuanzi.ibruce.info/
  SEO_GOOGLE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_GOOGLE_VERIFICATION || "", // Remove the value or replace it with your own google site verification code

  // Custom configuration notification database field name
  NOTION_PROPERTY_NAME: {
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || "password",
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || "type", // data type
    type_able_arr: ["Record", "Project", "Engineering"],
    type_record: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || "Record", // When the data type is the same as this value, it is all the general record.
    type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || "Page", // When the type data type is the same as this value, it is a single page.
    type_notice:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || "Notice", // When the type data type is the same as this value, it is an announcement.
    type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || "Menu", // When the type data type is the same as this value, it is a menu.
    type_sub_menu:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU || "SubMenu", // When the type data type is the same as this value, it is a submenu.
    type_sub_menu_page:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU_PAGE ||
      "SubMenuPage", // When the type data type is the same as this value, it is a submenu but presenting page, simultaenousely.
    type_project:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PROJECT || "Project", // When the data type is the same as this value, it is specially for all project.
    type_engineering:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_ENGINEERING || "Engineering", // When the data type is the same as this value, it is all the record  pecifically for Software engineering.
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || "title", // data title
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || "status",
    status_publish:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || "Published", // When the status value is the same as this, it is released, which can be Chinese
    status_invisible:
      process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || "Invisible", // When the status value is the same as this, it is a hidden release, which can be Chinese. Otherwise, other page statuses will not be displayed on the blog.
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || "summary",
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || "slug",
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || "category",
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || "date",
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || "tags",
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || "icon",
  },

  // Obsolete configuration
  AVATAR: "/images/norkive_black.png", // The author's avatar is covered by the ICON in the notice. If there is no ICON, take avatar.png in the public directory.
  TITLE: process.env.NEXT_PUBLIC_TITLE || "Norkive", // Click title, which will be covered by the page title in the notice; please do not leave a blank here, otherwise the server will not be able to compile
  HOME_BANNER_IMAGE:
    process.env.NEXT_PUBLIC_HOME_BANNER_IMAGE || "/images/bg_image.png", // The home page background image will be covered by the cover image in the notice. If there is no cover image, the /public/bg_image.jpg file in the code will be used.
  DESCRIPTION:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    "Norkive - A Static WebBlog for your every Recorded Archive in Notion with Next.js 15", // Site description, overridden by the page description in the notice

  // ANIMATE.css
  ANIMATE_CSS_URL:
    process.env.NEXT_PUBLIC_ANIMATE_CSS_URL ||
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", //

  // Website pictures
  IMG_LAZY_LOAD_PLACEHOLDER:
    process.env.NEXT_PUBLIC_IMG_LAZY_LOAD_PLACEHOLDER ||
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", // Lazy loading of placeholder image address, supports base64 or url
  IMG_URL_TYPE: process.env.NEXT_PUBLIC_IMG_TYPE || "Notion", // This configuration is invalid, please do not use it; the AMAZON solution is no longer supported, only the Notion solution is supported. ['Notion','AMAZON'] Site image prefix Default Notion:(https://notion.so/images/xx) , AMAZON(https://s3.us-west-2.amazonaws.com/xxx)
  IMG_SHADOW: process.env.NEXT_PUBLIC_IMG_SHADOW || false, // Whether to automatically add shadows to data images
  IMG_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMG_COMPRESS_WIDTH || 800,

  // development related

  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false, //
  ENABLE_CACHE:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === "build" ||
    process.env.npm_lifecycle_event === "export", // The cache can be selectively turned on during development, debugging, and packaging. It does not make much sense to turn this feature on during formal deployment.
  isProd: process.env.NEXT_VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  BUNDLE_ANALYZER: process.env.ANALYZE === "true" || false, //Whether to display the compilation dependency content and size
};
