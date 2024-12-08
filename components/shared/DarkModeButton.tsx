"use client"; // 클라이언트 컴포넌트

/* eslint-disable no-unused-vars */
// import { CloudMoon, CloudSun } from "@/lib/Icon";

import { useGlobal } from "@/lib/providers/globalProvider";
import { saveDarkModeToLocalStorage } from "@/lib/utils/theme";
import { CloudMoon, CloudSun } from "lucide-react";

/**
 * dark mode button
 */
const DarkModeButton = (props) => {
  const { className } = props;
  const { isDarkMode, handleChangeDarkMode } = useGlobal({ from: "index" });

  return (
    <div
      onClick={handleChangeDarkMode}
      className={`${className || ""}  dark:text-stone-200 `}
    >
      <div
        id="darkModeButton"
        className="w-6 h-6 flex flex-col  justify-center items-center   hover:scale-110 cursor-pointer transform duration-200 "
      >
        {isDarkMode ? (
          <CloudSun className=" text-[#f1efe9e2]  " />
        ) : (
          <CloudMoon className="text-[#f1efe9e2] " />
        )}
      </div>
    </div>
  );
};
export default DarkModeButton;
