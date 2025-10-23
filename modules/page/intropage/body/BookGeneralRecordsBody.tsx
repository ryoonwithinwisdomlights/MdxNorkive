"use client";

import { RecordsWrapper } from "@/modules/page/components/RecordsWrapper";
import FeaturedRecords from "@/modules/page/components/FeaturedRecords";
import NoRecordFound from "@/modules/shared/NoRecordFound";
import type { SerializedPage } from "@/types";

interface BookGeneralRecordsBodyProps {
  modAllPages: Record<string, SerializedPage[]>;
  isAble: boolean;
  pages: SerializedPage[];
  type: "BOOKS" | "PROJECTS" | "RECORDS" | "ENGINEERINGS";
  subType: boolean;
  introTrue: boolean;
}

const BookGeneralRecordsBody = ({
  modAllPages,
  isAble,
  pages,
  type,
  subType,
  introTrue,
}: BookGeneralRecordsBodyProps) => {
  return (
    <>
      {isAble ? (
        <div className="flex flex-col gap-16 items-start w-full ">
          <FeaturedRecords
            type={type}
            subType={subType}
            records={pages}
            introTrue={introTrue}
          />
          <RecordsWrapper
            modAllPages={modAllPages}
            className="w-full flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg dark:bg-black dark:bg-opacity-70"
          />
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default BookGeneralRecordsBody;
