import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage() {
  return (
    <div
      className="w-full flex flex-col items-center "
      //     className="
      //  md:w-[60%]  md:px-20 px-10 flex flex-col overflow-y-auto h-screen pb-60 scrollbar-hide overscroll-contain "
    >
      <RecordIntroForPage />
      <RecordBodyForPage />
    </div>
  );
}
