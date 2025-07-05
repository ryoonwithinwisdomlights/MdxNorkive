import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { BookOpenTextIcon } from "lucide-react";
/**
 * Mobile article navigation buttons
 */
export default function MobileLeftNavButton() {
  const { pageNavVisible, handleLeftNavVisible } = useGeneralSiteSettings();

  const switchVisible = () => {
    handleLeftNavVisible();
  };
  return (
    <>
      <div
        onClick={switchVisible}
        className="text-black flex justify-center 
      items-center dark:text-neutral-200
       dark:bg-neutral-700 py-2 px-2"
      >
        <a
          id="nav-button"
          className={
            "space-x-4 cursor-pointer hover:scale-150 transform duration-200 flex flex-col justify-center"
          }
        >
          <BookOpenTextIcon />
        </a>
      </div>
      <div
        id="right-drawer-background"
        className={
          (pageNavVisible ? "block" : "hidden") +
          " fixed top-0 left-0 z-30 w-full h-full bg-white dark:bg-neutral-800 opacity-70  "
        }
        onClick={switchVisible}
      />
    </>
  );
}
