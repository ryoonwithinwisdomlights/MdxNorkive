import EngineeringRecordsItem from "@/components/records/EngineeringRecordsItem";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";
import NoRecordFound from "@/components/NoRecordFound";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Engineering",
    });

  const engineeringList: [] = props.archiveRecords;
  return (
    <div className="mb-10 pb-20 md:py-10 w-full py-3 flex flex-col min-h-full">
      <div className="mb-4  mr-4 flex flex-col justify-end">
        <div className="flex flex-row justify-end text-xs  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 ">
          browsing all the engineering related records you have learned
        </div>
        <div className="text-4xl  dark:text-neutral-100 flex flex-row justify-end ">
          Software Engineering <span className="text-[#f1efe9e2]">.</span>
        </div>
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1 text-right my-2 mr-4 ">
          배우고 기록한 좋은
          <span className="font-semibold "> 지식, 정보, 앎</span>에 대한
          <span className=" dark:text-[#ffffff] font-bold"> 아카이브.</span>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className="space-y-6 w-11/12 px-2">
          {engineeringList ? (
            engineeringList?.map((item: any, index) => {
              const showPreview = true;
              const showSummary = true;
              const showPageCover = item?.pageCoverThumbnail;

              return (
                <EngineeringRecordsItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pPosts={item}
                />
              );
            })
          ) : (
            <NoRecordFound />
          )}
        </div>
      </div>
    </div>
  );
}
