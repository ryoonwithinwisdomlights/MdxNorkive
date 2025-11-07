"use client";
import { portfoliosSource } from "@/lib/source";
import PortfolioIntro from "@/modules/page/intropage/intro/PortfolioIntro";
import DocsBodyWithTwoOptions from "./body/DocsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass, isObjectNotEmpty } from "@/lib/utils";
import NotFound from "@/app/not-found";

const PortfolioDocsPage = () => {
  const pages = portfoliosSource.getPages().sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  if (!pages) NotFound();
  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <PortfolioIntro />
      <DocsBodyWithTwoOptions docs={pages as unknown as SerializedPage[]} />
    </div>
  );
};

export default PortfolioDocsPage;
