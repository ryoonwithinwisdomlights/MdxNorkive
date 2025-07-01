"use client";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
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
    <section className="text-neutral-800 dark:text-neutral-400 h-12 flex items-center justify-between space-x-5 my-4">
      <div
        // href={`/${prev.slug}`}
        // passHref
        onClick={(e) => {
          onClick(prev.slug);
        }}
        className="text-sm cursor-pointer justify-start items-center flex hover:underline duration-300"
      >
        <ChevronsLeftIcon className="mr-1" />
        {prev.title}
      </div>
      <div
        // href={`/${next.slug}`}
        // passHref
        onClick={(e) => {
          onClick(next.slug);
        }}
        className="text-sm cursor-pointer justify-end items-center flex hover:underline duration-300"
      >
        {next.title}
        <ChevronsRightIcon className="mr-1 my-1 " />
      </div>
    </section>
  );
}
