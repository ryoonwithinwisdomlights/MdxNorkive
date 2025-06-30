"use client";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
import NavPostList from "@/modules/layout/components/navigation-post/NavPostList";

/**
 * @param toc
 * @param record
 * @returns {JSX.Element}
 * @constructor
 */
const MobileLeftNavDrawer = () => {
  const { pageNavVisible, handleLeftNavVisible } = useNorkiveTheme();
  const switchVisible = () => {
    handleLeftNavVisible();
  };

  return (
    <>
      <div
        id="left-sidebar-float"
        className="fixed top-0 left-0 z-40 md:hidden"
      >
        {/* side menu */}
        <div
          className={
            (pageNavVisible
              ? "animate__slideInLeft "
              : "-ml-80 animate__slideOutLeft") +
            " overflow-y-hidden shadow-card w-72 duration-200 fixed left-1 top-16 rounded py-2 bg-white dark:bg-neutral-700"
          }
        >
          <div className="dark:text-neutral-200 text-neutral-600 h-96 overflow-y-scroll p-3">
            {/* List of all Archives */}
            <NavPostList />
          </div>
        </div>
      </div>
      {/* background mask */}
      <div
        id="left-drawer-background"
        className={
          (pageNavVisible ? "block" : "hidden") +
          " fixed top-0 left-0 z-30 w-full h-full"
        }
        onClick={switchVisible}
      />
    </>
  );
};

export default MobileLeftNavDrawer;
