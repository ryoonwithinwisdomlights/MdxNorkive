"use client";
import { useEffect, useMemo, useState, lazy } from "react";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import { useThemeStore } from "@/lib/stores";
import { transferDataForCardProps } from "@/lib/utils/docs";
import InformationCard from "@/modules/page/components/InformationCard";
import NoDocFound from "@/modules/shared/NoDocFound";
import PageIndicator from "@/modules/page/components/PageIndicator";
import LazyImage from "@/modules/shared/LazyImage";
import OptionCarousel from "@/modules/shared/OptionCarousel";
import { OptionItem } from "@/types/components/pageutils";
import { SerializedPage } from "@/types/provider.model";

const InjectedOptionMenu = lazy(
  () => import("@/modules/page/components/InjectedOptionMenu")
);

const DocsBodyWithTwoOptions = ({ docs }: { docs: SerializedPage[] }) => {
  const pages = docs;
  if (!pages) NotFound();

  const router = useRouter();
  const { locale } = useThemeStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDocType, setcurrentDocType] = useState("");
  const [currentTag, setCurrentTag] = useState(""); // 태그 필터링을 위한 상태 추가

  const CARDS_PER_PAGE = 6;

  // 태그 변경 핸들러 추가
  const handleTagChange = (tag: string) => {
    setCurrentTag(tag);
    setCurrentPage(0); // 태그 변경 시 첫 페이지로 이동
  };

  // useMemo를 사용하여 필터링 로직 최적화

  const { filteredPages, alldocTypeOptions, modAllDocs, allTagOptions } =
    useMemo(() => {
      let filtered = pages;

      // 1단계: doc_type으로 필터링
      if (currentDocType !== "") {
        filtered = filtered.filter((page) => {
          const pageCategory = page?.data?.doc_type;
          if (!pageCategory) return false;

          // 대소문자 구분 없이 비교
          return pageCategory.toLowerCase() === currentDocType.toLowerCase();
        });
      }

      // 2단계: 태그로 필터링
      if (currentTag !== "") {
        filtered = filtered.filter((page) => {
          const pageTags = page?.data?.tags;
          if (!pageTags || !Array.isArray(pageTags)) return false;

          // 태그 배열에서 현재 선택된 태그가 포함되어 있는지 확인
          return pageTags.some(
            (tag) => tag.toLowerCase() === currentTag.toLowerCase()
          );
        });
      }

      const modAllDocs = filtered.slice(
        currentPage * CARDS_PER_PAGE,
        (currentPage + 1) * CARDS_PER_PAGE
      );

      // 중복되지 않는 고유한 doc_type 추출
      const uniquedocTypeOptions = Array.from(
        new Set(
          pages
            .map((item) => item?.data?.doc_type)
            .filter((doc_type): doc_type is string => Boolean(doc_type))
        )
      );

      // 중복되지 않는 고유한 tag 추출
      const uniqueTagOptions = Array.from(
        new Set(
          pages
            .map((item) => item?.data?.tags)
            .filter((tags): tags is string[] => Boolean(tags))
            .flatMap((tags) => tags) // flatMap을 사용하여 더 명시적으로 표현
        )
      );
      //   console.log("uniqueTagOptions:", uniqueTagOptions);

      // "전체" 아이템을 맨 앞에 추가
      const alldocTypeOptions: OptionItem[] = [
        {
          id: -1,
          title: locale.COMMON.ALL,
          option: "",
          isActive: currentDocType === "" ? true : (false as boolean),
        },
        ...uniquedocTypeOptions.map((option, index) => ({
          id: index,
          title: option,
          option: option,
          isActive: option.toLowerCase() === currentDocType.toLowerCase(),
        })),
      ];

      const allTagOptions: OptionItem[] = [
        {
          id: -1,
          title: locale.COMMON.TAGS,
          option: "",
          isActive: currentTag === "",
        },
        ...uniqueTagOptions.map((tag, index) => ({
          id: index,
          title: tag,
          option: tag,
          isActive: tag.toLowerCase() === currentTag.toLowerCase(),
        })),
      ];
      return {
        filteredPages: filtered,
        alldocTypeOptions: alldocTypeOptions,
        allTagOptions: allTagOptions,
        modAllDocs,
      };
    }, [pages, currentDocType, currentTag, currentPage]); // currentTag 의존성 추가

  const TOTAL_PAGES = Math.ceil(filteredPages.length / CARDS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentDocType]);

  const handleDocTypeChange = (doc_type: string) => {
    setcurrentDocType(doc_type);
  };

  return (
    <div className="flex flex-col w-full items-center gap-6 ">
      <div className="flex flex-col  gap-4 w-full ">
        <div className="flex flex-row justify-between items-center">
          <OptionCarousel
            allOptions={allTagOptions}
            currentOption={currentTag}
            initString={locale.COMMON.TAGS}
            handleOptionTypeChange={handleTagChange}
            className="w-[60%] "
          />
          <div className="w-52 text-right relative flex flex-col justify-end items-end ">
            <InjectedOptionMenu
              currentDocType={currentDocType}
              allOptions={alldocTypeOptions}
              handleDocTypeChange={handleDocTypeChange}
              initString={locale.COMMON.TYPES}
            />
          </div>
        </div>

        <PageIndicator
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="flex flex-row justify-end w-full">
        <div className="space-y-6 w-full">
          {modAllDocs && modAllDocs.length > 0 ? (
            modAllDocs.map((item: SerializedPage, index: number) => {
              const showPageCover = item?.data?.pageCover as string | undefined;
              const data = transferDataForCardProps(item);
              return (
                <div key={item?.data?.notionId || index} className="w-full ">
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
                    className={`hover:scale-105 transition-all duration-150 group w-full  flex p-2 justify-between md:flex-row flex-col-reverse ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    } overflow-hidden border dark:border-black rounded-lg shadow-md  bg-gradient-to-br from-white to-white dark:from-neutral-900 dark:to-neutral-700 `}
                  >
                    <InformationCard
                      data={data}
                      showPreview={true}
                      showSummary={true}
                    />
                    {showPageCover && (
                      <div className="md:w-5/12 rounded-xl overflow-hidden">
                        <LazyImage
                          alt=""
                          priority={index === 1}
                          src={item?.data?.pageCover || ""}
                          className="h-56 w-full rounded-xl object-cover object-center group-hover:scale-110 duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <NoDocFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocsBodyWithTwoOptions;
