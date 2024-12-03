"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import dynamic from "next/dynamic";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faBullhorn);

const NotionPage = dynamic(() => import("@/components/shared/NotionPage"), {
  ssr: false,
});

// 공지사항전용
const Announcement = () => {
  const { notice } = useGlobal({ from: "index" });
  if (notice?.blockMap) {
    return (
      <div className="justify-center">
        <section
          id="announcement-wrapper"
          className="dark:text-neutral-300 rounded-xl px-2 py-4"
        >
          {notice && (
            <div id="announcement-content ">
              {/* <div>
                <FontAwesomeIcon className="mr-2" icon={faBullhorn} />
                공지
              </div> */}
              <NotionPage post={notice} />
            </div>
          )}
        </section>
      </div>
    );
  } else {
    return <></>;
  }
};
export default Announcement;
