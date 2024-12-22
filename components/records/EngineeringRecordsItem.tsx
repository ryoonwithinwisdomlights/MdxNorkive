/* eslint-disable no-unused-vars */
import LazyImage from "@/components/shared/LazyImage";
import Link from "next/link";
import { RecordCardInfo } from "./RecordCardInfo";

export default function EngineeringRecordsItem({ pIndex, pId, pPosts }) {
  const showPreview = true;
  const showPageCover = pPosts?.pageCoverThumbnail;

  return (
    <div key={pIndex} className="w-full">
      <div className="hover:scale-110 transition-all duration-150">
        <div
          key={pId}
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="800"
          data-aos-once="false"
          data-aos-anchor-placement="top-bottom"
          id="notion-page-card"
          className={`group w-full flex justify-between md:flex-row flex-col-reverse ${
            pIndex % 2 === 1 ? "md:flex-row-reverse" : ""
          }overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-neutral-100`}
        >
          {/* Text content */}
          <RecordCardInfo
            post={pPosts}
            showPageCover={showPageCover}
            showPreview={showPreview}
            showSummary={true}
          />

          {/* Picture cover */}
          {showPageCover && (
            <Link href={pPosts.slug} passHref legacyBehavior>
              <div className="md:w-4/12 overflow-hidden">
                <LazyImage
                  priority={pIndex === 1}
                  src={pPosts?.pageCoverThumbnail}
                  className="h-full w-full object-cover object-center group-hover:scale-110 duration-500"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
