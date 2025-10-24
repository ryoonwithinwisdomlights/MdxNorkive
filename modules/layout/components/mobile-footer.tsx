"use client";
import { BLOG } from "@/blog.config";
import { COPYRIGHT_DATE_STATIC } from "@/lib/utils";
import { useLayoutEffect, useState } from "react";

/**
 * MobileFooterion
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const MobileFooter = () => {
  const [time, setTime] = useState<Date>();
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    setTime(new Date());
  }, []);

  const copyrightDate = time ? COPYRIGHT_DATE_STATIC : undefined;

  return (
    <div
      className={
        "sticky z-20 bottom-0 w-full h-16 bg-neutral-50 dark:bg-neutral-800 block md:hidden "
      }
    >
      <div
        className="md:hidden fixed flex flex-col justify-center items-center
       bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-neutral-200 dark:bg-neutral-800 dark:border-neutral-600"
      >
        <div className="flex flex-row justify-center  items-center pb-2 text-xs">
          <div className="flex flex-row justify-center items-center text-center mr-2">
            <div className="flex flex-row justify-center items-centertext-center ">
              <a
                href={BLOG.LINK}
                className="underline font-bold text-neutral-500 dark:text-neutral-300 "
              >
                {BLOG.AUTHOR}
              </a>
              .<br />
            </div>
            © {`${copyrightDate}`}
          </div>
          <div className=" font-sans">
            Powered By{" "}
            <a
              href={BLOG.CONTACT_GITHUB}
              className="underline text-neutral-500 dark:text-neutral-300 font-semibold"
            >
              Norkive
            </a>
          </div>
          {/* SEO title */}
          <h1 className="pt-1 hidden">{BLOG.TITLE}</h1>
        </div>
      </div>
    </div>
  );
};
export default MobileFooter;
