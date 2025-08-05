"use client";
import BookRecordsPage from "@/modules/blog/records/BookRecordsPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";

export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return (
    <div className="w-full flex flex-col items-center p-16 gap-10">
      <BookRecordsPage />
    </div>
  );
}
