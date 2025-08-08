"use client";
import { useNav } from "@/lib/context/NavInfoProvider";
import EntireRecords from "@/modules/page/components/EntireRecords";
import FeaturedRecords from "@/modules/page/components/FeaturedRecords";
import LatestRecords from "@/modules/page/components/LatestRecords";

const NorkiveIntro = () => {
  const { serializedAllPages } = useNav({ from: "NorkiveIntro" });
  const pages = serializedAllPages;
  return (
    <div
      id="norkive-intro"
      className="w-full max-w-6xl  items-center justify-center mx-auto flex flex-col p-10   gap-10"
    >
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
