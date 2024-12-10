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
      <div className="flex flex-col justify-end  pt-4 ">
        <div
          className="
        flex flex-col justify-end  break-words overflow "
        >
          <div className="  dark:text-neutral-300 flex flex-col justify-end ">
            <div className="text-1xl flex flex-row justify-end mr-2 text-neutral-600  ">
              archive | recorded in | notion
            </div>
            <div
              className="text-7xl font-semibold text-black flex flex-row justify-end underline 
         decoration-black "
            >
              Norkive
            </div>
            <div className="mt-2 flex flex-row justify-end text-sm text-stone-800 font-extralight dark:text-neutral-200  ">
              Browsing all archives written and recored in Notion.
            </div>
          </div>
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
            with
          </div>
          <div className="text-left mt-10 dark:text-neutral-200 text-neutral-600 flex flex-col gap-20   ">
            <div className=" text-right flex flex-col items-end justify-end   ">
              👩‍💻 <br />,
            </div>
            <div className="  text-right flex flex-col items-end justify-end  ">
              📙
              <span>,</span>
            </div>
            <div className="  text-right flex flex-col items-end justify-end    ">
              📔
              <br />,
            </div>
            <div className="  text-right flex flex-col items-end justify-end  ">
              📝
              <br />,
            </div>
            <div className="   text-right flex flex-col items-end justify-end  ">
              💡
              <br />,
            </div>
            <div className="   text-right flex flex-col items-end  ">
              🎨
              <br />,
            </div>
            <div className="  text-right items-center  ">🌳</div>
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
