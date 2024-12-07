// Import your Client Component
import AllRecordsArchiveItem from "@/components/records/AllRecordsArchiveItem";
import { getStaticNotionRecordsSortByDirType } from "./api/load-recordsData";

export default async function Page() {
  const { props }: any = await getStaticNotionRecordsSortByDirType({
    from: "index",
    type: "Post",
  });

  const archiveRecords = props.archiveRecords;
  return archiveRecords ? (
    <div className=" bg-white dark:bg-black dark:text-neutral-300 mb-10 pb-20  py-3 w-full flex flex-col min-h-full">
      <div className="flex flex-col pt-10 ">
        <div className="text-lg text-stone-600 font-extralight dark:text-neutral-200">
          경계를 오가며 정직하게 기록되는{" "}
        </div>
        <div className="w-4/5 font-extrabold  break-words text-stone-700  overflow  text-3xl dark:text-neutral-100 underline decoration-amber-400/30 hover:decoration-amber-300">
          YEOLLAMSIL
          <span className="text-amber-400 "> .</span>{" "}
        </div>
      </div>
      <div className="w-full flex flex-row ">
        <div className="w-2/5 mt-16 text-right ml-4 md:mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col ">
          <div className="text-left mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-36   ">
            <div className="font-bold text-center items-center  text-orange-500">
              👩‍💻
            </div>
            <div className=" font-bold  text-center items-center text-red-500">
              📙
            </div>
            <div className=" font-bold text-center items-center  text-amber-500 ">
              📔
            </div>
            <div className=" font-bold text-center items-center  text-amber-900 dark:text-stone-300">
              📝
            </div>
            <div className=" font-bold  text-center items-center text-amber-400">
              💡
            </div>
            <div className=" font-bold  text-center items-center text-orange-400">
              🎨
            </div>
            <div className=" font-bold  text-center items-center text-amber-900 dark:text-stone-200 ">
              🌳
            </div>
            <div className="  text-stone-600 font-extralight text-center items-center dark:text-neutral-200  ">
              로 <br />
              <br />
              이<br />루<br />어<br />
              진.
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-10 bg-opacity-30 rounded-lg md:pl-10 dark:bg-black dark:bg-opacity-70 bg-white">
          {Object.keys(archiveRecords)?.map((archiveTitle, index) => (
            <AllRecordsArchiveItem
              key={index}
              archiveTitle={archiveTitle}
              archiveRecords={archiveRecords}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
