"use client";
import NotFound from "@/app/not-found";
import { bookSource } from "@/lib/source";
import {
  generalIntroPageClass,
  isObjectNotEmpty,
  setAllPagesGetSortedGroupedByDate,
} from "@/lib/utils";
import BookGeneralRecordsBody from "@/modules/page/intropage/body/BookGeneralRecordsBody";
import BookIntro from "@/modules/page/intropage/intro/BookIntro";
import { SerializedPage } from "@/types";

const BookRecordsPage = () => {
  const pages = bookSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);

  const modAllPages = setAllPagesGetSortedGroupedByDate(
    pages as unknown as SerializedPage[]
  );
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <BookIntro />
      <BookGeneralRecordsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages as unknown as SerializedPage[]}
        type="BOOKS"
        subType={true}
        introTrue={false}
      />
    </div>
  );
};

export default BookRecordsPage;
