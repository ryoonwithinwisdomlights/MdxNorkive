"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faSpinner);

const Loading = () => {
  return (
    <div className=" justify-center items-center w-full h-full">
      <div
        id="cover-loading"
        className={
          "z-50 opacity-50pointer-events-none transition-all duration-300"
        }
      >
        <div className="w-full h-screen flex justify-center items-center">
          Loading...
          <FontAwesomeIcon
            className="text-3xl text-black dark:text-white animate-spin"
            icon={faSpinner}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
