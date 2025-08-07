"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
const ProjectIntro = () => {
  const { lang } = useGeneralSiteSettings();
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 pr-3">
        Take a look all the Project Records&nbsp;&nbsp;
      </div>
      <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 pr-3">
        built based on the waves I 've been comming through.
      </div>
      <div className="text-7xl   dark:text-neutral-100 flex flex-row justify-end ">
        Various Projects.
      </div>
      <div className="text-2xl  dark:text-neutral-200 md:px-2 text-neutral-700 mt-1 text-right my-2  ">
        {lang === "kr-KR" ? (
          <>
            작고 큰 배움으로 연결된
            <span className="font-semibold "> Dev</span> 프로젝트에 대한
            <span className=" dark:text-[#ffffff] font-bold">
              &nbsp;아카이브.
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold ">Archive</span> of
            <span className="font-semibold "> All projects&nbsp;</span>
            connected by small and big learnings
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectIntro;
