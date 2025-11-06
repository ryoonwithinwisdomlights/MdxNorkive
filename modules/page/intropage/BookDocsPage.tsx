"use client";
import NotFound from "@/app/not-found";
import { generalsSource } from "@/lib/source";
import {
  generalIntroPageClass,
  isObjectNotEmpty,
  setAllPagesGetSortedGroupedByDate,
} from "@/lib/utils";
import GeneralDocsBody from "@/modules/page/intropage/body/GeneralDocsBody";
import BookIntro from "@/modules/page/intropage/intro/BookIntro";
import { SerializedPage } from "@/types";

const BookDocsPage = () => {
  const pages = generalsSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);

  const modAllPages = setAllPagesGetSortedGroupedByDate(
    pages as unknown as SerializedPage[]
  );
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <BookIntro />
      <GeneralDocsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages as unknown as SerializedPage[]}
        type="Generals"
        docType={false}
        introTrue={false}
      />
    </div>
  );
};

export default BookDocsPage;
