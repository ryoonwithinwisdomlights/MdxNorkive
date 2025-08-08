"use client";
import { engineeringSource } from "@/lib/source";
import RecordBodyForPage from "@/modules/page/intropage/body/RecordBodyForPage";
import EngineeringIntro from "@/modules/page/intropage/intro/EngineeringIntro";

const EngineeringIRecordPage = () => {
  const pages = engineeringSource.getPages();

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
      <EngineeringIntro />
      <RecordBodyForPage records={pages} />
    </div>
  );
};

export default EngineeringIRecordPage;
