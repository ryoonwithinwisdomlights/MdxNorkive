"use client";
import { lazy } from "react";
import { useNav } from "@/lib/context/NavInfoProvider";
import { generalIntroPageClass } from "@/lib/utils";
const FeaturedDocs = lazy(
  () => import("@/modules/page/components/FeatureDocs")
);
const LatestDocs = lazy(() => import("@/modules/page/components/LatestDocs"));

const EntireDocs = lazy(() => import("@/modules/page/components/EntireDocs"));

const NorkiveIntro = () => {
  const { serializedAllPages } = useNav({ from: "NorkiveIntro" });
  const pages = serializedAllPages;

  return (
    <div
      id="norkive-intro"
      className={generalIntroPageClass({ className: "justify-center mx-auto" })}
    >
      <FeaturedDocs type="" docs={pages} introTrue={true} docType={false} />
      <LatestDocs type="" docs={pages} introTrue={true} docType={false} />
      <EntireDocs type="" docs={pages} introTrue={true} docType={false} />
    </div>
  );
};

export default NorkiveIntro;
