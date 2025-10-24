"use client";
import { useThemeStore } from "@/lib/stores";

const BookIntro = () => {
  const { locale } = useThemeStore();

  const { BOOK } = locale.INTRO;

  return (
    <div className="flex flex-col  w-full items-center">
      <div className="flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
        {BOOK.SUBTITLE_1}
      </div>
      <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
        {BOOK.SUBTITLE_2}
      </div>
      <div className="text-7xl hover:underline dark:text-neutral-100 flex flex-row justify-end ">
        {BOOK.TITLE}
      </div>
      <div className=" dark:text-neutral-200 text-right md:px-2 text-neutral-700 mt-1  my-2  text-2xl ">
        {locale.LOCALE === "kr-KR" ? (
          <>
            {BOOK.DESCRIPTION_PREFIX}
            <span className="font-semibold ">
              {" "}
              {BOOK.DESCRIPTION_HIGHLIGHT_1}
            </span>
            <span className=" dark:text-[#ffffff] font-bold">
              {" "}
              {BOOK.DESCRIPTION_HIGHLIGHT_2}
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold ">
              {BOOK.DESCRIPTION_HIGHLIGHT_1}
            </span>{" "}
            of
            <span className="font-semibold ">
              {" "}
              {BOOK.DESCRIPTION_HIGHLIGHT_2}{" "}
            </span>
            {BOOK.DESCRIPTION_SUFFIX}
          </>
        )}
      </div>
    </div>
  );
};

export default BookIntro;
