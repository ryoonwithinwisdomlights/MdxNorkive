"use client";

import { substringWithNumberDots } from "@/lib/utils/general";
import { NavListDivProps } from "@/types/components/navigation";
import { useRouter } from "next/navigation";

const SubstringedTitleNav = ({
  doc,
  className,
  substr,
  substrNumber,
}: NavListDivProps) => {
  const router = useRouter();

  return (
    <div
      key={doc.notionId}
      className={`${className} cursor-pointer px-2    hover:dark:text-white 
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <div
          onClick={() => {
            router.push(doc.slug);
            // handleRouter(doc);
          }}
        >
          <span className="text-xs pr-1">{doc.icon} </span>
          {substr
            ? substringWithNumberDots(doc.title, substrNumber || 0)
            : doc.title}
        </div>
      </div>
    </div>
  );
};

export default SubstringedTitleNav;
