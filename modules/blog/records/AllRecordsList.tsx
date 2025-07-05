"use client";
import { BLOG } from "@/blog.config";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import NavPostListEmpty from "@/modules/layout/components/NavPostListEmpty";
import { AllRecordsListProps } from "@/types";
import { useRouter } from "next/navigation";
import AllRecordsPostCard from "./AllRecordsPostCard";
import PaginationSimple from "./PaginationSimple";
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
    <div className="md:w-[60%]  justify-center gap-2">
      <div
        onClick={historGoBack}
        className={` ${!+showNext && "font-bold"} text-center w-2/5 mt-4 mb-10  duration-200 p-2 hover:border-neutral-200 border-b-2 hover:font-bold `}
      >
        ← {locale.PAGINATION.PREV}
      </div>
      <div id="records-wrapper">
        {/* Archive list */}
        {allPages?.map((record: any) => (
          <AllRecordsPostCard key={record.id} record={record} />
        ))}
      </div>

      <PaginationSimple pagenum={pagenum} totalPage={totalPage} />
    </div>
  );
};

export default AllRecordsList;
