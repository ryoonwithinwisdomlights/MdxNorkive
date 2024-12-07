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
        <div className="text-sm  text-stone-600 font-extralight dark:text-neutral-200">
          {/* 경계를 오가며 정직하게 기록되는{" "} */}
          An archive of all the history You've recorded
          {/* An archive of everything you've ever recorded */}
          {/* Records reading room of everything you've honestly ever recorded  across borders*/}
          {/* Your archive honestly recorded across borders */}
          {/* Records reading room =열람실 */}
          {/* This is a reading room for everything that has been honestly recorded across boundaries.
          경계를 넘어 솔직하게 기록한 모든 것을 담은 열람실입니다. */}
          {/* for everything that has been honestly recorded across boundaries */}
          {/* An archive of everything honestly recorded beyond boundaries,  */}
        </div>
        <div className="w-4/5 font-extrabold  break-words text-stone-700  overflow  text-5xl  dark:text-neutral-100 underline decoration-amber-400/30 hover:decoration-amber-300">
          YEOLLAM
          <span className="text-amber-400 "> ,</span>{" "}
        </div>
      </div>
      <div className="w-full flex flex-row ">
        <div className="w-2/5  text-right ml-4 md:mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col ">
          <div className="mt-12  text-stone-600  text-center items-center dark:text-neutral-200  ">
            {/* w<br />
            i<br />
            t<br />h */}
            with
          </div>
          <div className="text-left mt-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-20   ">
            <div className="font-bold text-center items-center  text-orange-500">
              👩‍💻 <br />,
            </div>
            <div className=" font-bold  text-center items-center text-red-500">
              📙
              <br />,
            </div>
            <div className=" font-bold text-center items-center  text-amber-500 ">
              📔
              <br />,
            </div>
            <div className=" font-bold text-center items-center  text-amber-900 dark:text-stone-300">
              📝
              <br />,
            </div>
            <div className=" font-bold  text-center items-center text-amber-400">
              💡
              <br />,
            </div>
            <div className=" font-bold  text-center items-center text-orange-400">
              🎨
              <br />,
            </div>
            <div className=" font-bold  text-center items-center text-amber-900 dark:text-stone-200 ">
              🌳
            </div>
          </div>
          <div className="mt-12 text-stone-600 font-extralight text-center items-center dark:text-neutral-200  ">
            and
            <br />
            more.
            <br />
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
