import { isAbleRecordPage } from "@/lib/data/function";
import { ARCHIVE_CONFIG } from "@/lib/utils/archive-config";
import CategoryItem from "@/modules/blog/category/CategoryItem";
import ArchiveAround from "@/modules/blog/records/ArchiveAround";
import Comment from "@/modules/common/components/shared/Comment";
import NotionPage from "@/modules/common/components/shared/NotionPage";
import ShareBar from "@/modules/common/components/shared/ShareBar";
import { Skeleton } from "@/modules/common/ui/Skeleton";
import TagItemMini from "../tag/TagItemMini";
import TableOfContentsDrawerMobile from "./TableOfContentsDrawerMobile";
const SingleRecordsBodyForPage = ({ page }) => {
  return (
    <section className="px-1 dark:text-neutral-200 flex flex-col gap-y-6">
      <NotionPage record={page} />

      {/* share */}
      <ShareBar record={page} />
      {/* Archive classification and tag information */}
      <div className="flex justify-between">
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
      <TableOfContentsDrawerMobile page={page} />
    </section>
  );
};

const SingleRecordsBodyForPageSkeleton = () => {
  return <Skeleton className="h-[640x] w-full" />;
};
export default SingleRecordsBodyForPage;
SingleRecordsBodyForPage.Skeleton = SingleRecordsBodyForPageSkeleton;
