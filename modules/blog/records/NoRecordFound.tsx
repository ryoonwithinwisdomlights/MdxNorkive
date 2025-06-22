"use client";
import { useGlobal } from "@/context/globalProvider";
import React from "react";

const NoRecordFound = () => {
  const { locale } = useGlobal({ from: "index" });
  return (
    <div
      className="text-neutral-500 dark:text-neutral-300 flex flex-col w-full 
    items-center justify-center 
    min-h-screen mx-auto my-auto md:text-4xl text-2xl  "
    >
      {locale.COMMON.NO_RECORD_FOUND}
    </div>
  );
};

export default NoRecordFound;
