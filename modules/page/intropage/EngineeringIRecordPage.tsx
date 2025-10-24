"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIntro from "@/modules/page/intropage/intro/EngineeringIntro";
import RecordsBodyWithTwoOptions from "./body/RecordsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass } from "@/lib/utils";

const EngineeringIRecordPage = () => {
  const pages = engineeringSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <EngineeringIntro />
      <RecordsBodyWithTwoOptions
        records={pages as unknown as SerializedPage[]}
      />
    </div>
  );
};

export default EngineeringIRecordPage;
