"use client";
import { BLOG } from "@/blog.config";
import AllRecordsPostCard from "./AllRecordsPostCard";
import NavPostListEmpty from "./NavPostListEmpty";
import PaginationSimple from "../PaginationSimple";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/lib/providers/globalProvider";
import { AllRecordsPostListPageProps } from "@/lib/models";
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
  const { locale } = useGlobal({ from: "index" });
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
