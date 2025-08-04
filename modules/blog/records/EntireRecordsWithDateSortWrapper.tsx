import React from "react";
import EntireRecordsWithDateSort from "./EntireRecordsWithDateSort";

export const EntireRecordsWithDateSortWrapper = ({
  modAllPages,
  className,
}) => {
  return (
    <div
      className={` ${className} w-full flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg dark:bg-black dark:bg-opacity-70`}
    >
      {Object.keys(modAllPages)?.map((title, index) => (
        <EntireRecordsWithDateSort
          key={index}
          title={title}
          recordList={modAllPages}
        />
      ))}
    </div>
  );
};
