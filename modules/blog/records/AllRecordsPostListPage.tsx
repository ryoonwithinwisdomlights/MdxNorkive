"use client";
import { BLOG } from "@/blog.config";
import { useGlobal } from "@/context/globalProvider";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
import NavPostListEmpty from "@/modules/layout/components/navigation-post/NavPostListEmpty";
import { AllRecordsPostListPageProps } from "@/types";
import { useRouter } from "next/navigation";
import AllRecordsPostCard from "./AllRecordsPostCard";
import PaginationSimple from "./PaginationSimple";
/**
 * Article list pagination table
 * @param page current page
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const AllRecordsPostListPage = ({
  pagenum = 1,
  posts = [],
  postCount,
}: AllRecordsPostListPageProps) => {
  const router = useRouter();
  const { searchKeyword, setSearchKeyword } = useGlobal({});
  const totalPage = Math.ceil(postCount / BLOG.RECORDS_PER_PAGE);
  const { locale } = useNorkiveTheme();
  const currentPage = +pagenum;
  const showNext = currentPage < totalPage;
  if (!posts || posts.length === 0) {
    return <NavPostListEmpty searchKeyword={searchKeyword} />;
  }
  const historGoBack = () => {
    router.back();
  };
  return (
    <div className="w-full justify-center gap-2">
      <div
        onClick={historGoBack}
        className={` ${!+showNext && "font-bold"} text-center w-2/5 mt-4 mb-10  duration-200 p-2 hover:border-neutral-200 border-b-2 hover:font-bold `}
      >
        ← {locale.PAGINATION.PREV}
      </div>
      <div id="posts-wrapper">
        {/* Article list */}
        {posts?.map((post: any) => (
          <AllRecordsPostCard key={post.id} post={post} className={""} />
        ))}
      </div>

      <PaginationSimple pagenum={pagenum} totalPage={totalPage} />
    </div>
  );
};

export default AllRecordsPostListPage;
