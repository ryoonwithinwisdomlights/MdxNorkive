"use client";
import { BLOG } from "@/blog.config";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import { useLayoutEffect, useState } from "react";

import MobileBottomMenuBar from "./MobileBottomMenuBar";

// 사전에 사용할 아이콘 추가
library.add(faBook);

function toBlogNumber(a: any) {
  let tempVal: any;
  if (typeof a === "string") {
    tempVal = Number.isInteger(BLOG.SINCE);
  } else if (typeof a === "number") {
    tempVal = BLOG.SINCE;
    return tempVal;
  }
}

/**
 * BottomMenuBarion
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const BottomMenuBar = () => {
  const [time, setTime] = useState<Date>();
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    setTime(new Date());
  }, []);

  let copyrightDate;
  if (time) {
    const currentYear = time.getFullYear();
    const blogSince = toBlogNumber(BLOG.SINCE);
    copyrightDate = (function () {
      if (Number.isInteger(BLOG.SINCE) && blogSince < currentYear) {
        return BLOG.SINCE + "-" + currentYear;
      }
      return currentYear;
    })(); // 바로실행함수
  }

  return (
    <div
      className={
        "sticky z-20 bottom-0 w-full h-20 bg-neutral-50 dark:bg-neutral-800 block md:hidden "
      }
    >
      <div className="flex flex-col justify-between h-full shadow-card py-2">
        <MobileBottomMenuBar />

        <div className="flex flex-row justify-center  items-center  ">
          <div className="flex flex-row justify-center items-center text-center text-xs mr-2">
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
          <div className="text-xs font-sans">
            Powered By{" "}
            <a
              href={BLOG.CONTACT_GITHUB}
              className="underline text-neutral-500 dark:text-gray-300 font-semibold"
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
export default BottomMenuBar;
