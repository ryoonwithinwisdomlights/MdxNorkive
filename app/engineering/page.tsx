import EngineeringRecordsItem from "@/components/records/EngineeringRecordsItem";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "../api/load-recordsData";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Engineering",
    });

  const engineeringList: [] = props.archiveRecords;
  console.log("props:", props);
  return (
    <div className="mb-10 pb-20 md:py-12 w-full py-3  min-h-full">
      <div className="flex flex-col">
        <div className="w-full mb-4 py-6">
          <div>
            {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
            {/* &gt;<Image src={ReadPic} alt="So-I-Read-And-Write" /> */}
            <div className="text-3xl font-bold dark:text-neutral-100">
              TIL Tech Logs <span className="text-[#ff6f00]">.</span>
            </div>
            <div className=" dark:text-neutral-200 mt-1  flex flex-row p-2 ">
              <div className="flex flex-row  text-base align-bottom  break-words  text-right">
                {" "}
                一 개라도 배우는
                <div className="font-bold text-[#ff6f00] break-words  text-right">
                  &nbsp;완료주의
                </div>{" "}
              </div>

              <div className=" text-sm  align-bottom pt-1">
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;{">"}&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </div>
              <div className="text-xs align-bottom  pt-2 break-words text-right">
                완벽하려 꾸물대는 완성주의
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 px-2">
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
