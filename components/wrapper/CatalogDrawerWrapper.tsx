"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Catalog from "../Catalog";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import { useGlobal } from "@/lib/providers/globalProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faTimes);

/**
 * Floating drawer catalog
 * @param toc
 * @param post
 * @returns {JSX.Element}
 * @constructor
 */
const CatalogDrawerWrapper = ({ post }) => {
  const { tocVisible, changeTocVisible } = useGitBookGlobal();
  const { locale } = useGlobal({ from: "index" });
  const router = useRouter();
  const switchVisible = () => {
    changeTocVisible();
  };
  useEffect(() => {
    changeTocVisible();
  }, [router]);
  return (
    <>
      <div
        id="gitbook-toc-float"
        className="fixed top-0 right-0 z-40 md:hidden"
      >
        {/* side menu */}
        <div
          className={
            (tocVisible
              ? "animate__slideInRight "
              : " -mr-72 animate__slideOutRight") +
            " overflow-y-hidden shadow-card w-60 duration-200 fixed right-1 bottom-16 rounded py-2 bg-white dark:bg-hexo-black-gray"
          }
        >
          {post && (
            <>
              <div
                onClick={() => {
                  changeTocVisible();
                }}
                className="px-4 pb-2 flex justify-between items-center border-b font-bold"
              >
                <span>{locale.COMMON.TABLE_OF_CONTENTS}</span>

                <FontAwesomeIcon
                  className="p-1 cursor-pointer"
                  icon={faTimes}
                />
              </div>
              <div className="dark:text-gray-400 text-gray-600 px-3">
                <Catalog post={post} />
              </div>
            </>
          )}
        </div>
      </div>
      {/* background mask */}
      <div
        id="right-drawer-background"
        className={
          (tocVisible ? "block" : "hidden") +
          " fixed top-0 left-0 z-30 w-full h-full"
        }
        onClick={switchVisible}
      />
    </>
  );
};
export default CatalogDrawerWrapper;
