"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faSpinner);

export default function LoadingCover() {
  return (
    <div
      id="cover-loading"
      className={
        "z-50 opacity-50pointer-events-none transition-all duration-300"
      }
    >
      <div className="w-full h-screen flex justify-center items-center">
        <FontAwesomeIcon
          className="text-2xl text-black dark:text-white animate-spin"
          icon={faSpinner}
        />

        {/* <i className="fa-solid fa-spinner text-2xl text-black dark:text-white animate-spin">  </i> */}
      </div>
    </div>
  );
}
