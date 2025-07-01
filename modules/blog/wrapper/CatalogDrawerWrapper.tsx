"use client";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
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
  const { tocVisible, handleTOCVisible, locale } = useNorkiveTheme();
  const router = useRouter();
  const switchVisible = () => {
    handleTOCVisible();
  };
  useEffect(() => {
    handleTOCVisible();
  }, [router]);

  return (
    record.tableOfContents.length > 0 && (
      <>
        <div
          id="gitbook-toc-float"
          className={"fixed md:top-0 bottom-40 right-0 z-40 hidden md:flex "}
        >
          {/* side menu */}
          <div
            className={
              (tocVisible
                ? "animate__slideInRight "
                : " -mr-72 animate__slideOutRight") +
              " overflow-y-hidden rounded-l-xl rounded-r-xl shadow-card w-60 h-3/6 duration-200 fixed right-1 bottom-16 rounded py-2 bg-white dark:bg-neutral-700"
            }
          >
            {/* {record && ( */}

            <div
              onClick={handleTOCVisible}
              className="px-4 pb-2 flex justify-between items-center border-b font-bold"
            >
              <span>{locale.COMMON.TABLE_OF_CONTENTS}</span>
              <XIcon className="p-1 cursor-pointer" />
            </div>
            <div className="dark:text-gray-400 text-gray-600 px-3">
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
