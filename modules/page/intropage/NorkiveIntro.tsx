"use client";
import { lazy, useEffect } from "react";
import { useNav } from "@/lib/context/NavInfoProvider";
import { useUIStore } from "@/lib/stores";
import { generalIntroPageClass } from "@/lib/utils";
const FeaturedDocs = lazy(
  () => import("@/modules/page/components/FeatureDocs")
);
const LatestDocs = lazy(() => import("@/modules/page/components/LatestDocs"));

const EntireDocs = lazy(() => import("@/modules/page/components/EntireDocs"));

interface NorkiveIntroProps {
  initialRightSideMode?: "info" | "author";
}

const NorkiveIntro = ({ initialRightSideMode = "info" }: NorkiveIntroProps) => {
  const { serializedAllPages } = useNav({ from: "NorkiveIntro" });
  const { setRightSideInfoBarMode } = useUIStore();
  const pages = serializedAllPages;

  // 초기 사이드바 모드 설정
  useEffect(() => {
    setRightSideInfoBarMode(initialRightSideMode);
  }, [initialRightSideMode, setRightSideInfoBarMode]);

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
