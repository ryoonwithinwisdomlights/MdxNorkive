"use client";
/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import LazyImage from "@/components/shared/LazyImage";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SocialButton from "./SocialButton";

const InfoCard = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div id="info-card" className="py-4">
      <div className="items-center justify-center flex flex-col">
        <div
          className="hover:scale-105 transform duration-200 cursor-pointer flex justify-center"
          onClick={() => {
            router.push("/ryoon");
          }}
        >
          <LazyImage
            src={"/images/norkive_black.png"}
            className="rounded-full dark:border dark:border-neutral-300"
            width={120}
            alt={BLOG.AUTHOR}
          />
        </div>
        <div
          className="text-xl my-2 hover:scale-105
          hover:text-black text-neutral-700
         dark:text-neutral-100 dark:hover:text-white px-2 
         hover:rounded-lg hover:h-4/5 transform duration-200 flex justify-center
         hover:underline 
         decoration-[#f1efe9e2]
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
    </div>
  );
};

export default InfoCard;
