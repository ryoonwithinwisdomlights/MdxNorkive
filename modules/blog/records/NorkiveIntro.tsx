"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import FavoriteRecords from "./FavoriteRecords";
import RecentRecords from "./RecentRecords";
import EntireRecords from "./EntireRecords";

const NorkiveIntro = () => {
  return (
    <div
      id="norkive-intro"
      className="w-full  xl:w-[64%] flex flex-col mt-10  px-10"
    >
      {/* Favorite Records Section */}
      <FavoriteRecords />
      {/* Our Recent Articles Section */}
      <RecentRecords />
      {/* All Records Section */}
      <EntireRecords />
    </div>
  );
};

export default NorkiveIntro;
