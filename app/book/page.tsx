"use client";
import BookRecordsPage from "@/modules/intropage/BookRecordsPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";

export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return <BookRecordsPage />;
}
