"use client";
import { useGlobal } from "@/context/globalProvider";
import { usePathname, useRouter } from "next/navigation";

/**
 * Simple page turning plug-in
 * @param page Current page number
 * @param totalPage Is there a next page?
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationSimple = ({ pagenum, totalPage }) => {
  const { locale } = useGlobal({ from: "index" });
  const router = useRouter();
  const pathname = usePathname();
  // const param = useSearchParams()
  const currentPage = +pagenum;
  const showNext = currentPage < totalPage;
  const pagePrefix = pathname.replace(/\/page\/[1-9]\d*/, "");

  return (
    <div
      className={`my-10 flex w-full justify-end font-medium text-black dark:text-neutral-100 space-x-2`}
    >
      {/* <div
        onClick={() => {
          router.push(
            currentPage === 2
              ? `${pagePrefix}/`
              : `${pagePrefix}?pagenum=${currentPage + 1}`
          );
        }}
        className={`${
          currentPage === 1 ? "invisible" : "block"
        } text-center w-full duration-200 px-4 py-2 hover:border-neutral-300 border-b-2 hover:font-bold`}
      >
        ←{locale.PAGINATION.PREV}
      </div> */}
      <div
        onClick={() => {
          router.push(`${pagePrefix}?pagenum=${currentPage + 1}`);
        }}
        className={`${
          +showNext ? "block" : "invisible"
        } text-center w-1/2 duration-200 px-4 py-2 hover:border-neutral-300 border-b-2 hover:font-bold`}
      >
        {locale.PAGINATION.NEXT}→
      </div>
    </div>
  );
};

export default PaginationSimple;
