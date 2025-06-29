"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { CardProps } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AllRecordsPostCard = ({ record }: CardProps) => {
  const pathname = usePathname();
  const currentSelected = pathname.split("/")[2] === record.id;
  const { handleRouter } = useGlobal({});

  return (
    <div
      key={record.id}
      className={`py-1 cursor-pointer px-2 hover:bg-neutral-100 hover:dark:text-white rounded-md dark:hover:bg-neutral-500  ${
        currentSelected ? " text-neutral-500" : ""
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <div
          onClick={() => {
            handleRouter(record);
          }}
        >
          <span className="text-xs pr-1">{record.pageIcon} </span>{" "}
          {record.title.length > 25
            ? record.title.substring(0, 25) + "..."
            : record.title}
        </div>
      </div>
    </div>
  );
};

export default AllRecordsPostCard;
