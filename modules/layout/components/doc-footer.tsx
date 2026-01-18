"use client";
import { BLOG } from "@/blog.config";
import { COPYRIGHT_DATE_STATIC } from "@/lib/utils";
import { useEffect, useState } from "react";

const DocFooter = () => {
  const copyrightDate = COPYRIGHT_DATE_STATIC;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <footer
      className=" text-neutral-500 dark:text-neutral-300 w-full 
   text-sm  flex flex-col items-center "
    >
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
            className="text-gray-500 font-medium"
          >
            FumaDocs
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
