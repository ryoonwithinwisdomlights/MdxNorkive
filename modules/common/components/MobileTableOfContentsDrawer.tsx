"use client";

import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";

/**
 * Mobile TableOfContents button
 */
export default function MobileTableOfContentsDrawer() {
  const { showTocButton } = useGlobal({ from: "index" });
  const { tocVisible, handleTOCVisible, locale } = useNorkiveTheme();

  const toggleToc = () => {
    if (tocVisible) {
      handleTOCVisible();
    }
  };

  return (
    <div
      className={
        (showTocButton ? "" : "hidden") +
        "md:hidden fixed right-0 bottom-52 z-30 bg-white border-l border-t border-b dark:border-neutral-800 rounded"
      }
    >
      <div
        onClick={toggleToc}
        className={
          "text-black flex justify-center items-center dark:text-neutral-200 dark:bg-neutral-700 py-2 px-2"
        }
      >
        <a
          id="toc-button"
          className={
            "fa-list-ol cursor-pointer fas hover:scale-150 transform duration-200"
          }
        />
      </div>
    </div>
  );
}
