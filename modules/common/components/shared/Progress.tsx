"use client";
import React, { useEffect, useState } from "react";
import { isBrowser } from "@/lib/utils/utils";
import { useMediaQuery } from "usehooks-ts";
const isMobile = useMediaQuery("(max-width: 768px");
/**
 * Top page reading progress bar
 * @returns {JSX.Element}
 * @constructor
 */
const Progress = ({ targetRef, showPercent = true }) => {
  const currentRef = targetRef?.current || targetRef;
  const [percent, changePercent] = useState(0);
  const scrollListener = () => {
    const target =
      currentRef || (isBrowser && document.getElementById("records-wrapper"));
    if (target) {
      const clientHeight = target.clientHeight;
      const scrollY = window.pageYOffset;
      const fullHeight = clientHeight - window.outerHeight;
      let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0));
      if (per > 100) per = 100;
      if (per < 0) per = 0;
      changePercent(per);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollListener);
    return () => document.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div className="h-4 w-full shadow-2xl bg-neutral-light-gray dark:bg-black">
      <div
        className="h-4 bg-neutral-600 duration-200"
        style={{ width: `${percent}%` }}
      >
        {showPercent && (
          <div className="text-right text-white text-xs">{percent}%</div>
        )}
      </div>
    </div>
  );
};

export default Progress;
