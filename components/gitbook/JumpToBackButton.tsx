"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faChevronLeft);

/**
 * Jump to top of page
 * This control will appear when the screen slides down 500 pixels
 * @param targetRef Target html tag with associated height
 * @param showPercent Whether to display percentage
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToBackButton = () => {
  return (
    <div
      id="jump-to-back"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="fixed xl:right-80 right-2 mr-20 bottom-40 z-20 "
    >
      <div className="hover:scale-110 duration-150 cursor-pointer p-2 rounded-full border text-white text-xs  bg-stone-500">
        {" "}
        <FontAwesomeIcon
          onClick={() => {
            if (typeof window !== "undefined") {
              window.history.back();
            }
          }}
          icon={faChevronLeft}
        />{" "}
        &nbsp; 뒤로 &nbsp;
      </div>
    </div>
  );
};

export default JumpToBackButton;
