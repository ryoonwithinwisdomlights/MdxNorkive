import LazyImage from "@/modules/common/components/shared/LazyImage";
import CategoryCarousel from "@/modules/common/components/CategoryCarousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NoRecordFound from "./NoRecordFound";
import RecordCardInfo from "./RecordCardInfo";
import { getPages } from "@/lib/source";
import NotFound from "@/app/not-found";
import { useMemo } from "react";

interface CategoryItem {
  id: number;
  title: string;
  href: string;
  isActive?: boolean;
}

const RecordBodyForPage = () => {
  const pathname = usePathname();
  const subType = pathname.split("/")[1].toLowerCase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = getPages();

  if (!pages) NotFound();

  // URL에서 category 쿼리 파라미터 가져오기
  const categoryParam = searchParams.get("category");

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allCategories } = useMemo(() => {
    // 기본 필터링: Project 타입만
    const projectPages = pages.filter(
      (page) => page.data.sub_type?.toLowerCase() === subType
    );

    // 카테고리 파라미터가 있으면 추가 필터링
    const filtered = categoryParam
      ? projectPages.filter((page) => {
          const pageCategory = page?.data?.category;
          if (!pageCategory) return false;

          // 대소문자 구분 없이 비교
          return pageCategory.toLowerCase() === categoryParam.toLowerCase();
        })
      : projectPages;

    // 중복되지 않는 고유한 카테고리만 추출 (전체 프로젝트 페이지 기준)
    const uniqueCategories = Array.from(
      new Set(
        projectPages
          .map((item) => item?.data?.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    // "전체" 아이템을 맨 앞에 추가
    const categories: CategoryItem[] = [
      {
        id: -1,
        title: "All",
        href: `/${subType}`,
        isActive: !categoryParam, // 카테고리 파라미터가 없으면 활성
      },
      ...uniqueCategories.map((category, index) => ({
        id: index,
        title: category,
        href: `/${subType}?category=${category.toLowerCase()}`,
        isActive: categoryParam?.toLowerCase() === category.toLowerCase(), // 현재 선택된 카테고리인지 확인
      })),
    ];

    return {
      filteredPages: filtered,
      allCategories: categories,
    };
  }, [pages, categoryParam]); // 의존성 배열에 pages와 categoryParam만 포함

  return (
    <div className="flex flex-col w-full items-center px-10 ">
      <CategoryCarousel items={allCategories} />
      <div className="flex flex-row justify-end">
        <div className="space-y-6 w-full px-2">
          {filteredPages && filteredPages.length > 0 ? (
            filteredPages.map((item: any, index) => {
              const showPageCover = item?.data?.pageCover;
              return (
                <div
                  key={item?.data?.notionId || index}
                  className="w-full md:max-w-3xl max-md:max-w-full"
                >
                  <div className="hover:scale-110 transition-all duration-150">
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
                      } overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-neutral-100`}
                    >
                      <RecordCardInfo
                        item={item}
                        showPageCover={showPageCover}
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
