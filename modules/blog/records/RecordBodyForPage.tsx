import { BasicPageDivProps, CardInfoPageDivProps } from "@/types";
import NoRecordFound from "./NoRecordFound";
import LazyImage from "@/modules/common/components/shared/LazyImage";
import ProjectCardInfo from "./ProjectCardInfo";
import RecordCardInfo from "./RecordCardInfo";
import SubTypeCarousel from "@/modules/common/components/SubTypeCarousel";

const submenuItems = [
  { id: "1", title: "JavaScript", href: "/category/javascript" },
  { id: "2", title: "TypeScript", href: "/category/typescript" },
  { id: "3", title: "React", href: "/category/react" },
  { id: "4", title: "Next.js", href: "/category/nextjs" },
  { id: "5", title: "CSS", href: "/category/css" },
  { id: "6", title: "Tailwind", href: "/category/tailwind" },
  { id: "7", title: "Redux", href: "/category/redux" },
];

const RecordBodyForPage = ({ type, recordList }: CardInfoPageDivProps) => {
  return (
    <div className="flex flex-col">
      <SubTypeCarousel items={submenuItems} />
      <div className="flex flex-row justify-end">
        <div className="space-y-6 w-full px-2">
          {recordList && recordList.length > 0 ? (
            recordList?.map((item: any, index) => {
              const showPageCover = item?.pageCoverThumbnail;
              return (
                <div key={index} className="w-full ">
                  <div className="hover:scale-110 transition-all duration-150">
                    <div
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-easing="ease-in-out"
                      data-aos-duration="800"
                      data-aos-once="false"
                      data-aos-anchor-placement="top-bottom"
                      id="notion-page-card"
                      className={`group w-full max-md:h-72  flex py-2 justify-between md:flex-row flex-col-reverse ${
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      }overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-neutral-100`}
                    >
                      {/* Text content */}

                      {type === "Project" ? (
                        <ProjectCardInfo
                          record={item}
                          showPageCover={showPageCover}
                          showPreview={true}
                          showSummary={true}
                        />
                      ) : (
                        <RecordCardInfo
                          record={item}
                          showPageCover={showPageCover}
                          showPreview={true}
                          showSummary={true}
                        />
                      )}
                      {/* Picture cover */}
                      {showPageCover && (
                        <div className="md:w-5/12 overflow-hidden">
                          <LazyImage
                            alt=""
                            priority={index === 1}
                            src={item?.pageCoverThumbnail}
                            className="h-56 w-full object-cover object-center group-hover:scale-110 duration-500"
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
