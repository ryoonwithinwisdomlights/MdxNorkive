"use client";
import { techsSource } from "@/lib/source";

import DocsBodyWithTwoOptions from "./body/DocsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass } from "@/lib/utils";
import TechsIntro from "./intro/TechsIntro";

const TechsDocsPage = () => {
  const pages = techsSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <TechsIntro />
      <DocsBodyWithTwoOptions docs={pages as unknown as SerializedPage[]} />
    </div>
  );
};

export default TechsDocsPage;
