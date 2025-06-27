"use client";

import { useGlobal } from "@/context/globalProvider";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
import { LoaderIcon } from "lucide-react";

const Loading = () => {
  const { locale } = useNorkiveTheme();
  return (
    <div className="  w-full h-screen flex flex-col justify-center items-center">
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
