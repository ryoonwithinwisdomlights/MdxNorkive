"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import LazyImage from "@/modules/shared/LazyImage";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FolderClosedIcon,
  LockIcon,
  TagIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  subType: boolean;
  introTrue: boolean;
  records: any[];
};

const FeaturedRecords = ({
  type,
  introTrue,
  records,
  subType = false,
}: Props) => {
  const pages = records;
  if (!pages) return null;

  const router = useRouter();

  // Article lock🔐
  const [lock, setLock] = useState("");
  const { locale, lang } = useGeneralSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const featuredPages = pages.filter(
      (page) =>
        page.data.favorite === true &&
        (type !== "" ? page.data.type === type : true)
    );

    // currentRecordType값 있으면 추가 필터링
    const filtered =
      currentRecordType !== ""
        ? featuredPages.filter((page) => {
            const pageType = subType ? page?.data?.sub_type : page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentRecordType.toLowerCase();
          })
        : featuredPages;

    // 중복되지 않는 고유한 타입만 추출 (전체 프로젝트 페이지 기준)
    const uniqueTypeOptions = Array.from(
      new Set(
        pages
          .map((item) => item?.data?.type)
          .filter((data): data is string => Boolean(data))
      )
    );

    const uniqueSubTypeOptions = Array.from(
      new Set(
        featuredPages
          .map((item) => item?.data?.sub_type)
          .filter((data): data is string => Boolean(data))
      )
    );

    // "전체" 아이템을 맨 앞에 추가
    const typeOptions: any[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
      },
      ...uniqueTypeOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
      })),
    ];

    // "전체" 아이템을 맨 앞에 추가
    const subTypeOptions: any[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
      },
      ...uniqueSubTypeOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
      })),
    ];

    const allOptions = subType ? subTypeOptions : typeOptions;

    return {
      filteredPages: filtered,
      allOptions: allOptions,
    };
  }, [pages, currentRecordType, currentIndex]); //

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentRecordType]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredPages.length) % filteredPages.length
    );
  };
  if (filteredPages.length === 0) {
    return null; // favorite 게시글이 없으면 아무것도 표시하지 않음
  }

  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
  };

  // const handlePassword = (password: string) => {
  //   setLock(password);
  // };
  const handleRouter = (currentPage: any) => {
    if (currentPage.data.password === "") {
      router.push(currentPage.url);
    }
  };
  const currentPage = filteredPages[currentIndex];

  return (
    <section className="px-4 w-full">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="FEATURED"
        currentRecordType={currentRecordType}
        allOptions={allOptions}
        handleRecordTypeChange={handleRecordTypeChange}
      />
      {/* 주요 게시글 슬라이더 */}
      <div
        className="relative bg-gradient-to-br from-white to-neutral-200
       dark:from-neutral-900 dark:to-neutral-700 rounded-lg 
       border border-neutral-200 dark:border-neutral-700 overflow-hidden
       hover:shadow-lg transition-all duration-300
         hover:border-neutral-300 dark:hover:border-neutral-500  p-8
         flex flex-col gap-4
       "
      >
        {currentPage?.data && (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 왼쪽: 텍스트 내용 */}
            <div className="flex-1">
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* 제목 */}

                  <div
                    onClick={() => handleRouter(currentPage)}
                    className="flex flex-row justify-start items-center mb-4 gap-2"
                  >
                    <h3
                      className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white  leading-tight
                    hover:underline transition-all duration-300"
                    >
                      {currentPage.data.title.length > 35
                        ? currentPage.data.title.slice(0, 35) + "..."
                        : currentPage.data.title}
                    </h3>
                  </div>

                  <div className="flex flex-row justify-start items-center gap-2  text-neutral-500 dark:text-neutral-400 mb-6">
                    {" "}
                    {currentPage.data.type && (
                      <div className="flex items-center gap-2 ">
                        <FolderClosedIcon className="w-4 h-4" />
                        <span className="text-sm">{currentPage.data.type}</span>
                      </div>
                    )}
                    {currentPage.data.password !== "" && (
                      <div className="flex flex-row  gap-1 text-sm justify-start items-center">
                        /<LockIcon className="w-4 h-4" />
                        <span className="text-sm">{locale.COMMON.LOCKED}</span>
                      </div>
                    )}
                  </div>

                  {/* 날짜 */}
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-4">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">
                      {getYearMonthDay(
                        currentPage.data.date,
                        locale === "kr-KR" ? "kr-KR" : "en-US"
                      )}
                      &nbsp; &nbsp;
                      {getDistanceFromToday(currentPage.data.date, lang)}
                    </span>
                  </div>

                  {/* 요약 */}
                  {currentPage.data.summary && (
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                      {currentPage.data.summary}
                    </p>
                  )}

                  {/* sub_type */}
                  {currentPage.data.sub_type && (
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-6">
                      <TagIcon className="w-4 h-4" />
                      <span className="text-sm">
                        {currentPage.data.sub_type}
                      </span>
                    </div>
                  )}
                </div>

                {/* 자세히 보기 버튼 */}
                <div className="flex flex-row justify-start items-center gap-2">
                  <Link
                    href={currentPage.url}
                    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300 font-medium hover:underline transition-all duration-300"
                  >
                    {locale.INTRO.READ_MORE}→
                  </Link>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 영역 */}
            <div className="flex-1 relative  flex items-center justify-center h-[250px]  ">
              {/* 페이지 커버 이미지가 있으면 표시, 없으면 기본 일러스트레이션 */}
              {currentPage.data.pageCover ? (
                <LazyImage
                  alt={currentPage.data.title}
                  priority={true}
                  src={currentPage.data.pageCover}
                  className="h-[250px] w-full border border-neutral-200 dark:border-neutral-700  rounded-xl object-cover object-center 
             "
                />
              ) : (
                <div className="text-center">
                  <div className="h-full w-full mx-auto mb-4 bg-gradient-to-br from-neutral-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {currentPage.data.title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    {currentPage.data.title}
                  </p>
                </div>
              )}

              {/* 슬라이더 화살표 */}
              {filteredPages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute hover:cursor-pointer   left-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200 
                bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute hover:cursor-pointer right-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200  bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {/* 슬라이더 인디케이터 */}
        {filteredPages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {filteredPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-neutral-600 dark:bg-neutral-200"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRecords;
