"use client";

import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

// 사전에 사용할 아이콘 추가
library.add(faBullhorn);

const NotionPage = dynamic(
  () => import("@/modules/common/components/shared/NotionPage"),
  {
    ssr: false,
  }
);

// 공지사항전용
const Announcement = () => {
  const { notice } = useGlobal({ from: "index" });
  if (notice?.blockMap) {
    return (
      notice.status === "Published" && (
        <div className="justify-center">
          <section id="announcement-wrapper" className="rounded-xl px-2 py-4">
            {
              <div id="announcement-content ">
                <NotionPage record={notice} />
              </div>
            }
          </section>
        </div>
      )
    );
  } else {
    return <></>;
  }
};
export default Announcement;
