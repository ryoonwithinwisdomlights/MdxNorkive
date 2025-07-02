"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { ListIcon } from "lucide-react";
import { useEffect, useState } from "react";

library.add(faListOl);
/**
 * Mobile directory button
 */
export default function MobileTOCButton() {
  const { handleTOCVisible, locale } = useGeneralSiteSettings();
  // const { showTocButton } = useGlobal({ from: "index" });
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
