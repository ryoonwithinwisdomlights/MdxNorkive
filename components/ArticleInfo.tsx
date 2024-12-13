"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { Clock4Icon } from "lucide-react";

export default function ArticleInfo() {
  const { post, notice } = useGlobal({ from: "index" });
  if (!post) {
    return null;
  }
  const modPost = post ? post : notice;
  return (
    <div className="pt-10 pb-6 text-neutral-400 text-sm border-b">
      <Clock4Icon className="mr-1" />
      Last update: {modPost.date?.start_date}
    </div>
  );
}
