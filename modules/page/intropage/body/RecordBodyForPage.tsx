import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import OptionCarousel, { OptionItem } from "@/modules/shared/OptionCarousel";
import LazyImage from "@/modules/shared/LazyImage";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import NoRecordFound from "@/modules/page/components/NoRecordFound";
import PageIndicator from "@/modules/page/components/PageIndicator";
import InformationCard from "@/modules/page/components/InformationCard";

const RecordBodyForPage = ({ records }: { records: any[] }) => {
  const pages = records;
  if (!pages) NotFound();
  pages.sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  const router = useRouter();
  const { locale } = useGeneralSiteSettings();
  const [currentRecordType, setCurrentRecordType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 4;
  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions, modAllRecords } = useMemo(() => {
    const filtered =
      currentRecordType !== ""
        ? pages.filter((page) => {
            const pageCategory = page?.data?.sub_type;
            if (!pageCategory) return false;

            // 대소문자 구분 없이 비교
            return (
              pageCategory.toLowerCase() === currentRecordType.toLowerCase()
            );
          })
        : pages;

    const modAllRecords = filtered.slice(
      currentPage * CARDS_PER_PAGE,
      (currentPage + 1) * CARDS_PER_PAGE
    );

    // 중복되지 않는 고유한 sub_type 추출
    const uniqueOptions = Array.from(
      new Set(
        pages
          .map((item) => item?.data?.sub_type)
          .filter((category): category is string => Boolean(category))
      )
    );

    // "전체" 아이템을 맨 앞에 추가
    const options: OptionItem[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
        isActive: currentRecordType === "",
      },
      ...uniqueOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
        isActive: option.toLowerCase() === currentRecordType.toLowerCase(),
      })),
    ];

    return {
      filteredPages: filtered,
      allOptions: options,
      modAllRecords,
    };
  }, [pages, currentRecordType, currentPage]);

  const TOTAL_PAGES = Math.ceil(filteredPages.length / CARDS_PER_PAGE);
  useEffect(() => {
    setCurrentPage(0);
  }, [currentRecordType]);

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
  };
  return (
    <div className="flex flex-col w-full items-center gap-6 ">
      <div className="flex flex-col  w-full ">
        <OptionCarousel
          allOptions={allOptions}
          currentOption={currentRecordType}
          handleOptionTypeChange={handleRecordTypeChange}
          className="w-full overflow-hidden md:max-w-3xl max-md:max-w-full"
        />
        <PageIndicator
          currentPage={currentPage}
          TOTAL_PAGES={TOTAL_PAGES}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>

      <div className="flex flex-row justify-end w-full">
        <div className="space-y-6 w-full">
          {modAllRecords && modAllRecords.length > 0 ? (
            modAllRecords.map((item: any, index) => {
              const showPageCover = item?.data?.pageCover;
              return (
                <div key={item?.data?.notionId || index} className="w-full ">
                  <div className="hover:scale-105 transition-all duration-150">
                    <div
                      onClick={() => {
                        router.push(item?.url);
                      }}
                      data-aos="fade-up"
                      data-aos-easing="ease-in-out"
                      data-aos-duration="800"
                      data-aos-once="false"
                      data-aos-anchor-placement="top-bottom"
                      id="notion-page-card"
                      className={`group w-full max-md:h-72 flex p-2 justify-between md:flex-row flex-col-reverse ${
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      } overflow-hidden border dark:border-black rounded-lg shadow-md  bg-gradient-to-br from-white to-white dark:from-neutral-900 dark:to-neutral-700 `}
                    >
                      <InformationCard
                        page={item}
                        showPageCover={showPageCover}
                        showPreview={true}
                        showSummary={true}
                      />
                      {showPageCover && (
                        <div className="md:w-5/12 rounded-xl overflow-hidden">
                          <LazyImage
                            alt=""
                            priority={index === 1}
                            src={item?.data?.pageCover}
                            className="h-56 w-full rounded-xl object-cover object-center group-hover:scale-110 duration-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoRecordFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordBodyForPage;
