import { isAbleRecordPage } from "@/lib/data/function";
import { ARCHIVE_CONFIG } from "@/lib/utils/archive-config";
import ArchiveAround from "@/modules/blog/records/ArchiveAround";
import CategoryItem from "@/modules/blog/category/CategoryItem";
import Comment from "@/modules/common/components/shared/Comment";
import NotionPage from "@/modules/common/components/shared/NotionPage";
import ShareBar from "@/modules/common/components/shared/ShareBar";
import TagItemMini from "../tag/TagItemMini";
import CatalogDrawerWrapper from "./CatalogDrawerWrapper";
import { Skeleton } from "@/modules/common/ui/Skeleton";
import { AVAILABLE_PAGE_TYPES } from "@/constants/menu.constants";
const SingleRecordsBodyForPage = ({ page }) => {
  // const { page } = props;

  // console.log("SingleRecordsBodyForPage page.status :", page.status);
  // console.log("SingleRecordsBodyForPage page.type :", page.type);
  // console.log("isAbleRecordPage(page.type):", isAbleRecordPage(page));
  const res = AVAILABLE_PAGE_TYPES.includes(page.type);

  console.log("res::::::::::", res);
  return (
    <section className="px-1 dark:text-neutral-200">
      <NotionPage record={page} />

      {/* share */}
      <ShareBar record={page} />
      {/* Archive classification and tag information */}
      <div className="mt-6 flex justify-between">
        {ARCHIVE_CONFIG.RECORD_DETAIL_CATEGORY && page?.category && (
          <CategoryItem category={page.category} />
        )}
        <div>
          {ARCHIVE_CONFIG.RECORD_DETAIL_TAG &&
            page?.tagItems?.map((tag) => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
        </div>
      </div>

      {isAbleRecordPage(page) && page.status === "Published" && (
        <ArchiveAround prev={page.prev} next={page.next} />
      )}
      <Comment frontMatter={page} />
      <CatalogDrawerWrapper record={page} />
    </section>
  );
};

const SingleRecordsBodyForPageSkeleton = () => {
  return <Skeleton className="h-[640x] w-full" />;
};
export default SingleRecordsBodyForPage;
SingleRecordsBodyForPage.Skeleton = SingleRecordsBodyForPage;
