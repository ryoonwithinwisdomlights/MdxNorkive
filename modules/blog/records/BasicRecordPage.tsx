import { CardInfoPageDivProps } from "@/types";
import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage({
  type,
  recordList,
}: CardInfoPageDivProps) {
  return (
    <div
      id="main-scroll-container"
      className="
   md:w-[60%]  md:px-20 px-10 flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
    >
      <RecordIntroForPage type={type} />
      <RecordBodyForPage type={type} recordList={recordList} />
    </div>
  );
}
