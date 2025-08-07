"use client";

import { EntireRecordsWithDateSortWrapper } from "@/modules/blog/EntireRecordsWithDateSortWrapper";
import FeaturedRecords from "@/modules/blog/FeaturedRecords";
import NoRecordFound from "@/modules/blog/NoRecordFound";

const BookRecordsBody = ({ modAllPages, isAble, pages }) => {
  return (
    <>
      {isAble ? (
        <div className="flex flex-col gap-16 items-start w-full ">
          <FeaturedRecords
            type="BOOKS"
            subType={true}
            records={pages}
            introTrue={false}
          />
          {/* <RecordsWithMultiplesOfThree
          filteredPages={filteredPages}
          className=""
          introTrue={false}
        /> */}

          <EntireRecordsWithDateSortWrapper
            modAllPages={modAllPages}
            className=""
          />
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default BookRecordsBody;
