"use client";

import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
const EngineeringIntro = () => {
  const { lang } = useNorkiveTheme();
  return (
    <div className="mb-4  mr-4 flex flex-col justify-end">
      <div className="flex flex-row justify-end text-xs  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 ">
        browsing all the engineering related records you have learned
      </div>
      <div className="text-4xl  dark:text-neutral-100 flex flex-row justify-end ">
        Software Engineering <span className="text-[#f1efe9e2]">.</span>
      </div>
      {lang === "kr-KR" ? (
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1 text-right my-2 mr-4 ">
          배우고 기록한 좋은
          <span className="font-semibold "> 지식, 정보, 앎</span>에 대한
          <span className=" dark:text-[#ffffff] font-bold"> 아카이브.</span>
        </div>
      ) : (
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1 text-right my-2 ">
          <span className=" dark:text-[#ffffff] font-bold">An archive </span>
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
