import RecordBodyForPage from "./RecordBodyForPage";
import RecordIntroForPage from "./RecordIntroForPage";

export default function BasicRecordPage() {
  return (
    <div className="w-full flex flex-col items-center ">
      <RecordIntroForPage />
      <RecordBodyForPage />
    </div>
  );
}
