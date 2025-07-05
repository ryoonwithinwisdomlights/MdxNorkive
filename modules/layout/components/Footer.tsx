"use client";
import { BLOG } from "@/blog.config";
import { useEffect, useState } from "react";

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
  })();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <footer className="z-20 py-2  dark:text-neutral-300 justify-center text-center  text-sm ">
      <hr className="pb-2" />

      <div className="text-xs font-sans">
        Powered By{" "}
        <a
          href={BLOG.CONTACT_GITHUB}
          className="underline text-neutral-500 dark:text-neutral-300 font-semibold"
        >
          Norkive
        </a>
      </div>
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
      {/* SEO title */}
      <h1 className="pt-1 hidden">{BLOG.TITLE}</h1>
    </footer>
  );
};

export default Footer;
