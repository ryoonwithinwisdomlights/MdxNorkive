import { RecordsWrapperProps } from "@/types/components/pageutils";
import DateSortedRecords from "./DateSortedRecords";
import { memo, useMemo } from "react";

const RecordsWrapper = ({ modAllPages, className }: RecordsWrapperProps) => {
  // keys() 배열을 useMemo로 캐싱
  const keys = useMemo(() => Object.keys(modAllPages || {}), [modAllPages]);

  return (
    <div className={` ${className} `}>
      {keys.map((title, index) => (
        <DateSortedRecords key={index} title={title} recordList={modAllPages} />
      ))}
    </div>
  );
};

export default memo(RecordsWrapper);
