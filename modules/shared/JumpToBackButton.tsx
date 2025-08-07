"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 사전에 사용할 아이콘 추가

/**
 * Jump to top of page
 * This control will appear when the screen slides down 500 pixels
 * @param targetRef Target html tag with associated height
 * @param showPercent Whether to display percentage
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToBackButton = () => {
  const router = useRouter();
  const { locale } = useGeneralSiteSettings();
  const handleBack = () => {
    router.back();
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;
  return (
    <div
      id="jump-to-back"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="hidden md:flex fixed xl:right-80 right-10 bottom-56 z-20 "
    >
      <div
        onClick={handleBack}
        className="flex flex-row item-center justify-center text-center hover:scale-110 
        duration-150 cursor-pointer p-2 rounded-full border-[1px] bg-white dark:bg-neutral-700 text-black  dark:text-white  border-neutral-800   dark:border-white"
      >
        <MoveLeftIcon className="w-4 mr-1" />
        <span className="text-sm "> {locale.SITE.BACK} &nbsp;</span>
      </div>
    </div>
  );
};

export default JumpToBackButton;
