"use client";
import React from "react";
import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getPages } from "@/lib/source";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import TagItemMini from "../tag/TagItemMini";

function getArticles(pages: any, lang: string) {
  const sortedPage = pages
    .sort((a, b) => {
      return (
        new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
      );
    })
    .slice(0, 6);
  return sortedPage.map((page, index) => ({
    id: index,
    date: getYearMonthDay(page.data.date, lang),
    distanceFromToday: getDistanceFromToday(page.data.date, lang),
    title: page.data.title,
    pageCover: page.data.pageCover,
    description: page.data.summary?.slice(0, 100) || "",
    gradient: "from-blue-400 to-purple-500",
    tags: page.data.tags,
  }));
}
const RecentRecords = () => {
  const pages = getPages();
  if (!pages) NotFound();
  const { lang } = useGeneralSiteSettings();
  const articles = getArticles(pages, lang);
  console.log(pages);
  // const articles = [
  //   {
  //     id: 1,
  //     author: "Sam Phak",
  //     date: "20 Apr 2024",
  //     title:
  //       "Beyond Transactions: Unlocking the Full Potential of Your POS System",
  //     description:
  //       "In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction processor...",
  //     icon: "📱",
  //     gradient: "from-blue-400 to-purple-500",
  //   },
  //   {
  //     id: 2,
  //     author: "Yull Sump",
  //     date: "20 Apr 2024",
  //     title:
  //       "From Brick-and-Mortar to Online Storefront: Integrating E-commerce",
  //     description:
  //       "In the realm of modern business operations, a Point of Sale (POS) system serves as more than just a transaction processor...",
  //     icon: "💳",
  //     gradient: "from-green-400 to-blue-500",
  //   },
  //   {
  //     id: 3,
  //     author: "Ambon Fanda",
  //     date: "20 Apr 2024",
  //     title:
  //       "Security First: Protecting Your Business with Advanced POS Systems",
  //     description:
  //       "One of the primary functions of a POS system is to process transactions and handle sensitive customer data securely...",
  //     icon: "🛡️",
  //     gradient: "from-red-400 to-orange-500",
  //   },
  //   {
  //     id: 4,
  //     author: "Jane Smith",
  //     date: "19 Apr 2024",
  //     title: "The Future of Retail: AI-Powered POS Solutions",
  //     description:
  //       "Artificial Intelligence is revolutionizing how businesses handle transactions and customer interactions...",
  //     icon: "🤖",
  //     gradient: "from-purple-400 to-pink-500",
  //   },
  //   {
  //     id: 5,
  //     author: "Mike Johnson",
  //     date: "18 Apr 2024",
  //     title: "Mobile POS: Taking Your Business Anywhere",
  //     description:
  //       "With the rise of mobile commerce, having a portable POS solution has become essential for modern businesses...",
  //     icon: "📱",
  //     gradient: "from-yellow-400 to-orange-500",
  //   },
  //   {
  //     id: 6,
  //     author: "Sarah Wilson",
  //     date: "17 Apr 2024",
  //     title: "Inventory Management: The Hidden Power of Your POS",
  //     description:
  //       "Beyond processing sales, your POS system can be a powerful tool for managing inventory and tracking stock levels...",
  //     icon: "📦",
  //     gradient: "from-indigo-400 to-purple-500",
  //   },
  // ];

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
    <div className="w-full   px-10 mb-16">
      <div className="text-start mb-12">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
          Our Recent Articles
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Stay Informed with Our Latest Insights
        </p>
      </div>

      <div
        id="norkive-recent-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {getCurrentArticles().map((article) => (
          <div
            key={`${article.id}-${currentPage}`}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg 
        overflow-hidden hover:shadow-xl 
        "
          >
            <div
              className={`md:h-48  
         
            flex items-center justify-center 
            transition-all duration-300 hover:scale-110`}
              style={{
                backgroundImage: `url(${article.pageCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="p-6 flex flex-col justify-between">
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
                  <TagItemMini data={article} />
                )}
              </div>
              <a
                href="#"
                className="text-neutral-600 dark:text-neutral-400 font-medium hover:underline transition-all duration-300 hover:text-neutral-800 dark:hover:text-neutral-300"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mt-8">
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
    </div>
  );
};

export default RecentRecords;
