"use client";
import { substringWithNumberDots } from "@/lib/utils/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRight,
  ChevronsRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Previous article, next article
 * @param {prev,next} param0
 * @returns
 */
export default function ArchiveAround({ prev, next }) {
  if (!prev || !next) {
    return <></>;
  }
  const router = useRouter();
  const onClick = (slug: string) => {
    router.push(`/${slug}`);
  };
  return (
    <section className="w-full rounded-2xl flex bg-neutral-50/90 dark:bg-neutral-800 p-1 text-sm my-16">
      <div
        onClick={(e) => {
          onClick(prev.slug);
        }}
        className="group flex items-center justify-between pl-3 pr-6 space-x-1.5"
      >
        <ChevronLeft className="w-6 h-6  text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-600 dark:group-hover:text-neutral-400" />
        {/* {substringWithNumberDots(prev.title, 30)} */}
        <span className="text-neutral-500 dark:text-neutral-400 font-medium tracking-tight group-hover:text-neutral-800 dark:group-hover:text-neutral-100">
          Previous
        </span>
      </div>
      <div
        onClick={(e) => {
          onClick(next.slug);
        }}
        className="group w-full "
      >
        <div className=" bg-white dark:bg-neutral-700 flex-1 flex items-center justify-end h-16 hover:ring-1 hover:ring-neutral-200 dark:hover:ring-neutral-800 rounded-xl">
          <div className="flex flex-col items-end justify-center px-5 min-w-0">
            <span className="font-semibold text-neutral-700 dark:text-neutral-200 text-right ">
              {next.type}
            </span>
            <span className="hidden text-right text-neutral-500 dark:text-neutral-400 lg:block w-full truncate lg:w-72">
              {substringWithNumberDots(next.title, 30)}
            </span>
          </div>
          <div className="w-px h-8 bg-neutral-100 dark:bg-white/5"></div>
          <div className="pl-5 pr-3 text-neutral-600 dark:text-neutral-400 flex items-center space-x-1.5">
            <span className="text-neutral-500 dark:text-neutral-400 font-medium tracking-tight group-hover:text-neutral-800 dark:group-hover:text-neutral-100">
              Next
            </span>
            <ChevronRight className="mr-1 my-1  w-6 h-6 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-600 dark:group-hover:text-neutral-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
