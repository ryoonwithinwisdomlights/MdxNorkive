import { BasicRecordPageType } from "@/types";
import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage({
  pageType,
  recordList,
}: BasicRecordPageType) {
  return (
    <div className="mb-10 pb-20 md:py-10 w-full py-3 flex flex-col min-h-full">
      <RecordIntroForPage pageType={pageType} />
      <RecordBodyForPage pageType={pageType} recordList={recordList} />
    </div>
  );
}
