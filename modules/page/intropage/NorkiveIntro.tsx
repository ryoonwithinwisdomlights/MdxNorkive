"use client";
import { useNav } from "@/lib/context/NavInfoProvider";
import { cn } from "@/lib/utils/general";
import EntireRecords from "@/modules/page/components/EntireRecords";
import FeaturedRecords from "@/modules/page/components/FeaturedRecords";
import LatestRecords from "@/modules/page/components/LatestRecords";
import { generalIntroPageClass } from "@/types";

const NorkiveIntro = () => {
  const { serializedAllPages } = useNav({ from: "NorkiveIntro" });
  const pages = serializedAllPages;
  return (
    <div
      id="norkive-intro"
      className={cn("justify-center mx-auto", generalIntroPageClass)}
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
