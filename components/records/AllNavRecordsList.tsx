"use client";
import React, { useRef } from "react";
import NavPostList from "./NavPostList";
import SearchInput from "../SearchInput";

const AllNavRecordsList = () => {
  const cRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-72 h-screen px-6 py-2 sticky top-0 overflow-y-scroll my-16  ">
      <SearchInput cRef={cRef} className="my-3 rounded-md" />
      <div className="mb-20">
        <NavPostList />
      </div>
    </div>
  );
};

export default AllNavRecordsList;
