"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import {
  formatDate,
  formatDateFmt,
  formatToKoreanDate,
  isObjectNotEmpty,
} from "@/lib/utils/utils";
import { Clock4Icon } from "lucide-react";

export default function ArchiveInfo({ props }) {
  const { notice } = useGlobal({ from: "index" });
  const modRecord = props?.page ? props?.page : notice;
  if (!modRecord) {
    return null;
  }

  return (
    <div className="pt-10  text-neutral-400  flex flex-row items-center">
      <Clock4Icon className="mr-2 w-3 h-3 " />
      <span className="text-sm">
        Last update: {formatToKoreanDate(modRecord.lastEditedDate)}
      </span>
    </div>
  );
}
