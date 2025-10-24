"use client";
import { useThemeStore } from "@/lib/stores";

const EngineeringIntro = () => {
  const { locale } = useThemeStore();

  const { ENGINEERING } = locale.INTRO;

  return (
    <div className="flex flex-col w-full items-center">
      <div className="pr-3 flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 ">
        {ENGINEERING.SUBTITLE}
      </div>
      <div className="text-7xl   dark:text-neutral-100 flex flex-row justify-end ">
        {ENGINEERING.TITLE}
      </div>
      {locale.LOCALE === "kr-KR" ? (
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 text-right mt-1  my-2  text-2xl ">
          {ENGINEERING.DESCRIPTION_PREFIX}
          <span className="font-semibold ">
            {" "}
            {ENGINEERING.DESCRIPTION_HIGHLIGHT_1}
          </span>
          {ENGINEERING.DESCRIPTION_SUFFIX}
          <span className="font-bold">
            {" "}
            {ENGINEERING.DESCRIPTION_HIGHLIGHT_2}
          </span>
        </div>
      ) : (
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1  my-2 ">
          <span className=" font-bold">
            {ENGINEERING.DESCRIPTION_HIGHLIGHT_1}{" "}
          </span>
          {ENGINEERING.DESCRIPTION_SUFFIX}
          <span className="font-semibold ">
            {" "}
            {ENGINEERING.DESCRIPTION_HIGHLIGHT_2}{" "}
          </span>
          {ENGINEERING.DESCRIPTION_END}
        </div>
      )}
    </div>
  );
};

export default EngineeringIntro;
