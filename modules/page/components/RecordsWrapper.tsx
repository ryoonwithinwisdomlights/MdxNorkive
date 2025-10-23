import React from "react";
import DateSortedRecords from "./DateSortedRecords";
import type { SerializedPage } from "@/types";

interface RecordsWrapperProps {
  modAllPages: Record<string, SerializedPage[]>;
  className?: string;
}

export const RecordsWrapper = ({
  modAllPages,
  className,
}: RecordsWrapperProps) => {
  return (
    <div className={` ${className} `}>
      {Object.keys(modAllPages)?.map((title, index) => (
        <DateSortedRecords key={index} title={title} recordList={modAllPages} />
      ))}
    </div>
  );
};
