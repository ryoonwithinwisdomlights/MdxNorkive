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
      <FeaturedRecords
        type=""
        subType={false}
        records={pages}
        introTrue={true}
      />
      <LatestRecords type="" records={pages} introTrue={true} subType={false} />
      <EntireRecords type="" records={pages} introTrue={true} subType={false} />
    </div>
  );
};

export default NorkiveIntro;
