import { DocsWrapperProps } from "@/types/components/pageutils";
import DateSortedDocs from "./DateSortedDocs";
import { memo, useMemo } from "react";

const DocsWrapper = ({ modAllPages, className }: DocsWrapperProps) => {
  // keys() 배열을 useMemo로 캐싱
  const keys = useMemo(() => Object.keys(modAllPages || {}), [modAllPages]);

  return (
    <div className={` ${className} `}>
      {keys.map((title, index) => (
        <DateSortedDocs key={index} title={title} docsList={modAllPages} />
      ))}
    </div>
  );
};

export default memo(DocsWrapper);
