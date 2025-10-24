"use client";
import { useThemeStore } from "@/lib/stores";
import { ContentCard } from "@/modules/common/cards";
import { CardInfoDivProps } from "@/types/components/cards";

/**
 * Portfolio list text content
 * @param {*} param0
 * @returns
 */
const InformationCard = ({
  data,
  showPreview,
  showSummary,
}: CardInfoDivProps) => {
  const { locale, lang } = useThemeStore();

  return (
    <ContentCard
      data={data}
      variant={showPreview ? "default" : "compact"}
      showMeta={true}
      showTags={true}
      showSummary={showSummary}
      locale={locale}
      lang={lang}
      border={false}
      hover={false}
      background="transparent"
      className={`md:w-7/12 w-full  border-0 shadow-none p-4 bg-transparent }`}
    />
  );
};

export default InformationCard;
