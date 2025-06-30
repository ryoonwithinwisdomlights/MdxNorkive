import { MENU_MOBILE } from "@/lib/constants/menu-mobile.constansts";
import Comment from "@/modules/shared/Comment";
import NotionPage from "@/modules/shared/NotionPage";
import ShareBar from "@/modules/shared/ShareBar";
import ArticleAround from "@/modules/common/components/article/ArticleAround";
import CategoryItem from "@/modules/common/components/catalog/CategoryItem";
import TagItemMini from "../tag/TagItemMini";
import { EXCLUDED_PAGE_TYPES } from "@/lib/constants/menu.constants";
import CatalogDrawerWrapper from "../wrapper/CatalogDrawerWrapper";

const SingleRecordsBodyForPage = ({ record, prev, next }) => {
  return (
    <div id="container">
      <section className="px-1 dark:text-neutral-200">
        <div id="archive-wrapper">
          <NotionPage record={record} />
        </div>
        {/* share */}
        <ShareBar record={record} />
        {/* Article classification and tag information */}
        <div className="mt-6 flex justify-between">
          {MENU_MOBILE.RECORD_DETAIL_CATEGORY && record?.category && (
            <CategoryItem category={record.category} />
          )}
          <div>
            {MENU_MOBILE.RECORD_DETAIL_TAG &&
              record?.tagItems?.map((tag) => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
          </div>
        </div>

        {!EXCLUDED_PAGE_TYPES.includes(record.type) &&
          record.status === "Published" && (
            <ArticleAround prev={prev} next={next} />
          )}
        <Comment frontMatter={record} />
      </section>
      <CatalogDrawerWrapper record={record} />
    </div>
  );
};

export default SingleRecordsBodyForPage;
