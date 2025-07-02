"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import Catalog from "@/modules/common/components/Catalog";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
library.add(faTimes);

/**
 * Floating drawer catalog
 * @param toc
 * @param post
 * @returns {JSX.Element}
 * @constructor
 */
const CatalogDrawerWrapper = ({ record }) => {
  const { tocVisible, handleTOCVisible, locale } = useGeneralSiteSettings();
  const router = useRouter();
  const switchVisible = () => {
    handleTOCVisible();
  };
  // useEffect(() => {
  //   handleTOCVisible();
  // }, [router]);
  const tocAble = record?.tableOfContents.length > 0;
  useEffect(() => {
    if (tocAble) {
      handleTOCVisible();
    }
  }, []);

  return (
    record?.tableOfContents.length > 0 && (
      <>
        <div
          id="gitbook-toc-float"
          className={"fixed top-0 right-0 z-40 md:hidden"}
        >
          {/* side menu */}

          <div
            className={
              (tocVisible
                ? "animate__slideInRight "
                : " -mr-72 animate__slideOutRight") +
              " overflow-y-hidden shadow-card w-60 duration-200 fixed right-1 bottom-20 rounded py-2 bg-white dark:bg-neutral-700"
            }
          >
            <div
              onClick={switchVisible}
              className="px-4 pb-2 flex justify-between items-center border-b font-bold"
            >
              <span>{locale.COMMON.TABLE_OF_CONTENTS}</span>
              <XIcon className="p-1 cursor-pointer" />
            </div>
            <div className="dark:text-neutral-400 text-neutral-600 px-3">
              <Catalog record={record} />
            </div>
          </div>
        </div>
        <div
          id="right-drawer-background"
          className={
            (tocVisible ? "block" : "hidden") +
            " fixed top-0 left-0 z-30 w-full h-full"
          }
          onClick={switchVisible}
        />
      </>
    )
  );
};
export default CatalogDrawerWrapper;
