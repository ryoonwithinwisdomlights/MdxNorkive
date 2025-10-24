import { RecordsWrapperProps } from "@/types/components/pageutils";
import DateSortedRecords from "./DateSortedRecords";

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
