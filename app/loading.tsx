"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { LoaderIcon } from "lucide-react";

const Loading = () => {
  const { locale } = useGeneralSiteSettings();
  return (
    <div className="md:w-2/3 h-screen flex flex-col justify-center items-center  px-20">
      <div
        id="cover-loading"
        className="z-50 opacity-50pointer-events-none transition-all 
          duration-300 w-full h-full flex flex-row justify-center items-center"
      >
        <span className="text-3xl text-stone-700 dark:text-stone-200">
          {locale.LOADING}
        </span>
        <LoaderIcon className="w-8 h-8 text-stone-700 dark:text-stone-200 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
