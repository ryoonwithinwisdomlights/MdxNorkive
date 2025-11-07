"use client";
import NotFound from "@/app/not-found";
import { DOCS_CONFIG } from "@/config/docs.config";
import { generalsSource } from "@/lib/source";
import {
  generalIntroPageClass,
  isObjectNotEmpty,
  setAllPagesGetSortedGroupedByDate,
} from "@/lib/utils";

import GeneralDocsBody from "@/modules/page/intropage/body/GeneralDocsBody";
import GeneralIntro from "@/modules/page/intropage/intro/GeneralIntro";
import { SerializedPage } from "@/types";

const GeneralDocPage = () => {
  const pages = generalsSource.getPages().sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  const modAllPages = setAllPagesGetSortedGroupedByDate(
    pages as unknown as SerializedPage[]
  );
  console.log("pages:", pages);
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <GeneralIntro />
      <GeneralDocsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages as unknown as SerializedPage[]}
        type={DOCS_CONFIG.DOCS_TYPE.GENERALS}
        docType={true}
        introTrue={false}
      />
    </div>
  );
};

export default GeneralDocPage;
