"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faSpinner } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faSpinner);

/**
 * Placeholder for asynchronous file loading
 * @returns
 */
const Loading = (props) => {
  return (
    <div
      id="loading-container"
      className="-z-10 w-screen h-screen flex justify-center items-center fixed left-0 top-0"
    >
      <div id="loading-wrapper">
        <div className="loading">
          <FontAwesomeIcon className="animate-spin text-3xl" icon={faSpinner} />
        </div>
      </div>
    </div>
  );
};
export default Loading;
