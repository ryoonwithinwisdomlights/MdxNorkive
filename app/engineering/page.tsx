import EngineeringRecordsItem from "@/components/records/EngineeringRecordsItem";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Engineering",
    });

  const engineeringList: [] = props.archiveRecords;
  return (
    <div className="mb-10 pb-20 md:py-10 w-full py-3 flex flex-col min-h-full">
      <div className="mb-4 py-2 mr-4 flex flex-col justify-end">
        <div className="flex flex-row justify-end text-xs  text-stone-600 font-extralight dark:text-neutral-200 hover:text-stone-800 ">
          browsing all the engineering related records you have learned
        </div>
        <div className="text-4xl  dark:text-neutral-100 flex flex-row justify-end ">
          Software Engineering <span className="text-[#f1efe9e2]">.</span>
        </div>
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1 text-right my-2 mr-4 ">
          배우고 기록한 좋은
          <span className="font-semibold "> 지식, 정보, 앎</span>에 대한
          <span className="text-[#cbcac4e2] dark:text-[#ffffff] font-bold">
            {" "}
            아카이브.
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className="space-y-6 w-11/12 px-2">
          {engineeringList?.map((item: any, index) => {
            return (
              <EngineeringRecordsItem
                key={index}
                pIndex={index}
                pId={item.id}
                pTitle={item.title}
                pPosts={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
