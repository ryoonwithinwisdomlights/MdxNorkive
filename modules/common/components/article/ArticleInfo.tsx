"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import {
  formatDate,
  formatDateFmt,
  formatToKoreanDate,
  isObjectNotEmpty,
} from "@/lib/utils/utils";
import { Clock4Icon } from "lucide-react";

export default function ArticleInfo({ props }) {
  const { notice } = useGlobal({ from: "index" });
  const modRecord = props?.record ? props?.record : notice;
  if (!modRecord) {
    return null;
  }

  console.log("modRecord:", modRecord);

  return (
    <div className="pt-10 pb-6 text-neutral-400 text-sm border-b flex flex-row items-center">
      <Clock4Icon className="mr-2 w-3 h-3 " />
      <span className="text-xs">
        {" "}
        Last update: {formatToKoreanDate(modRecord.lastEditedDate)}
      </span>
    </div>
  );
}
