"use client";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JumpToTopButton from "./JumpToTopButton";
// 사전에 사용할 아이콘 추가
library.add(faBook);
/**
 * BottomMenuBarion
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const BottomMenuBar = () => {
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal();

  const togglePageNavVisible = () => {
    if (changePageNavVisible) {
      changePageNavVisible();
    }
  };

  return (
    <div
      className={
        "sticky z-10 bottom-0 w-full h-12 bg-white dark:bg-neutral-700 block md:hidden"
      }
    >
      <div className="flex justify-between h-full shadow-card">
        <div
          onClick={togglePageNavVisible}
          className="flex w-full items-center justify-center cursor-pointer"
        >
          <FontAwesomeIcon icon={faBook} />
        </div>
        <div className="flex w-full items-center justify-center cursor-pointer">
          <JumpToTopButton />
        </div>
      </div>
    </div>
  );
};
export default BottomMenuBar;
