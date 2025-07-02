import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { BookOpenTextIcon } from "lucide-react";
/**
 * Mobile article navigation buttons
 */
export default function MobileLeftNavButton() {
  const { handleLeftNavVisible } = useGeneralSiteSettings();

  const switchVisible = () => {
    handleLeftNavVisible();
  };
  return (
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
        {/* <span>{locale.COMMON.ARTICLE_LIST}</span> */}
      </a>
    </div>
  );
}
