"use client";
import NotFound from "@/app/not-found";
import { recordSource } from "@/lib/source";
import { isObjectNotEmpty } from "@/lib/utils/general";
import { setAllPagesGetSortedGroupedByDate } from "@/lib/utils/records";
import BookGeneralRecordsBody from "@/modules/page/intropage/body/BookGeneralRecordsBody";
import GeneralIntro from "@/modules/page/intropage/intro/GeneralIntro";
import { generalIntroPageClass } from "@/types";

const GeneralRecordPage = () => {
  const pages = recordSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className={generalIntroPageClass}>
      <GeneralIntro />

      <BookGeneralRecordsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages}
        type="RECORDS"
        subType={true}
        introTrue={false}
      />
    </div>
  );
};

export default GeneralRecordPage;
