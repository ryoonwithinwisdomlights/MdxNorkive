"use client";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
import TableOfContents from "@/modules/common/components/TableOfContents";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
library.add(faTimes);

const TocDrawerWrapper = ({ props }) => {
  const { record } = props;
  console.log("TocDrawerWrapper:,", record);
  const { tocVisible, handleTOCVisible, locale } = useNorkiveTheme();
  const router = useRouter();
  const switchVisible = () => {
    handleTOCVisible();
  };
  useEffect(() => {
    handleTOCVisible();
  }, [router]);

  if (record?.tableOfContents.length > 0) {
    console.log("tableOfContents:::::,", record);
  }
  return (
    record?.tableOfContents.length > 0 && (
      <>
        <div
          id="gitbook-toc-float"
          className={"hidden md:flex bg-amber-500 w-80"}
        >
          {/* side menu */}
          <div
            className={
              // (tocVisible
              //   ? "animate__slideInRight "
              //   : " -mr-72 animate__slideOutRight") +
              "overflow-y-hidden shadow-card w-60 duration-200 fixed right-1 bottom-16 rounded py-2 bg-white dark:bg-neutral-700"
            }
          >
            {record && (
              <>
                <div
                  onClick={handleTOCVisible}
                  className="bg-amber-500 w-full px-4 pb-2 flex justify-between items-center border-b font-bold"
                >
                  <span>{locale.COMMON.TABLE_OF_CONTENTS}</span>
                  <XIcon className="p-1 cursor-pointer" />
                </div>
                <div className="dark:text-neutral-400 text-neutral-600 px-3">
                  <TableOfContents props={props} />
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div
          id="right-drawer-background"
          className={
            (tocVisible ? "block" : "hidden") +
            " fixed top-0 left-0 z-30 w-full h-full"
          }
          onClick={switchVisible}
        /> */}
      </>
    )
  );
};

export default TocDrawerWrapper;
