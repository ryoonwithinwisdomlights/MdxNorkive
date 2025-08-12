export const SITE_CONFIG = {
  LINK: process.env.NEXT_PUBLIC_LINK || "", // website address process.env.NEXT_PUBLIC_LINK || NEXT_PUBLIC_LINK,
  AVATAR: "/images/norkive_black.png", // The author's avatar is covered by the ICON in the notice. If there is no ICON, take avatar.png in the public directory.
  TITLE: process.env.NEXT_PUBLIC_TITLE || "Norkive", // Click title, which will be covered by the page title in the notice; please do not leave a blank here, otherwise the server will not be able to compile
  HOME_BANNER_IMAGE:
    process.env.NEXT_PUBLIC_HOME_BANNER_IMAGE || "/images/bg_image.png", // The home page background image will be covered by the cover image in the notice. If there is no cover image, the /public/bg_image.jpg file in the code will be used.
  DESCRIPTION:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    "Norkive - A Static WebBlog for your every Recorded Archive in Notion with Next.js 15", // Site description, overridden by the page description in the notice
};
