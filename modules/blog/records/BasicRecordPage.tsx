import { BasicRecordPageProps } from "@/types";
import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage({
  type,
  recordList,
}: BasicRecordPageProps) {
  return (
    <div
      className="dark:bg-black dark:text-neutral-300  md:px-20 px-10 pt-10 pb-40
   md:w-[60%]  flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
    >
      <RecordIntroForPage type={type} />
      <RecordBodyForPage type={type} recordList={recordList} />
    </div>
  );
}
