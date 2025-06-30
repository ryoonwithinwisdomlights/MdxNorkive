"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { isNotEmptyObj } from "@/lib/utils/utils";
import { Clock4Icon } from "lucide-react";

export default function ArticleInfo() {
  const { notice, currentRecordData } = useGlobal({ from: "index" });
  // const res = isNotEmptyObj(currentRecordData);

  if (!currentRecordData) {
    return null;
  }
  const modRecord = currentRecordData ? currentRecordData : notice;
  console.log("modRecord:", modRecord);

  return (
    <div className="pt-10 pb-6 text-neutral-400 text-sm border-b flex flex-row items-center">
      <Clock4Icon className="mr-2 w-3 h-3 " />
      Last update: {modRecord.lastEditedDate}
    </div>
  );
}
