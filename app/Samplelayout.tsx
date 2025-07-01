import LeftNavigationBar from "@/modules/layout/templates/LeftNavigationBar";
import React from "react";

const Samplelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      id="wrapper"
      className={"relative flex justify-between w-full min-h-screen  mx-auto"}
    >
      {/* left navigation bar */}
      <LeftNavigationBar />
      <div
        id="center-wrapper"
        className="flex flex-row w-full relative z-10 pt-14 min-h-screen bg-white dark:bg-black dark:text-neutral-300"
      >
        {/* <div className="flex flex-row justify-between w-full relative z-10  "> */}
        <div
          id="container-inner"
          className="w-full justify-between mx-auto relative z-10"
        >
          {children}
          {/* <RightSlidingDrawer /> */}
        </div>

        {/* </div> */}
      </div>
      {/*  right sliding drawer */}
    </main>
  );
};

export default Samplelayout;
