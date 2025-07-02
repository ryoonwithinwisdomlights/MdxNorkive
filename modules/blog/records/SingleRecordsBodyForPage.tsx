import { isAbleRecordPage } from "@/lib/data/service/notion-service";
import { ARCHIVE_CONFIG } from "@/lib/utils/archive-config";
import ArchiveAround from "@/modules/blog/records/ArchiveAround";
import CategoryItem from "@/modules/blog/category/CategoryItem";
import Comment from "@/modules/common/components/shared/Comment";
import NotionPage from "@/modules/common/components/shared/NotionPage";
import ShareBar from "@/modules/common/components/shared/ShareBar";
import TagItemMini from "../tag/TagItemMini";
import CatalogDrawerWrapper from "./CatalogDrawerWrapper";
import { Skeleton } from "@/modules/common/ui/Skeleton";
const SingleRecordsBodyForPage = ({ props, prev, next }) => {
  const { record } = props;
  return (
    <section className="px-1 dark:text-neutral-200">
      <NotionPage record={record} />

      {/* share */}
      <ShareBar record={record} />
      {/* Archive classification and tag information */}
      <div className="mt-6 flex justify-between">
        {ARCHIVE_CONFIG.RECORD_DETAIL_CATEGORY && record?.category && (
          <CategoryItem category={record.category} />
        )}
        <div>
          {ARCHIVE_CONFIG.RECORD_DETAIL_TAG &&
            record?.tagItems?.map((tag) => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
        </div>
      </div>

      {isAbleRecordPage(record.type) && record.status === "Published" && (
        <ArchiveAround prev={prev} next={next} />
      )}
      <Comment frontMatter={record} />
      <CatalogDrawerWrapper record={record} />
    </section>
  );
};

const SingleRecordsBodyForPageSkeleton = () => {
  return <Skeleton className="h-[640x] w-full" />;
};
export default SingleRecordsBodyForPage;
SingleRecordsBodyForPage.Skeleton = SingleRecordsBodyForPage;
