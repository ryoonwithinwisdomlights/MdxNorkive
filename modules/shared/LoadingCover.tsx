"use client";

import { useThemeStore } from "@/lib/stores";
import { LoaderIcon } from "lucide-react";

export default function LoadingCover() {
  const { locale } = useThemeStore();
  return (
    <div
      id="cover-loading"
      className="z-50 opacity-50 pointer-events-none transition-all 
          duration-300 w-full h-full flex flex-row justify-center items-center"
    >
      <div className="w-full h-full flex flex-row justify-center items-center">
        {locale.COMMON.LOADING}
        <LoaderIcon className="text-3xl text-black dark:text-white animate-spin" />
      </div>
    </div>
  );
}
