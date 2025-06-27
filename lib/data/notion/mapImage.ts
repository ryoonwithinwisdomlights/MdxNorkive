import { BLOG } from "@/blog.config";
import { Block } from "notion-types";
import { defaultMapImageUrl } from "notion-utils";
export const mapImageUrl = (url: string | undefined, block: Block) => {
  if (url === BLOG.HOME_BANNER_IMAGE || url === BLOG.AVATAR) {
    return url;
  }

  return defaultMapImageUrl(url, block);
};

/**
 * Compress Pictures
 * 1.Notion image bed can compress and crop images by specifying url-query parameters, for example?xx=xx&width=400
 * 2. UnPlash pictures can control the compression quality through api q=50 width=400 control the picture size
 * @param {*} image
 */
export const compressImage = (
  image,
  width = 800,
  quality = 50,
  fmt = "webp"
) => {
  if (!image) {
    return null;
  }
  if (
    image.indexOf(BLOG.NOTION_HOST) === 0 &&
    image.indexOf("amazonaws.com") > 0
  ) {
    return `${image}&width=${width}`;
  }
  // Compress unsplash images
  if (image.indexOf("https://images.unsplash.com/") === 0) {
    // Parse URL into an object
    const urlObj = new URL(image);
    // Get URL parameters
    const params = new URLSearchParams(urlObj.search);
    // Replace the value of the q parameter with
    params.set("q", quality.toString());
    // size
    params.set("width", width.toString());
    // Format
    params.set("fmt", fmt);
    params.set("fm", fmt);
    // Generate new URL
    urlObj.search = params.toString();
    return urlObj.toString();
  }

  // You can also add your custom image transmission cover image compression parameters here.
  // .e.g
  if (image.indexOf("https://your_picture_bed") === 0) {
    return "do_somethin_here";
  }

  return image;
};

function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}]/u;
  return emojiRegex.test(str);
}
