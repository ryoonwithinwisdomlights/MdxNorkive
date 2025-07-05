"use client";
import { BLOG } from "@/blog.config";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import NavPostListEmpty from "@/modules/layout/components/NavPostListEmpty";
import { AllRecordsListProps } from "@/types";
import { useRouter } from "next/navigation";
import AllRecordsPostCard from "./AllRecordsPostCard";
import PaginationSimple from "./PaginationSimple";
import { ChevronLeft } from "lucide-react";
/**
 * Archive list pagination table
 * @param page current page
 * @param records All Archives
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const AllRecordsList = ({
  pagenum = 1,
  allPages = [],
  pageCount,
}: AllRecordsListProps) => {
  const router = useRouter();
  const totalPage = Math.ceil(pageCount / BLOG.RECORD_PER_PAGE);
  const { locale, searchKeyword } = useGeneralSiteSettings();
  const currentPage = +pagenum;

  console.log("totalPage::", totalPage);
  console.log("currentPage::", currentPage);
  const showNext = currentPage < totalPage;
  if (!allPages || allPages.length === 0) {
    return <NavPostListEmpty searchKeyword={searchKeyword} />;
  }
  const historGoBack = () => {
    router.back();
  };
  return (
    <div className=" justify-center flex flex-col gap-y-12">
      <div
        onClick={historGoBack}
        className={` ${!+showNext && "font-bold"} group w-2/5 py-2 px-4 gap-x-2 text-start flex flex-row items-center  dark:hover:text-neutral-100  hover:border-neutral-200 rounded-sm bg-neutral-100`}
      >
        <ChevronLeft className="w-4 h-4 text-neutral-300 dark:text-neutral-700 group-hover:font-bold group-hover:text-neutral-500" />

        <span className="text-neutral-500 dark:text-neutral-400  tracking-tight group-hover:font-bold group-hover:text-neutral-500">
          {locale.PAGINATION.PREV}
        </span>
      </div>
      <div id="records-wrapper ">
        {allPages?.map((record: any) => (
          <AllRecordsPostCard key={record.id} record={record} />
        ))}
      </div>

      <PaginationSimple pagenum={pagenum} totalPage={totalPage} />
    </div>
  );
};

export default AllRecordsList;
