"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div
      id="jump-to-back"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="fixed xl:right-80 right-2 mr-20 bottom-40 z-20 "
    >
      <div
        onClick={handleBack}
        className="hover:scale-110 duration-150 cursor-pointer p-2 rounded-full border text-white text-xs font-bold  bg-neutral-500 dark:border-white"
      >
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp; 뒤로 &nbsp;
      </div>
    </div>
  );
};

export default JumpToBackButton;
