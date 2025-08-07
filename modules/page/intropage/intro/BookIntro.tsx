"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";

const BookIntro = () => {
  const { lang } = useGeneralSiteSettings();

  return (
    <div className="flex flex-col  ">
      <div className="flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
        Take a look all the Book Records&nbsp;&nbsp;
      </div>
      <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
        based on all the Words and World of sentences.
      </div>
      <div className="text-7xl hover:underline dark:text-neutral-100 flex flex-row justify-end ">
        Book Records.
      </div>
      <div className=" dark:text-neutral-200 text-right md:px-2 text-neutral-700 mt-1  my-2  text-2xl ">
        {lang === "kr-KR" ? (
          <>
            언어와 문장들로
            <span className="font-semibold "> 이루어진</span>
            <span className=" dark:text-[#ffffff] font-bold">
              &nbsp;아카이브.
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold ">Archive</span> of
            <span className="font-semibold "> All Books&nbsp;</span>
            connected by small and big words.
          </>
        )}
      </div>
    </div>
  );
};

export default BookIntro;
