"use client";
import { recordSource } from "@/lib/source";
import EntireRecords from "./EntireRecords";
import FeaturedRecords from "./FeaturedRecords";
import LatestRecords from "./LatestRecords";

const NorkiveIntro = () => {
  const pages = recordSource.getPages();
  return (
    <div id="norkive-intro" className="w-full flex flex-col gap-10">
      <FeaturedRecords sub_type="" records={pages} introText={true} />
      <LatestRecords />
      {/* Favorite Records Section */}

      {/* Our Recent Records Section */}
      {/* <RecentRecords /> */}
      {/* All Records Section */}
      <EntireRecords />
    </div>
  );
};

export default NorkiveIntro;
