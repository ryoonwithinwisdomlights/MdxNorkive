"use client";
import EngineeringIntro from "@/modules/intropage/intro/EngineeringIntro";
import RecordBodyForPage from "@/modules/intropage/body/RecordBodyForPage";
const EngineeringIRecordPage = (pages) => {
  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <EngineeringIntro />
      <RecordBodyForPage records={pages} />
    </div>
  );
};

export default EngineeringIRecordPage;
