"use client";

import { ChevronUpIcon, CornerLeftUp } from "lucide-react";

/**
 * Jump to top of page
 * This control will appear when the screen slides down 500 pixels
 * @param targetRef Target html tag with associated height
 * @param showPercent Whether to display percentage
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = () => {
  const handleScrollToTop = () => {
    const targetContainer = document.getElementById("main-scroll-container"); //
    if (targetContainer) {
      targetContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.warn("Scroll container not found!");
    }
  };
  return (
    <div
      id="jump-to-top"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="fixed xl:right-96 xl:mr-20 right-2 bottom-24 z-20 "
    >
      <CornerLeftUp
        onClick={handleScrollToTop}
        className="shadow  hover:scale-110 duration-150 cursor-pointer p-2 w-8 h-8 text-sm'
         rounded-full border dark:text-neutral-200 text-neutral-300 border-neutral-200 bg-black  dark:border-white"
      />
    </div>
  );
};

export default JumpToTopButton;
