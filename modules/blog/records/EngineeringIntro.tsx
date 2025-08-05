"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
const EngineeringIntro = () => {
  const { lang } = useGeneralSiteSettings();
  return (
    <div className="flex flex-col ">
      <div className="pr-3 flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 ">
        Browsing all the engineering related records you have
        learned&nbsp;&nbsp;
      </div>
      <div className="text-7xl   dark:text-neutral-100 flex flex-row justify-end ">
        Software Engineering.
      </div>
      {lang === "kr-KR" ? (
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700  text-right mt-1  my-2  text-2xl ">
          배우고 기록한 좋은
          <span className="font-semibold "> 지식, 정보, 앎</span>에 대한
          <span className="font-bold"> 아카이브.</span>
        </div>
      ) : (
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1  my-2 ">
          <span className=" font-bold">An archive </span>
          of good
          <span className="font-semibold ">
            {" "}
            knowledge, information, studies{" "}
          </span>
          learned and recorded
        </div>
      )}
    </div>
  );
};

export default EngineeringIntro;
