import React from "react";

const SearchResultSkeleton = () => {
  return (
    <div className="p-3 space-y-2 animate-pulse">
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
    </div>
  );
};

export default SearchResultSkeleton;
