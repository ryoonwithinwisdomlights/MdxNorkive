import React from "react";
import DateSortedRecords from "./DateSortedRecords";

export const RecordsWrapper = ({ modAllPages, className }) => {
  return (
    <div className={` ${className} `}>
      {Object.keys(modAllPages)?.map((title, index) => (
        <DateSortedRecords key={index} title={title} recordList={modAllPages} />
      ))}
    </div>
  );
};
