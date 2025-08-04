"use client";
import { BLOG } from "@/blog.config";
import LazyImage from "@/modules/common/components/shared/LazyImage";

const RightSideInfoBar = () => {
  return (
    <div
      className="hidden md:w-[20%] h-screen md:fixed xl:block m-0
top-0 right-0 border-l  border-neutral-200 dark:border-transparent 
 z-10  pt-18  "
    >
      <div className=" px-10 py-6 overflow-hidden w-full h-[calc(100vh-150px)] relative  flex flex-col gap-2 ">
        <div className="flex flex-col items-center gap-1  ">
          <div
            className="flex flex-row 
          justify-center  items-center
          text-xs text-neutral-800 text-center
          font-extralight dark:text-neutral-200  "
          >
            "Browsing all your archives <br />
            written and recored in Notion."
          </div>
          <LazyImage
            src={"/images/norkive_black.png"}
            className=" dark:border ml-2 dark:border-neutral-300"
            width={180}
            alt={BLOG.AUTHOR}
          />
        </div>
        <div
          className="
        flex flex-col items-center justify-center break-words overflow "
        >
          <div className="  dark:text-neutral-300 flex flex-col  ">
            <div className="flex flex-row justify-center items-center gap-2 ">
              <div
                className="text-xs underline text-end flex flex-col 
             justify-end-safe text-neutral-600 dark:text-neutral-300 "
              >
                <span className="">Archive</span>
                <span className="">Recorded</span>
                <span className="">In notion</span>
              </div>
              <div
                className="text-6xl font-semibold
             text-black dark:text-white flex flex-row hover:underline 
         decoration-black justify-center dark:decoration-neutral-100 "
              >
                Norkive.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideInfoBar;
