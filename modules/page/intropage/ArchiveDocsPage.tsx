"use client";
import { archivesSource } from "@/lib/source";
import ArchivieIntro from "@/modules/page/intropage/intro/ArchivieIntro";
import DocsBodyWithTwoOptions from "./body/DocsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass } from "@/lib/utils";

const ArchiveDocsPage = () => {
  const pages = archivesSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <ArchivieIntro />
      <DocsBodyWithTwoOptions docs={pages as unknown as SerializedPage[]} />
    </div>
  );
};

export default ArchiveDocsPage;
