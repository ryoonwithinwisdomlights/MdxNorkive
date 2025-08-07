"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { substringWithNumberDots } from "@/lib/utils/general";
import { NavListDivProps } from "@/types";
import { usePathname } from "next/navigation";

const SubstringedTitleNav = ({
  record,
  className,
  substr,
  substrNumber,
}: NavListDivProps) => {
  const pathname = usePathname();
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

export default SubstringedTitleNav;
