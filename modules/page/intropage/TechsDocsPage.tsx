"use client";
import { techsSource } from "@/lib/source";

import DocsBodyWithTwoOptions from "./body/DocsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass, isObjectNotEmpty } from "@/lib/utils";
import NotFound from "@/app/not-found";
import TechsIntro from "./intro/TechsIntro";

const TechsDocsPage = () => {
  const pages = techsSource.getPages().sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  if (!pages) NotFound();
  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <TechsIntro />
      <DocsBodyWithTwoOptions docs={pages as unknown as SerializedPage[]} />
    </div>
  );
};

export default TechsDocsPage;
