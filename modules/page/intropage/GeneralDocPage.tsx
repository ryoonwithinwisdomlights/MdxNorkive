"use client";
import NotFound from "@/app/not-found";
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
  const pages = generalsSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  const modAllPages = setAllPagesGetSortedGroupedByDate(
    pages as unknown as SerializedPage[]
  );
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <GeneralIntro />

      <GeneralDocsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages as unknown as SerializedPage[]}
        type="Generals"
        docType={true}
        introTrue={false}
      />
    </div>
  );
};

export default GeneralDocPage;
