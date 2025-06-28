import { BasicRecordPageProps } from "@/types";
import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage({
  type,
  recordList,
}: BasicRecordPageProps) {
  return (
    <div className="mb-10 pb-20 md:py-10 w-full py-3 flex flex-col min-h-full">
      <RecordIntroForPage type={type} />
      <RecordBodyForPage type={type} recordList={recordList} />
    </div>
  );
}
