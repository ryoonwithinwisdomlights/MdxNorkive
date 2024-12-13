"use client";

import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className=" justify-center items-center w-full h-full">
      <div
        id="cover-loading"
        className={
          "z-50 opacity-50pointer-events-none transition-all duration-300"
        }
      >
        <div className="w-full h-screen flex justify-center items-center">
          Loading...
          <LoaderIcon className="text-3xl text-black dark:text-white animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
