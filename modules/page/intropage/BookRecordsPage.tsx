"use client";
import NotFound from "@/app/not-found";
import { bookSource } from "@/lib/source";
import { isObjectNotEmpty } from "@/lib/utils/general";
import { setAllPagesGetSortedGroupedByDate } from "@/lib/utils/records";
import BookGeneralRecordsBody from "@/modules/page/intropage/body/BookGeneralRecordsBody";
import BookIntro from "@/modules/page/intropage/intro/BookIntro";

const BookRecordsPage = () => {
  const pages = bookSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className="w-full  max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
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
