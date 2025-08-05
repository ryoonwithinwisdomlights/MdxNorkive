"use client";
import { useNav } from "@/lib/context/NavInfoProvider";
import EntireRecords from "./EntireRecords";
import FeaturedRecords from "./FeaturedRecords";
import LatestRecords from "./LatestRecords";

const NorkiveIntro = () => {
  const { serializedAllPages } = useNav({ from: "NorkiveIntro" });
  const pages = serializedAllPages;
  return (
    <div id="norkive-intro" className="w-full flex flex-col gap-10">
      <FeaturedRecords type="" records={pages} introText={true} />
      <LatestRecords records={pages} introText={true} />
      {/* Favorite Records Section */}

      {/* Our Recent Records Section */}
      {/* <RecentRecords /> */}
      {/* All Records Section */}
      <EntireRecords records={pages} introText={true} />
    </div>
  );
};

export default NorkiveIntro;
