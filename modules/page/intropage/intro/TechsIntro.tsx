"use client";
import { useThemeStore } from "@/lib/stores";

const TechsIntro = () => {
  const { locale } = useThemeStore();

  const { TECH } = locale.INTRO;

  return (
    <div className="flex flex-col w-full items-center mb-3">
      <div className="pr-3 flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 ">
        {TECH.SUBTITLE}
      </div>
      <div className="text-7xl   dark:text-neutral-100 flex flex-row justify-end ">
        {TECH.TITLE}
      </div>
    </div>
  );
};

export default TechsIntro;
