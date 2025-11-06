"use client";

import FeatureDocs from "@/modules/page/components/FeatureDocs";
import DocsWrapper from "@/modules/page/components/DocsWrapper";
import NoDocFound from "@/modules/shared/NoDocFound";
import { GeneralDocsBodyProps } from "@/types/components/pageutils";

const GeneralDocsBody = ({
  modAllPages,
  isAble,
  pages,
  type,
  docType,
  introTrue,
}: GeneralDocsBodyProps) => {
  return (
    <>
      {isAble ? (
        <div className="flex flex-col gap-16 items-start w-full ">
          <FeatureDocs
            type={type}
            docType={docType}
            docs={pages}
            introTrue={introTrue}
          />
          <DocsWrapper
            modAllPages={modAllPages}
            className="w-full flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg dark:bg-black dark:bg-opacity-70"
          />
        </div>
      ) : (
        <NoDocFound />
      )}
    </>
  );
};

export default GeneralDocsBody;
