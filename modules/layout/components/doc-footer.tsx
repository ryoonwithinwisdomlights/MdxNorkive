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

const DocFooter = () => {
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
    <footer
      className="border-t text-neutral-500 dark:text-neutral-300 w-full 
   text-sm  flex flex-col px-4 py-3 items-center "
    >
      {/* <hr className="pb-2" /> */}

      <div className=" flex flex-row gap-2 justify-center">
        {" "}
        <p className="text-xs font-sans">
          Powered By{" "}
          <a
            href={BLOG.CONTACT_GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className=" text-amber-500 font-semibold"
          >
            Norkive,
          </a>
        </p>
        <p className="text-xs">
          Built with{" "}
          <a
            href="https://fuma-dev.vercel.app"
            rel="noreferrer noopener"
            target="_blank"
            className="text-blue-500 font-medium"
          >
            Fuma
          </a>
        </p>
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

export default DocFooter;
