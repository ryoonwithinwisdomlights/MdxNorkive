"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getMainRecentArticles } from "@/lib/utils/records";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import TagItemMini from "../tag/TagItemMini";
import NotFound from "@/app/not-found";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";

const RecordsWithMultiplesOfThree = ({
  filteredPages,
  className,
  introTrue,
}) => {
  // const pages = getPages();
  if (!filteredPages) NotFound();
  const { lang, locale } = useGeneralSiteSettings();
  const articles = getMainRecentArticles(filteredPages, lang);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(articles.length / cardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getCurrentArticles = () => {
    const startIndex = currentPage * cardsPerPage;
    return articles.slice(startIndex, startIndex + cardsPerPage);
  };
  return (
    <div className={`${className} flex flex-col gap-6`}>
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="LATEST"
        currentRecordType={""}
        allOptions={[]}
        handleRecordTypeChange={() => {}}
      />
      {/* Navigation Arrows */}
      <div className="flex justify-between items-center m">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Page {currentPage + 1} of {totalPages}
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
              currentPage === totalPages - 1
                ? "bg-neutral-100 dark:bg-neutral-700 opacity-50 cursor-not-allowed"
                : "bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            }`}
            disabled={currentPage === totalPages - 1}
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
      <div
        id="norkive-recent-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {getCurrentArticles().map((article) => (
          <div
            key={`${article.id}-${currentPage}`}
            className="bg-white dark:bg-neutral-800 rounded-lg 
        overflow-hidden hover:shadow-lg transition-all duration-300
         border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 min-h-[400px]
        "
          >
            <div
              className={`h-48  
         
            flex items-center justify-center 
            transition-all duration-300 hover:scale-110`}
              style={{
                backgroundImage: `url(${article.pageCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              id="norkive-recent-card-content"
              className="p-6 flex flex-col justify-between"
            >
              <div className="flex gap-2 items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                {/* <span>{article.author}</span> */}
                {/* <span className="">•</span> */}
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {article.date} &nbsp; &nbsp;{article.distanceFromToday}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3 line-clamp-2">
                {article.title}
              </h3>
              {article.description !== "" && (
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-3">
                  {article.description}...
                </p>
              )}
              <div className="flex gap-2 items-end  mb-3">
                {article.tags && article.tags.length > 0 && (
                  <TagItemMini
                    tags={article.tags}
                    className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                  />
                )}
              </div>
              <div className="mt-auto pt-4">
                <Link
                  href={article.url}
                  className="text-neutral-600 dark:text-neutral-400 font-medium hover:underline transition-all duration-300 hover:text-neutral-800 dark:hover:text-neutral-300"
                >
                  {locale.INTRO.READ_MORE}→
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordsWithMultiplesOfThree;
