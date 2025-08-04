"use client";
import FeaturedRecords from "./FeaturedRecords";
import LatestRecords from "./LatestRecords";

const NorkiveIntro = () => {
  return (
    <div
      id="norkive-intro"
      className="w-full  xl:w-[62%] flex flex-col mt-10  px-10"
    >
      <FeaturedRecords />
      <LatestRecords />
      {/* Favorite Records Section */}

      {/* Our Recent Records Section */}
      {/* <RecentRecords /> */}
      {/* All Records Section */}
      {/* <EntireRecords /> */}
    </div>
  );
};

export default NorkiveIntro;
