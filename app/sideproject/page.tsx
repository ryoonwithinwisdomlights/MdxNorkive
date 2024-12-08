import * as React from "react";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";
import SideprojectRecordsItem from "@/components/records/SideprojectRecordsItem";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Sideproject",
    });

  const sideProjectList: [] = props.archiveRecords;
  return (
    <div className="mb-10 pb-20  w-full  min-h-full">
      <div className="flex flex-col justify-end ">
        <div className="w-full px-2 pt-8 pb-6 flex flex-row justify-end items-center pr-10  ">
          <div className="flex flex-col  gap-1 text-right mr-10 ">
            <div className=" dark:text-neutral-200  text-xs  ">
              Browsing all side projects
            </div>
            <div className=" dark:text-neutral-200 text-sm  ">
              created based on everything
            </div>
            <div className=" dark:text-neutral-200   text-base ">
              you have learned.
            </div>
            <div className="flex flex-col dark:text-neutral-200  text-lg   text-right  ">
              배움과 배움으로 연결된 제작 또는 창작.
            </div>
          </div>
          <div className="text-3xl font-bold flex flex-col  dark:text-neutral-100 text-right text-neutral-900 py-2 ">
            <div className="text-[#ffffff] text-left flex flex-col justify-end  rounded-t-sm   bg-[#cbcac4e2] h-6 ">
              .
            </div>
            {/* 🍽️💿🔗 */}
            🔗 Side
            <br />
            Project
            <div className="text-[#ffffff] text-right flex flex-col justify-end rounded-b-sm bg-[#cbcac4e2] h-6">
              .
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <div className="space-y-6 w-11/12 px-2">
            {sideProjectList?.map((item: any, index) => {
              return (
                <SideprojectRecordsItem
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
    </div>
  );
}
