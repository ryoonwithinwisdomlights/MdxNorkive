// import { siteConfigObj } from "./lib/utils/get-site-info";
export const siteConfigObj = (config: SiteConfigModel): SiteConfigModel => {
  return config;
};

import {
  externalLibModel,
  notionPropertyStatusModel,
  SiteConfigModel,
} from "./types/siteconfig.model";

export const siteConfigInfo = siteConfigObj({
  app_name: "Norkive",
  since: process.env.NEXT_PUBLIC_SINCE || 2024,
  notion_database_id: process.env.NOTION_DATABASE_ID as string,
  notion_spaceid: null,
  notion_active_user: process.env.NOTION_ACTIVE_USER || "",
  notion_access_token: process.env.NOTION_TOKEN_V2 || "", // Useful if you prefer not to make your database public
  notion_host: process.env.NEXT_PUBLIC_NOTION_HOST || "https://www.notion.so", // Notion domain name, you can choose to use your own domain name for reverse proxy. If you do not know what a reverse proxy is, please do not modify this item.

  link: process.env.NEXT_PUBLIC_LINK || "https://norkive.vercel.app/", // website address process.env.NEXT_PUBLIC_LINK || NEXT_PUBLIC_LINK,
  dev_link: process.env.NEXT_PUBLIC_LINK_DEV as string, // link only for dev mode.
  author: process.env.NEXT_PUBLIC_AUTHOR || "ryoonwithinwisdomlights", //Your nickname
  bio:
    process.env.NEXT_PUBLIC_BIO ||
    "A Software Engineer who likes to Giveaway to the World with Joy, Love and Lights.", //About the author
  keywords:
    process.env.NEXT_PUBLIC_KEYWORD ||
    "Norkive, Gitbook Themed-Static Website, with Notion API", // Website keywords separated by English commas
  blog_favicon: process.env.NEXT_PUBLIC_FAVICON || "/favicon.ico", //Blog favicon configuration, uses /public/favicon.ico by default, supports online images, such as https://img.imesong.com/favicon.png
  language: process.env.NEXT_PUBLIC_LANG || "kr-KR", // e.g ,'en-US'  see /lib/constants for more.since: 2025, // e.g if leave this empty, current year will be used.

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || " ",
  twitter: process.env.NEXT_PUBLIC_CONTACT_TWITTER || " ",
  github: process.env.NEXT_PUBLIC_CONTACT_GITHUB || " ",
  instagram: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || " ",
  linkedin: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || " ",

  appearance: process.env.NEXT_PUBLIC_APPEARANCE || "light",
  appearance_dark_time: [18, 6], //Night mode start time, false to disable automatic switching of night mode based on time

  custom_menu: true,

  image_compress_width: 800, // Default image compression width, applied to blog cover and data content
  image_zoom_in_width: 1200, // The image quality width after clicking on the data image to enlarge it does not represent the actual display width on the web page.
  image_lazy_load_placeholder:
    process.env.NEXT_PUBLIC_IMG_LAZY_LOAD_PLACEHOLDER ||
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", // Lazy loading of placeholder image address, supports base64 or url
  image_url_type: process.env.NEXT_PUBLIC_IMAGE_TYPE || "Notion", // This configuration is invalid, please do not use it; the AMAZON solution is no longer supported, only the Notion solution is supported. ['Notion','AMAZON'] Site image prefix Default Notion:(https://notion.so/images/xx) , AMAZON(https://s3.us-west-2.amazonaws.com/xxx)
  image_shadow: false, // Whether to automatically add shadows to data images

  random_image_url: process.env.NEXT_PUBLIC_RANDOM_IMAGE_URL || "", //Random picture API, if the following keywords are not configured, the homepage cover, avatar, and article cover image will be replaced with random pictures.
  random_image_replace_text:
    process.env.NEXT_PUBLIC_RANDOM_IMAGE_NOT_REPLACE_TEXT ||
    "images.unsplash.com",

  can_copy: process.env.NEXT_PUBLIC_CAN_COPY, //|| true, // Whether to allow copying of page content is allowed by default. If set to false, copying of content is prohibited in the entire stack.
  right_click_context_menu:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU, //|| true, // Customize the right-click menu and override the system menu

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  navigationStyle: "default",
  // navigationStyle: 'custom',
  // navigationLinks: [
  //   {
  //     title: 'About',
  //     pageId: 'f1199d37579b41cbabfc0b5174f4256a'
  //   },
  //   {
  //     title: 'Contact',
  //     pageId: '6a29ebcb935a4f0689fe661ab5f3b8d1'
  //   }
  // ],

  defaultPageIcon:
    process.env.NEXT_PUBLIC_AVATAR || "/images/norkive_black.png", // The author's avatar is covered by the ICON in the notice. If there is no ICON, take avatar.png in the public directory.
  defaultTitle: process.env.NEXT_PUBLIC_TITLE || "Norkive", // Click title, which will be covered by the page title in the notice; please do not leave a blank here, otherwise the server will not be able to compile
  // default notion icon and cover images for site-wide consistency (optional)
  defaultPageCover:
    process.env.NEXT_PUBLIC_HOME_BANNER_IMAGE || "/images/bg_image.png", // The home page background image will be covered by the cover image in the notice. If there is no cover image, the /public/bg_image.jpg file in the code will be used.
  defaultDescription:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    "Norkive - A Static WebBlog for your every Recorded Archive in Notion with Next.js 15", // Site description, overridden by the page description in the notice
  defaultPageCoverPosition: 0.5,

  background_light: "#eeeeee", // use hex value, don't forget '#' e.g #fffefc
  background_dark: "#000000", // use hex value, don't forget '#'
  sub_path: "", // leave this empty unless you want to deploy in a folder

  archive_share_bar_enable: true, // Record Article sharing function, a sharing bar will be displayed at the bottom
  archive_share_service:
    process.env.NEXT_PUBLIC_RECORD_SHARE_SERVICES || "email,twitter,link", // Shared services, displayed in order, separated by commas

  archive_url_prefix: process.env.NEXT_PUBLIC_archive_url_prefix || "archive",
  //Example: If you want to change the link to the prefix article + timestamp, you can change it to: 'article/%year%/%month%/%day%'

  archive_list_stye: "page", // ['page','scroll] Article list style: page number paging, single page scrolling loading
  archive_recommend_count: 6, // Number of recommended datas
  archive_per_page: 12, // record counts per page
  archive_sort_by: process.env.NEXT_PUBLIC_RECORD_SORT_BY || "notion", //Sorting method 'date' is by time, 'notion' is controlled by notification
  archive_waiting_time_for_404:
    process.env.NEXT_PUBLIC_archive_waiting_time_for_404 || "8",
  archive_disable_gallery_click: false, // Clicking is prohibited in the picture album view, making it easier to insert links into the picture album on the friend link page.

  preview_category_count: 16, // The maximum number of categories displayed on the homepage, 0 means no limit
  preview_tag_count: 16, // The maximum number of tags displayed on the homepage, 0 means no limit

  tag_sort_by_count: true, // Whether the tags are sorted in descending order by the number of datas, with tags with more datas ranked first.
  is_tag_color_distinguised:
    process.env.NEXT_PUBLIC_IS_TAG_COLOR_DISTINGUISHED === "true" || true, //Whether to distinguish the color of tags with the same name

  // development related
  debug: false,
  enable_cache:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === "build" ||
    process.env.npm_lifecycle_event === "export", // The cache can be selectively turned on during development, debugging, and packaging. It does not make much sense to turn this feature on during formal deployment.
  isProd: process.env.NEXT_VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  bundle_analyzer: process.env.ANALYZE === "true" || false, //Whether to display the compilation dependency content and size
});

export const notionPropertyStatusInfo: notionPropertyStatusModel = {
  password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || "password",
  type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || "type", // data type
  type_able_arr: ["Record", "Engineering", "Project"],
  type_record: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || "Record", // When the data type is the same as this value, it is all the general record.
  type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || "Page", // When the type data type is the same as this value, it is a single page.
  type_notice: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || "Notice", // When the type data type is the same as this value, it is an announcement.
  type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || "Menu", // When the type data type is the same as this value, it is a menu.
  type_sub_menu:
    process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU || "SubMenu", // When the type data type is the same as this value, it is a submenu.
  type_sub_menu_page:
    process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU_PAGE || "SubMenuPage", // When the type data type is the same as this value, it is a submenu but presenting page, simultaenousely.
  type_project:
    process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PROJECT || "Project", // When the data type is the same as this value, it is specially for PROJECT & Portfolio.
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
};

export const externalLibraryInfo: externalLibModel = {
  // START ************website font*****************
  font_style: process.env.NEXT_PUBLIC_FONT_STYLE || "font-sans font-light", // ['font-serif','font-sans'] There are two options, serif and sans-serif: refer to https://www.jianshu.com/p/55e410bd2115
  // Font CSS example https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
  font_url: [
    "https://fonts.googleapis.com/css?family=Bitter&display=swap",
    "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap",
    "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap",
  ],

  font_sans: [
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

  font_serif: [
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
  font_awesome:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  // font-awesome Font icon address; optional /css/all.min.css ， https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css
  // END ************website font*****************

  // PrismJs Code related
  prism_js_path: "https://npm.elemecdn.com/prismjs@1.29.0/components/",
  prism_js_auto_loader:
    "https://npm.elemecdn.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js",

  // code theme @see https://github.com/PrismJS/prism-themes
  prism_theme_prefix_path:
    process.env.NEXT_PUBLIC_PRISM_THEME_PREFIX_PATH ||
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.css", // Code block default theme
  prism_theme_switch: true, // Whether to enable light/dark mode code theme switching; when enabled, the following two themes will be displayed
  prism_theme_light_path:
    process.env.NEXT_PUBLIC_PRISM_THEME_LIGHT_PATH ||
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.css", // Light mode theme
  prism_theme_dark_path:
    process.env.NEXT_PUBLIC_PRISM_THEME_DARK_PATH ||
    "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css", // dark mode theme

  code_mac_bar: true, // The red, stone and green icon of mac is displayed in the upper left corner of the code
  code_line_numbers: false, // Whether to display line numbers
  code_collapse: true, // Whether to support folding code box
  code_collapse_expand_default: true, // The folded code is in the expanded state by default

  // Mermaid ChartCDN
  memaid_cdn:
    process.env.NEXT_PUBLIC_MERMAID_CDN ||
    "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.2.4/mermaid.min.js", // CDN

  // ----> Site statistics
  analytics_google_id: false,
  analytics_busuanzi_enable: true, // Display website reading volume and number of visits see http://busuanzi.ibruce.info/
  seo_google_verification:
    process.env.NEXT_PUBLIC_seo_google_verification || "", // Remove the value or replace it with your own google site verification code

  // Obsolete configuration

  // ANIMATE.css
  animate_css_url:
    process.env.NEXT_PUBLIC_ANIMATE_CSS_URL ||
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", //
};

// giscus @see https://giscus.app/
export const giscusOptionConfigInfo = {
  reponame: process.env.NEXT_PUBLIC_comment_giscus_reponame, // Your Github repository name e.g 'ryoonwithinwisdomlights/norkive'
  repo_id: process.env.NEXT_PUBLIC_comment_giscus_repo_id, // Your Github Repo ID e.g (you can see it after setting up giscus)
  category: process.env.NEXT_PUBLIC_comment_giscus_category,
  category_id: process.env.NEXT_PUBLIC_comment_giscus_category_id, // Category ID in your Github Discussions (you can see it after setting up giscus)
  mapping: process.env.NEXT_PUBLIC_comment_giscus_mapping, // Which method does your Github Discussions use to demarcate datas? Default is 'pathname'
  reactions_enabled: process.env.NEXT_PUBLIC_comment_giscus_reactions_enabled, // Does your Giscus enable data emoticons? '1' is on "0" is off and is on by default.
  emit_data: process.env.NEXT_PUBLIC_comment_giscus_emit_data, // Whether your Giscus extracts Metadata '1' On '0' Off The default is off
  input_position: process.env.NEXT_PUBLIC_comment_giscus_input_position, // Your Giscus comment position 'bottom' tail 'top' top, default 'bottom'
  lang: "ko", // Your Giscus language e.g 'en', 'zh-TW', 'zh-CN', default 'en'
  loading: process.env.NEXT_PUBLIC_comment_giscus_loading || "lazy", // Whether your Giscus load is progressive, default is 'lazy'
  crossorigin:
    process.env.NEXT_PUBLIC_comment_giscus_crossorigin || "anonymous", // Your Giscus can be cross-domain, default 'anonymous'
};
