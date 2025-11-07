"use client";
import { useThemeStore } from "@/lib/stores";

const GeneralIntro = () => {
  const { locale } = useThemeStore();

  const { GENERAL } = locale.INTRO;

  return (
    <div className="flex flex-col  w-full justify-center items-center mb-3">
      <div className="flex flex-col  ">
        <div className="flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
          {GENERAL.SUBTITLE_1}
        </div>
        <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
          {GENERAL.SUBTITLE_2}
        </div>
        <div className="text-7xl hover:underline dark:text-neutral-100 flex flex-row justify-end ">
          {GENERAL.TITLE}
        </div>
      </div>
    </div>
  );
};

export default GeneralIntro;
