"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import FeaturedRecords from "./FeaturedRecords";
import RecentRecords from "./RecentRecords";
import EntireRecords from "./EntireRecords";

const NorkiveIntro = () => {
  return (
    <div
      id="norkive-intro"
      className="w-full  xl:w-[62%] flex flex-col mt-10  px-10"
    >
      {/* Favorite Records Section */}
      <FeaturedRecords />
      {/* Our Recent Records Section */}
      <RecentRecords />
      {/* All Records Section */}
      <EntireRecords />
    </div>
  );
};

export default NorkiveIntro;
