"use client";

import { substringWithNumberDots } from "@/lib/utils/general";
import { NavListDivProps } from "@/types/components/navigation";
import { useRouter } from "next/navigation";

const SubstringedTitleNav = ({
  record,
  className,
  substr,
  substrNumber,
}: NavListDivProps) => {
  const router = useRouter();

  return (
    <div
      key={record.notionId}
      className={`${className} cursor-pointer px-2    hover:dark:text-white 
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <div
          onClick={() => {
            router.push(record.slug);
            // handleRouter(record);
          }}
        >
          <span className="text-xs pr-1">{record.icon} </span>
          {substr
            ? substringWithNumberDots(record.title, substrNumber || 0)
            : record.title}
        </div>
      </div>
    </div>
  );
};

export default SubstringedTitleNav;
