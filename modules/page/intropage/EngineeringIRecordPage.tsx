"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIntro from "@/modules/page/intropage/intro/EngineeringIntro";
import EngineeringRecordsBody from "./body/EngineeringRecordsBody";

const EngineeringIRecordPage = () => {
  const pages = engineeringSource.getPages();

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
      <EngineeringIntro />
      <EngineeringRecordsBody records={pages} />
    </div>
  );
};

export default EngineeringIRecordPage;
