import { isAbleRecordPage } from "@/lib/data/service/notion-service";
import { ARCHIVE_CONFIG } from "@/lib/utils/archive-config";
import ArchiveAround from "@/modules/common/components/article/ArchiveAround";
import CategoryItem from "@/modules/common/components/catalog/CategoryItem";
import Comment from "@/modules/shared/Comment";
import NotionPage from "@/modules/shared/NotionPage";
import ShareBar from "@/modules/shared/ShareBar";
import TagItemMini from "../tag/TagItemMini";
import CatalogDrawerWrapper from "../wrapper/CatalogDrawerWrapper";
const SingleRecordsBodyForPage = ({ props, prev, next }) => {
  const { record } = props;
  return (
    <div>
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
      </section>
      {/* {!isBrowser && <CatalogDrawerWrapper record={record} />} */}
      <CatalogDrawerWrapper record={record} />
      {/* <TocDrawerWrapper props={props} /> */}
    </div>
  );
};

export default SingleRecordsBodyForPage;
