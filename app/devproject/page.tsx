import * as React from "react";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";
import DevprojectRecordsItem from "@/components/records/DevprojectRecordsItem";
import NoRecordFound from "@/components/NoRecordFound";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Devproject",
    });
  {
    /* 🍽️💿🔗 */
  }
  const devProjectList: [] = props.archiveRecords;
  return (
    <div className="mb-10 pb-20 md:py-10 w-full py-3 flex flex-col min-h-full">
      {/* <div className="w-full px-2 pt-8 pb-6 flex flex-row justify-end items-center pr-10  ">
          <div className="flex flex-col  gap-1 text-right mr-10 ">
            <div className=" dark:text-neutral-200  text-xs  ">
              Browsing all side projects records
            </div>
            <div className=" dark:text-neutral-200 text-sm  ">
              created based on everything
            </div>
            <div className=" dark:text-neutral-200   text-base ">
              you have learned.
            </div>
            <div className="flex flex-col dark:text-neutral-200  text-lg   text-right  ">
              배움과 배움으로 조립된 즐거움 ⥆
            </div>
          </div>
          <div className="text-3xl font-bold flex flex-col  dark:text-neutral-100 text-right text-neutral-900 py-2 ">
            <div className="text-[#ffffff] text-left flex flex-col justify-end  rounded-t-sm   bg-[#cbcac4e2] h-6 ">
              .
            </div>

            🔗 Side
            <br />
            Project
            <div className="text-[#ffffff] text-right flex flex-col justify-end rounded-b-sm bg-[#cbcac4e2] h-6">
              .
            </div>
          </div>
        </div> */}
      <div className="mb-4 mr-4 flex flex-col justify-end">
        <div className="flex flex-row justify-end text-xs  text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 pr-3">
          Take a look at the Dev Projects LEGOs
        </div>
        <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200 hover:text-neutral-800 pr-3">
          I built based on what I've enjoyed
        </div>
        <div className="text-4xl  dark:text-neutral-100 flex flex-row justify-end ">
          Dev Projects<span className="text-[#f1efe9e2]">.</span>
        </div>
        <div className=" dark:text-neutral-200 md:px-2 text-neutral-700 mt-1 text-right my-2  ">
          작고 큰 배움으로 연결된
          <span className="font-semibold "> Dev</span> 프로젝트에 대한
          <span className=" dark:text-[#ffffff] font-bold">
            &nbsp;아카이브.
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className="space-y-6 w-full px-2">
          {devProjectList ? (
            devProjectList?.map((item: any, index) => {
              return (
                <DevprojectRecordsItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
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
