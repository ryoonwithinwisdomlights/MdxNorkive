import { useGitBookGlobal } from "@/themes/gitbook";
import JumpToTopButton from "./JumpToTopButton";

/**
 * BottomMenuBarion
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const BottomMenuBar = () => {
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal();

  const togglePageNavVisible = () => {
    changePageNavVisible(!pageNavVisible);
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
          <i className="fa-solid fa-book"></i>
        </div>
        <div className="flex w-full items-center justify-center cursor-pointer">
          <JumpToTopButton />
        </div>
      </div>
    </div>
  );
};
export default BottomMenuBar;
