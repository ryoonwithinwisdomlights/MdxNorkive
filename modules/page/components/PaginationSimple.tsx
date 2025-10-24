"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { PaginationSimpleProps } from "@/types/components/pageutils";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Simple page turning plug-in
 * @param page Current page number
 * @param totalPage Is there a next page?
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationSimple = ({ pagenum, totalPage }: PaginationSimpleProps) => {
  const { locale } = useGeneralSiteSettings();
  const router = useRouter();
  const pathname = usePathname();
  // const param = useSearchParams()
  const currentPage = +pagenum;
  const showNext = currentPage < totalPage;
  const pagePrefix = pathname.replace(/\/page\/[1-9]\d*/, "");

  return (
    <div className={` flex w-full justify-end  space-x-2`}>
      <div
        onClick={() => {
          router.push(`${pagePrefix}?pagenum=${currentPage + 1}`);
        }}
        className={`${
          +showNext ? "block" : "invisible"
        } rounded-md transform hover:scale-105 duration-300 text-end group w-3/5 py-2 px-4 gap-x-2 flex flex-row items-center  dark:hover:text-neutral-100  hover:border-neutral-200 dark:bg-neutral-700 bg-neutral-100`}
      >
        <span className="dark:text-neutral-300 text-neutral-700   tracking-tight group-hover:font-bold ">
          {locale.PAGINATION.NEXT}
        </span>
        <ChevronRight className="w-4 h-4 dark:text-neutral-300 text-neutral-700 group-hover:font-bold " />
      </div>
    </div>
  );
};

export default PaginationSimple;
