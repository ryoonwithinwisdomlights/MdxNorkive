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
    <div
      id="show-table-of-contents"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="md:hidden fixed xl:right-10 -right-16 mr-20 top-72 z-20 "
    >
      <div
        onClick={switchVisible}
        className="flex flex-row item-center justify-center text-center  cursor-pointer 
        p-2 gap-1 rounded-l-xl rounded-r-xl border-[1px] bg-white bg-opacity-95 
         dark:bg-neutral-800 text-amber-400
          border-amber-100"
      >
        <ListIcon className="w-6 h-6" />
      </div>
    </div>
    // <div
    //   onClick={switchVisible}
    //   className="fixed top-80 right-0  rounded-l-xl
    //   border-[1px] border-neutral-700  text-xs shadow-2xl   cursor-pointer
    //     z-30 text-black flex justify-center items-center
    //       dark:text-gray-200 dark:bg-neutral-700 bg-white p-2"
    // >
    //   <a id="toc-button" className={"hover:scale-150 transform duration-200 "}>
    //     <ListIcon className="w-3" />
    //   </a>
    // </div>
    //     <div
    //   onClick={switchVisible}
    //   className={` text-black flex justify-center items-center dark:text-gray-200 dark:bg-neutral-700py-2 px-2`}
    // >
    //   <a
    //     id="toc-button"
    //     className={
    //       "space-x-4 text-xs cursor-pointer hover:scale-150 transform duration-200"
    //     }
    //   >
    //     <ListIcon />
    //   </a>
    // </div>
  );
}
