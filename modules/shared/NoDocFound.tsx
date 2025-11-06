"use client";
import { useThemeStore } from "@/lib/stores";

const NoDocFound = () => {
  const { locale } = useThemeStore();
  return (
    <div
      className="text-neutral-800 dark:text-neutral-300 flex flex-col w-full 
    items-center justify-center 
    mx-auto my-auto md:text-4xl text-2xl  "
    >
      {locale.COMMON.NO_DOCS_FOUND}
    </div>
  );
};

export default NoDocFound;
