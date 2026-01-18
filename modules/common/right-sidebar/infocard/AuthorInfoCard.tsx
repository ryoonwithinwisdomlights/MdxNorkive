"use client";
/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { useUIStore } from "@/lib/stores";
import InlineTocCustomed from "@/modules/common/toc/InlineTocCustomed";
import LazyImage from "@/modules/shared/LazyImage";
import SocialButton from "@/modules/shared/SocialButton";
import Link from "next/link";

const AuthorInfoCard = () => {
  const { tocContent } = useUIStore();

  return (
    <div className="w-full  items-center justify-center flex flex-col gap-2">
      {tocContent.length > 0 && (
        <InlineTocCustomed
          items={tocContent}
          defaultOpen={false}
          className=" bg-fd-accent/50 dark:bg-neutral-800 mb-4"
        />
      )}

      <Link
        href={BLOG.LINK || "/"}
        className="hover:scale-105 transform duration-200 cursor-pointer flex justify-center"
      >
        <LazyImage
          src={"/images/norkive_black.jpg"}
          className="rounded-full dark:border dark:border-neutral-300"
          width={120}
          height={120}
          alt={BLOG.AUTHOR}
        />
      </Link>
      <div
        className="text-xl my-2 hover:scale-105
          hover:text-black text-neutral-700
         dark:text-neutral-100 dark:hover:text-white px-2 
         hover:rounded-lg hover:h-4/5 transform duration-200 flex justify-center
         hover:underline 
         decoration-norkive-light
         "
      >
        {BLOG.AUTHOR}
      </div>
      <div
        className="font-light w-3/6 text-neutral-600 mb-8
        hover:scale-105 transform duration-200
        flex justify-center text-center dark:text-neutral-300
          dark:hover:text-white"
      >
        {BLOG.BIO}
      </div>
      <SocialButton />
    </div>
  );
};

export default AuthorInfoCard;
