"use client";
import { useGlobal } from "@/context/globalProvider";
import React from "react";

const NoRecordFound = () => {
  const { locale } = useGlobal({ from: "index" });
  return (
    <div className="text-neutral-500 dark:text-neutral-300 flex flex-col w-full items-center justify-center min-h-screen mx-auto md:-mt-20">
      <div className="">{locale.COMMON.NO_RECORD_FOUND} </div>
    </div>
  );
};

export default NoRecordFound;
