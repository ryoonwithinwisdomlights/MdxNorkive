"use client";
import { ElementRef, useRef } from "react";
import Footer from "./Footer";
import NavPostList from "./NavPostList";

const LeftNavigationBar = () => {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null); //타입이 div, default va은 null로
  return (
    <aside className="hidden md:fixed  md:left-0 md:block md:w-[22%] bg-neutral-50 dark:bg-neutral-900 border-r-2  border-neutral-100 dark:border-neutral-800  z-20">
      <div className="h-screen overflow-y-auto scrollbar-hide overscroll-contain">
        <div className="md:w-full px-6  ">
          <div className="mb-20 mt-10 pb-10">
            <NavPostList />
          </div>
        </div>
      </div>

      <div className="fixed md:w-[22%] bottom-0 z-20 bg-neutral-50 dark:bg-neutral-900 border-r-2  border-neutral-100 dark:border-neutral-800 ">
        <Footer />
      </div>
    </aside>
  );
};

export default LeftNavigationBar;
