"use client";
import React from "react";
import MainNav from "./nav/MainNav";
import Footer from "./footer/Footer";

type Props = {};

const LeftNavigationBar = (props: Props) => {
  return (
    <div
      className={
        "font-sans hidden md:block w-3/12 min-h-screen dark:bg-neutral-900 border-r dark:border-transparent  z-10 "
      }
    >
      {/* Search and list all articles */}
      <MainNav />
      <div className="w-72 fixed left-0 bottom-0 z-20 bg-white  dark:bg-neutral-900">
        <Footer />
      </div>
    </div>
  );
};

export default LeftNavigationBar;
