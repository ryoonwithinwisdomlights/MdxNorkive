"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { substringWithNumberDots } from "@/lib/utils/utils";
import { NavListDivProps } from "@/types";
import { usePathname } from "next/navigation";

const AllRecordsPostCard = ({
  record,
  className,
  substr,
  substrNumber,
}: NavListDivProps) => {
  const pathname = usePathname();
  const currentSelected = pathname.split("/")[2] === record.id;
  const { handleRouter } = useGlobal({});

  return (
    <div
      key={record.id}
      className={`${className} cursor-pointer px-2    hover:dark:text-white 
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <div
          onClick={() => {
            handleRouter(record);
          }}
        >
          <span className="text-xs pr-1">{record.pageIcon} </span>
          {substr
            ? substringWithNumberDots(record.title, substrNumber)
            : record.title}
        </div>
      </div>
    </div>
  );
};

export default AllRecordsPostCard;
