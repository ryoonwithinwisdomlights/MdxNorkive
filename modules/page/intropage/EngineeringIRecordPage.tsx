"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIntro from "@/modules/page/intropage/intro/EngineeringIntro";
import RecordsBodyWithTwoOptions from "./body/RecordsBodyWithTwoOptions";

const EngineeringIRecordPage = () => {
  const pages = engineeringSource.getPages();

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
      <EngineeringIntro />
      <RecordsBodyWithTwoOptions records={pages} />
    </div>
  );
};

export default EngineeringIRecordPage;
