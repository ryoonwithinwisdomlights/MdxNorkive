"use client";
import { lazy } from "react";
import { useNav } from "@/lib/context/NavInfoProvider";
import { generalIntroPageClass } from "@/lib/utils";
const FeaturedRecords = lazy(
  () => import("@/modules/page/components/FeaturedRecords")
);
const LatestRecords = lazy(
  () => import("@/modules/page/components/LatestRecords")
);

const EntireRecords = lazy(
  () => import("@/modules/page/components/EntireRecords")
);

const NorkiveIntro = () => {
  const { serializedAllPages } = useNav({ from: "NorkiveIntro" });
  const pages = serializedAllPages;

  return (
    <div
      id="norkive-intro"
      className={generalIntroPageClass({ className: "justify-center mx-auto" })}
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
