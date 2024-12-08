import * as React from "react";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "../api/load-recordsData";
import SideprojectRecordsItem from "@/components/records/SideprojectRecordsItem";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Sideproject",
    });

  const sideProjectList: [] = props.archiveRecords;
  console.log("props:", props);
  return (
    <div className="mb-10 pb-20 md:py-12 w-full py-3  min-h-full">
      <div className="flex flex-col">
        <div className="w-11/12  mb-4 px-2 flex flex-row justify-evenly pb-6 ">
          <div className="flex flex-col pt-8 gap-1 text-right mr-10 ">
            <div className=" dark:text-neutral-200 mt-1 text-xs  ">
              온종일 a4종이로 모델하우스를 제작하던 5살.
            </div>
            <div className=" dark:text-neutral-200 mt-1 text-sm  ">
              즐겁게 마케팅/광고 기획을 제안하던 27살.
            </div>
            <div className=" dark:text-neutral-200  mt-1 text-base ">
              여전히 분석-조립-제안-제작을 좋아하는 개발자의
            </div>
          </div>
          <div className="text-3xl font-bold dark:text-neutral-100 text-right text-neutral-900 ">
            <div className="text-orange-500 p-0 m-0 text-left align-text-top  ">
              .{""}
            </div>
            ✂️ Side
            <br />
            Project
            <div className="text-orange-500 p-0 m-0 text-right align-text-bottom ">
              .
            </div>
          </div>
        </div>
        <div className="space-y-6 px-2">
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
  );
}
