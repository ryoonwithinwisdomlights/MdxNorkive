import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage() {
  return (
    <div className="w-full flex flex-col items-center md:px-10 gap-10">
      <RecordIntroForPage />
      <RecordBodyForPage />
    </div>
  );
}
