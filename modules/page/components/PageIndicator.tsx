import React from "react";

type Props = {
  currentPage: number;
  TOTAL_PAGES: number;
  prevPage: () => void;
  nextPage: () => void;
};

const PageIndicator = ({
  currentPage,
  TOTAL_PAGES,
  prevPage,
  nextPage,
}: Props) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        Page {currentPage + 1} of {TOTAL_PAGES}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={prevPage}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
            currentPage === 0
              ? "bg-neutral-100 dark:bg-neutral-700 opacity-50 cursor-not-allowed"
              : "bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          }`}
          disabled={currentPage === 0}
        >
          <svg
            className="w-5 h-5 text-neutral-600 dark:text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextPage}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
            currentPage === TOTAL_PAGES - 1
              ? "bg-neutral-100 dark:bg-neutral-700 opacity-50 cursor-not-allowed"
              : "bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          }`}
          disabled={currentPage === TOTAL_PAGES - 1}
        >
          <svg
            className="w-5 h-5 text-neutral-600 dark:text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PageIndicator;
