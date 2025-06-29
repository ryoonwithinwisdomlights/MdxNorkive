"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { Clock4Icon } from "lucide-react";

export default function ArticleInfo() {
  const { notice } = useGlobal({ from: "index" });
  // if (!currentRecord) {
  //   return null;
  // }
  // const modRecord = currentRecord ? currentRecord : notice;
  return (
    <div className="pt-10 pb-6 text-neutral-400 text-sm border-b">
      <Clock4Icon className="mr-1" />
      Last update: {notice.date?.start_date}
    </div>
  );
}
