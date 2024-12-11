"use client";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JumpToTopButton from "./JumpToTopButton";
import MobileButtonPageNav from "./MobileButtonPageNav";
import MobileButtonCatalog from "./MobileButtonCatalog";
import { usePathname } from "next/navigation";
import { BLOG } from "@/blog.config";

// 사전에 사용할 아이콘 추가
library.add(faBook);

function toBlogNumber(a: any) {
  let tempVal: any;
  if (typeof a === "string") {
    tempVal = Number.isInteger(BLOG.SINCE);
  } else if (typeof a === "number") {
    tempVal = BLOG.SINCE;
    return tempVal;
  }
}

/**
 * BottomMenuBarion
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const BottomMenuBar = () => {
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal();
  const pathname = usePathname();
  const togglePageNavVisible = () => {
    changePageNavVisible();
  };
  const d = new Date();
  const currentYear = d.getFullYear();
  const blogSince = toBlogNumber(BLOG.SINCE);
  const copyrightDate = (function () {
    if (Number.isInteger(BLOG.SINCE) && blogSince < currentYear) {
      return BLOG.SINCE + "-" + currentYear;
    }
    return currentYear;
  })(); // 바로실행함수

  return (
    <div
      className={
        "sticky z-20 bottom-0 w-full h-12 bg-white dark:bg-neutral-700 block md:hidden"
      }
    >
      <div className="flex  justify-between h-full shadow-card">
        <div className="flex flex-col py-2 pl-4">
          <div className="flex flex-row justify-center text-center  items-center text-xs">
            <div className="flex flex-row justify-center text-center  items-center ">
              <a
                href={BLOG.LINK}
                className="underline font-bold text-neutral-500 dark:text-neutral-300 "
              >
                {BLOG.AUTHOR}
              </a>
              .<br />
            </div>
            © {`${copyrightDate}`}
          </div>
          <div className="text-xs font-sans">
            Powered By{" "}
            <a
              href={BLOG.CONTACT_GITHUB}
              className="underline text-gray-500 dark:text-gray-300 font-semibold"
            >
              Norkive
            </a>
          </div>
          {/* SEO title */}
          <h1 className="pt-1 hidden">{BLOG.TITLE}</h1>
        </div>
        <div
          onClick={togglePageNavVisible}
          className="flex  items-center justify-end cursor-pointer"
        >
          {/* <FontAwesomeIcon icon={faBook} /> */}
          <MobileButtonPageNav />
          {/* <MobileButtonCatalog /> */}
        </div>
      </div>
    </div>
  );
};
export default BottomMenuBar;
