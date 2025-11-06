"use client";
import { archivesSource } from "@/lib/source";
import EngineeringIntro from "@/modules/page/intropage/intro/EngineeringIntro";
import DocsBodyWithTwoOptions from "./body/DocsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass } from "@/lib/utils";

const EngineeringDocsPage = () => {
  const pages = archivesSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <EngineeringIntro />
      <DocsBodyWithTwoOptions docs={pages as unknown as SerializedPage[]} />
    </div>
  );
};

export default EngineeringDocsPage;
