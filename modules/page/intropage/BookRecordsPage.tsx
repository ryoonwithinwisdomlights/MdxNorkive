"use client";
import NotFound from "@/app/not-found";
import { bookSource } from "@/lib/source";
import {
  isObjectNotEmpty,
  setAllPagesGetSortedGroupedByDate,
} from "@/lib/utils";
import BookGeneralRecordsBody from "@/modules/page/intropage/body/BookGeneralRecordsBody";
import BookIntro from "@/modules/page/intropage/intro/BookIntro";
import { generalIntroPageClass } from "@/types";

const BookRecordsPage = () => {
  const pages = bookSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <BookIntro />
      <BookGeneralRecordsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages}
        type="BOOKS"
        subType={true}
        introTrue={false}
      />
    </div>
  );
};

export default BookRecordsPage;
