import { BLOG } from "@/blog.config";
import { SiteInfoModel } from "@/types";

import { RecordFrontMatter } from "@/types/mdx.model";
import { compressImage } from "@/lib/utils/image";

export function getSiteInfo({
  recordItem,
}: {
  recordItem?: RecordFrontMatter;
}): SiteInfoModel {
  const defaultTitle = BLOG.TITLE;
  const defaultDescription = BLOG.DESCRIPTION;
  const defaultPageCover = BLOG.HOME_BANNER_IMAGE;
  const defaultIcon = BLOG.AVATAR;
  const defaultLink = BLOG.LINK;
  if (!recordItem) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      pageCover: defaultPageCover,
      icon: defaultIcon,
      link: defaultLink,
    };
  }

  const title = recordItem.title || defaultTitle;
  const description = recordItem?.description || defaultDescription;

  const pageCover = recordItem?.pageCover || defaultPageCover;

  const collectionIcon = recordItem?.icon || defaultIcon;

  // Compress all category user avatars
  let icon = compressImage(
    collectionIcon ? { image: collectionIcon } : { image: defaultIcon }
  );
  // Site URL
  const link = recordItem.slug || defaultLink;

  // Site icon cannot be emoji
  const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  if (!icon || emojiPattern.test(icon)) {
    icon = defaultIcon;
  }
  return { title, description, pageCover, icon, link } as SiteInfoModel;
}
