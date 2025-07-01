"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { ListIcon } from "lucide-react";
import { useEffect, useState } from "react";

library.add(faListOl);
/**
 * Mobile directory button
 */
export default function MobileTOCButton() {
  const { handleTOCVisible, locale } = useNorkiveTheme();
  const { showTocButton } = useGlobal({ from: "index" });
  const switchVisible = () => {
    handleTOCVisible();
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    // <div
    //   onClick={switchVisible}
    //   className="fixed top-80 right-0  rounded-l-xl
    //   border-[1px] border-neutral-700  text-xs shadow-2xl   cursor-pointer
    //     z-30 text-black flex justify-center items-center
    //       dark:text-neutral-200 dark:bg-neutral-700 bg-white p-2"
    // >
    //   <a id="toc-button" className={"hover:scale-150 transform duration-200 "}>
    //     <ListIcon className="w-3" />
    //   </a>

    //   <div
    //     onClick={switchVisible}
    //     className={` text-black flex justify-center items-center dark:text-neutral-200 dark:bg-neutral-700py-2 px-2`}
    //   >
    //     <a
    //       id="toc-button"
    //       className={
    //         "space-x-4 text-xs cursor-pointer hover:scale-150 transform duration-200"
    //       }
    //     >
    //       <ListIcon />
    //     </a>
    //   </div>
    // </div>
    <div
      onClick={switchVisible}
      className={` text-black flex justify-center items-center dark:text-neutral-200 dark:bg-neutral-700 py-2 px-2`}
    >
      <a
        id="toc-button"
        className={
          "space-x-4 text-xs cursor-pointer hover:scale-150 transform duration-200"
        }
      >
        <ListIcon />
      </a>
    </div>
  );
}
