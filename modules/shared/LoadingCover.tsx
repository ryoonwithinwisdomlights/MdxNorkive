"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { LoaderIcon } from "lucide-react";

export default function LoadingCover() {
  const { locale } = useGeneralSiteSettings();
  return (
    <div
      id="cover-loading"
      className="z-50 opacity-50pointer-events-none transition-all 
          duration-300 w-full h-full flex flex-row justify-center items-center"
    >
      <div className="w-full h-full flex flex-row justify-center items-center">
        {locale.COMMON.LOADING}
        <LoaderIcon className="text-3xl text-black dark:text-white animate-spin" />
      </div>
    </div>
  );
}
