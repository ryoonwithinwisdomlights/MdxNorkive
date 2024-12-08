// Import your Client Component
import AllRecordsArchiveItem from "@/components/records/AllRecordsArchiveItem";
import { getStaticNotionRecordsSortByDirType } from "./api/load-recordsData";

export default async function Page() {
  const { props }: any = await getStaticNotionRecordsSortByDirType({
    from: "index",
    type: "Record",
  });

  const archiveRecords = props.archiveRecords;
  return archiveRecords ? (
    <div className=" bg-white dark:bg-black dark:text-neutral-300 mb-10 pb-20 pr-10 py-3 w-full flex flex-col min-h-full">
      <div className="flex flex-col justify-end   pt-10 ">
        <div
          className="
        flex flex-col justify-end  break-words overflow "
        >
          <div className="text-neutral-900 hover:text-neutral-600  dark:text-neutral-300 flex flex-col justify-end ">
            <div className="text-2xl flex flex-row justify-end mr-8 ">
              yeollam
            </div>
            <div
              className="text-7xl       flex flex-row justify-end underline 
         decoration-stone-400/30 "
            >
              열람.
            </div>
          </div>
        </div>
        <div className="pt-4 flex flex-row justify-end text-sm  text-stone-600 font-extralight dark:text-neutral-200 hover:text-stone-800 ">
          {/* 경계를 오가며 정직하게 기록되는{" "} */}
          Browsing of all the archive you've recorded
          {/* An archive of everything you've ever recorded */}
          {/* Records reading room of everything you've honestly ever recorded  across borders*/}
          {/* Your archive honestly recorded across borders */}
          {/* Records reading room =열람실 */}
          {/* This is a reading room for everything that has been honestly recorded across boundaries.
          경계를 넘어 솔직하게 기록한 모든 것을 담은 열람실입니다. */}
          {/* for everything that has been honestly recorded across boundaries */}
          {/* An archive of everything honestly recorded beyond boundaries,  */}
        </div>
      </div>
      <div className="flex flex-row justify-end   ">
        <div className="w-8/12  flex flex-col justify-end  items-end gap-10 bg-opacity-30 rounded-lg md:pl-10 dark:bg-black dark:bg-opacity-70 bg-white">
          {Object.keys(archiveRecords)?.map((archiveTitle, index) => (
            <AllRecordsArchiveItem
              key={index}
              archiveTitle={archiveTitle}
              archiveRecords={archiveRecords}
            />
          ))}
        </div>
        <div className="w-2/12  mt-20  dark:text-neutral-200 text-neutral-700 flex flex-col items-end  text-right ">
          <div className=" text-stone-600  text-center items-center dark:text-neutral-200  ">
            {/* w<br />
            i<br />
            t<br />h */}
            with
          </div>
          <div className="text-left mt-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-20   ">
            <div className="font-bold text-right flex flex-col items-end justify-end   text-orange-500">
              👩‍💻 <br />,
            </div>
            <div className=" font-bold text-right flex flex-col items-end justify-end  text-red-500">
              📙
              <span>,</span>
            </div>
            <div className=" font-bold text-right flex flex-col items-end justify-end   text-amber-500 ">
              📔
              <br />,
            </div>
            <div className=" font-bold text-right flex flex-col items-end justify-end  text-amber-900 dark:text-stone-300">
              📝
              <br />,
            </div>
            <div className=" font-bold  text-right flex flex-col items-end justify-end  text-amber-400">
              💡
              <br />,
            </div>
            <div className=" font-bold  text-right flex flex-col items-end  text-orange-400">
              🎨
              <br />,
            </div>
            <div className=" font-bold text-right items-center text-amber-900 dark:text-stone-200 ">
              🌳
            </div>
          </div>
          <div className="mt-12 text-stone-600 font-extralight text-right items-center dark:text-neutral-200  ">
            and
            <br />
            more
            <br />.
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
