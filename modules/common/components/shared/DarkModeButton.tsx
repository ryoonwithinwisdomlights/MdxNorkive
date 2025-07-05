"use client"; // 클라이언트 컴포넌트

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { Archive, Settings2Icon } from "lucide-react";

/**
 * dark mode button
 */
const DarkModeButton = (props) => {
  const { className } = props;
  const { isDarkMode, handleChangeDarkMode } = useGeneralSiteSettings();

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
          <Settings2Icon className=" text-norkive-light  " />
        ) : (
          <Settings2Icon className="text-neutral-600" />
        )}
      </div>
    </div>
  );
};
export default DarkModeButton;
