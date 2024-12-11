"use client";
import { BLOG } from "@/blog.config";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

library.add(faEye, faUsers);
function toBlogNumber(a: any) {
  let tempVal: any;
  if (typeof a === "string") {
    tempVal = Number.isInteger(BLOG.SINCE);
  } else if (typeof a === "number") {
    tempVal = BLOG.SINCE;
    return tempVal;
  }
}

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();
  const blogSince = toBlogNumber(BLOG.SINCE);
  const copyrightDate = (function () {
    if (Number.isInteger(BLOG.SINCE) && blogSince < currentYear) {
      return BLOG.SINCE + "-" + currentYear;
    }
    return currentYear;
  })(); // 바로실행함수
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;
  return (
    <footer className="z-20 py-2 bg-white  dark:bg-neutral-900 dark:text-neutral-300 justify-center text-center w-full text-sm relative">
      <hr className="pb-2" />
      <div className="flex justify-center text-xs">
        <div>
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
          className="underline text-gray-500 dark:text-gray-300 font-semibold"
        >
          Norkive
        </a>
      </div>
      {/* SEO title */}
      <h1 className="pt-1 hidden">{BLOG.TITLE}</h1>
    </footer>
  );
};

export default Footer;
