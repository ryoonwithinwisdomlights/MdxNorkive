import { BLOG } from "@/blog.config";
import { SiteInfoModel } from "@/types";

import { DocFrontMatter } from "@/types/mdx.model";
import { compressImage } from "@/lib/utils/image";

export function getSiteInfo({
  docItem,
}: {
  docItem?: DocFrontMatter;
}): SiteInfoModel {
  const defaultTitle = BLOG.TITLE;
  const defaultDescription = BLOG.DESCRIPTION;
  const defaultPageCover = BLOG.HOME_BANNER_IMAGE;
  const defaultIcon = BLOG.AVATAR;
  const defaultLink = BLOG.LINK;
  if (!docItem) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      pageCover: defaultPageCover,
      icon: defaultIcon,
      link: defaultLink,
    };
  }

  const title = docItem.title || defaultTitle;
  const description = docItem?.description || defaultDescription;

  const pageCover = docItem?.pageCover || defaultPageCover;

  const collectionIcon = docItem?.icon || defaultIcon;

  // Compress all category user avatars
  let icon = compressImage(
    collectionIcon ? { image: collectionIcon } : { image: defaultIcon }
  );
  // Site URL
  const link = docItem.slug || defaultLink;

  // Site icon cannot be emoji
  const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  if (!icon || emojiPattern.test(icon)) {
    icon = defaultIcon;
  }
  return { title, description, pageCover, icon, link } as SiteInfoModel;
}
