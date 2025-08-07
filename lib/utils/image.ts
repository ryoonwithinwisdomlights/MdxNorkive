import { BLOG } from "@/blog.config";
import { isEmoji } from "./general";

/**
 * Compress Pictures
 * 1.Notion image bed can compress and crop images by specifying url-query parameters, for example?xx=xx&width=400
 * 2. UnPlash pictures can control the compression quality through api q=50 width=400 control the picture size
 * @param {*} image
 */
export const compressImage = ({
  image,
  width = 800,
  quality = 50,
  fmt = "webp",
}: {
  image: string;
  width?: number;
  quality?: number;
  fmt?: string;
}) => {
  // if (!image) {
  //   return null;
  // }

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

/**
 * Image mapping
 * 1. If it is /xx.xx relative path format, it will be converted into a complete notification domain name image
 * 2. If it is a bookmark type block picture cover, there is no need to process it.
 * @param {*} img
 * @param {*} value
 * @returns
 */
export const mapImgUrl: any = (img, block, type = "block", from) => {
  if (!img) {
    return null;
  }
  let ret: string = "";
  // Relative directories are regarded as the notation's own pictures.
  if (img.startsWith("/")) {
    ret = BLOG.NOTION_HOST + img;
  } else {
    ret = img;
  }

  // Notion image bed converted to permanent address
  const isNotionImg =
    ret.indexOf("secure.notion-static.com") > 0 ||
    ret.indexOf("prod-files-secure") > 0;
  const isImgBlock = BLOG.IMG_URL_TYPE === "Notion" || type !== "block";
  if (isNotionImg && isImgBlock) {
    ret =
      BLOG.NOTION_HOST +
      "/image/" +
      encodeURIComponent(ret) +
      "?table=" +
      type +
      "&id=" +
      block.id;
  }

  if (!isEmoji(ret) && ret.indexOf("notion.so/images/page-cover") < 0) {
    if (BLOG.RANDOM_IMAGE_URL) {
      // Only when the random picture interface is configured, the picture will be replaced.
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT;
      let isReplace = false;
      if (texts) {
        const textArr = texts.split(",");
        // Determine whether replacement text is included
        textArr.forEach((text) => {
          if (ret.indexOf(text) > -1) {
            isReplace = true;
          }
        });
      } else {
        isReplace = true;
      }

      if (isReplace) {
        ret = BLOG.RANDOM_IMAGE_URL;
      }
    }
    const separator = ret.includes("?") ? "&" : "?";
    // Splice unique identification parameters to prevent requested images from being cached
    ret = `${ret.trim()}${separator}t=${block.id}`;
  }

  // Archive cover

  if (from === "pageCoverThumbnail") {
    ret = compressImage({ image: ret });
  }

  return ret;
};
