"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIntro from "@/modules/page/intropage/intro/EngineeringIntro";
import RecordsBodyWithTwoOptions from "./body/RecordsBodyWithTwoOptions";
import { generalIntroPageClass } from "@/types";

const EngineeringIRecordPage = () => {
  const pages = engineeringSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <EngineeringIntro />
      <RecordsBodyWithTwoOptions records={pages} />
    </div>
  );
};

export default EngineeringIRecordPage;
