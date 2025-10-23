"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import TableOfContents from "./TableOfContents";

/**
 * Mobile TableOfContents button
 */
export default function TableOfContentsDrawerPC({ page }: { page: any }) {
  const { handleTOCVisible } = useGeneralSiteSettings();
  const isMobile = useMediaQuery("(max-width: 768px");
  useEffect(() => {
    const tocAble = page?.tableOfContents?.length > 0;
    if (!tocAble) {
      handleTOCVisible();
    }
  }, []);

  return (
    page?.tableOfContents?.length > 0 &&
    !isMobile && (
      <div className="hidden left-full  md:flex border-l dark:border-neutral-800 my-8 ">
        <TableOfContents page={page} />
      </div>
    )
  );
}
