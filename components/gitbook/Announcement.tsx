"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import dynamic from "next/dynamic";

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
                <i className="mr-2 fas fa-bullhorn" />
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
