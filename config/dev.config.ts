export const DEV_CONFIG = {
  DIR_NAME: "content",
  DIR_NAME_TEST: "TEST",
  TEST_ID: process.env.TEST_ID || "",
  TEST_TYPE: process.env.TEST_TYPE || "ENGINEERINGS",
  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false,
  BACKGROUND_LIGHT: "#eeeeee", // use hex value, don't forget '#' e.g #fffefc
  BACKGROUND_DARK: "#000000", // use hex value, don't forget '#'
  NODE_ENV: process.env.NODE_ENV || "development",
  ENABLE_CACHE:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === "build" ||
    process.env.npm_lifecycle_event === "export", // The cache can be selectively turned on during development, debugging, and packaging. It does not make much sense to turn this feature on during formal deployment.
  isProd: process.env.NEXT_VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  // Notion 설정
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || "",
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
};
