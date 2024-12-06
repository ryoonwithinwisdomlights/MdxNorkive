"use client"; // 클라이언트 컴포넌트

/* eslint-disable no-unused-vars */
// import { CloudMoon, CloudSun } from "@/lib/Icon";

import { useGlobal } from "@/lib/providers/globalProvider";
import { saveDarkModeToCookies } from "@/lib/utils/theme";
import { CloudMoon, CloudSun } from "lucide-react";

/**
 * dark mode button
 */
const DarkModeButton = (props) => {
  const { className } = props;
  const { isDarkMode, updateDarkMode } = useGlobal({ from: "index" });

  /**
   * External exposure method
   */
  // useImperativeHandle(cRef, () => {
  //   return {
  //     handleChangeDarkMode: () => {
  //       handleChangeDarkMode();
  //     },
  //   };
  // });

  // User sets theme manually
  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode;
    saveDarkModeToCookies(newStatus);
    updateDarkMode(newStatus);
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList?.remove(newStatus ? "light" : "dark");
    htmlElement.classList?.add(newStatus ? "dark" : "light");
  };

  return (
    <div
      onClick={handleChangeDarkMode}
      className={`${
        className || ""
      } flex justify-center dark:text-neutral-200 text-neutral-800`}
    >
      <div
        id="darkModeButton"
        className=" hover:scale-110 cursor-pointer transform duration-200 w-5 h-5"
      >
        {isDarkMode ? <CloudSun /> : <CloudMoon />}
      </div>
    </div>
  );
};
export default DarkModeButton;
