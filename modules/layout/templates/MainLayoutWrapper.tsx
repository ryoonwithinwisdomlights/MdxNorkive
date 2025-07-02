"use client";
import LeftNavigationBar from "@/modules/layout/components/LeftNavigationBar";
import React, { useEffect, useState } from "react";

const MainLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <main id="wrapper" className={" h-screen md:fixed md:left-[20%] w-full  "}>
      <div
        id="center-wrapper"
        className="flex flex-row   justify-between 
        z-20  bg-white dark:bg-black  dark:text-neutral-300 "
      >
        {children}
      </div>
    </main>
  );
};

export default MainLayoutWrapper;
