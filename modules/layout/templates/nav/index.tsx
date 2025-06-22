"use client";
import SearchInput from "@/modules/common/components/SearchInput";
import NavPostList from "@/modules/layout/components/navigation-post/NavPostList";
import { useRef } from "react";

export default function MainNav() {
  const cRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-72 h-screen px-6 py-2 sticky top-0 overflow-y-scroll my-16  ">
      <SearchInput cRef={cRef} className="my-3 rounded-md" />
      <div className="mb-20">
        <NavPostList />
      </div>
    </div>
  );
}
