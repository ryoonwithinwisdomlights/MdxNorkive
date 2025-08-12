"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";

const GeneralIntro = () => {
  const { locale } = useGeneralSiteSettings();

  const { GENERAL } = locale.INTRO;

  return (
    <div className="flex flex-col  w-full justify-center items-center">
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
        <div className=" dark:text-neutral-200 text-right md:px-2 text-neutral-700 mt-1  my-2  text-2xl ">
          {locale.LOCALE === "kr-KR" ? (
            <>
              {GENERAL.DESCRIPTION_PREFIX}
              <span className="font-semibold ">
                {" "}
                {GENERAL.DESCRIPTION_HIGHLIGHT_1}
              </span>
              <span className=" dark:text-[#ffffff] font-bold">
                {" "}
                {GENERAL.DESCRIPTION_HIGHLIGHT_2}
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold ">
                {GENERAL.DESCRIPTION_HIGHLIGHT_1}
              </span>{" "}
              {GENERAL.DESCRIPTION_SUFFIX}
              <span className="font-semibold ">
                {" "}
                {GENERAL.DESCRIPTION_HIGHLIGHT_2}{" "}
              </span>
              {GENERAL.DESCRIPTION_END}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralIntro;
