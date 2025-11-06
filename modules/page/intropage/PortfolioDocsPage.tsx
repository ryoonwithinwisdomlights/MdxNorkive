"use client";
import { portfoliosSource } from "@/lib/source";
import PortfolioIntro from "@/modules/page/intropage/intro/PortfolioIntro";
import DocsBodyWithTwoOptions from "./body/DocsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass } from "@/lib/utils";

const PortfolioDocsPage = () => {
  const pages = portfoliosSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <PortfolioIntro />
      <DocsBodyWithTwoOptions docs={pages as unknown as SerializedPage[]} />
    </div>
  );
};

export default PortfolioDocsPage;
