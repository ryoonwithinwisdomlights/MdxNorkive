"use client"; // 클라이언트 컴포넌트

import { useGlobal } from "@/context/globalProvider";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
import { Archive } from "lucide-react";

/**
 * dark mode button
 */
const DarkModeButton = (props) => {
  const { className } = props;
  const { isDarkMode, handleChangeDarkMode } = useNorkiveTheme();

  return (
    <div
      onClick={() => {
        handleChangeDarkMode(!isDarkMode);
      }}
      className={`${className || ""}  dark:text-neutral-200 `}
    >
      <div
        id="darkModeButton"
        data-tooltip={isDarkMode ? "light" : "dark"}
        className="w-6 h-6 flex flex-col  justify-center items-center   hover:scale-110 cursor-pointer transform duration-200 "
      >
        {isDarkMode ? (
          <Archive className=" text-[#f1efe9e2]  " />
        ) : (
          <Archive className="text-neutral-600" />
        )}
      </div>
    </div>
  );
};
export default DarkModeButton;
