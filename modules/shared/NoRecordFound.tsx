"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";

const NoRecordFound = () => {
  const { locale } = useGeneralSiteSettings();
  return (
    <div
      className="text-neutral-800 dark:text-neutral-300 flex flex-col w-full 
    items-center justify-center 
    mx-auto my-auto md:text-4xl text-2xl  "
    >
      {locale.COMMON.NO_RECORD_FOUND}
    </div>
  );
};

export default NoRecordFound;
