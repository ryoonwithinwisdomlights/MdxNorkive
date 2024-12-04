"use client";

import AllRecordsArchiveItem from "@/components/gitbook/records/AllRecordsArchiveItem";

export default function HomePage({ recordPosts }) {
  return (
    <div className="mb-10 pb-20  py-3 w-full flex flex-col min-h-full">
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
        <div className="w-2/5 mt-20 text-right ml-4 md:mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col ">
          <div className="text-left mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-72  ">
            <div className=" text-center items-center  text-orange-500">
              👩‍💻
              <br />
              배움.
            </div>
            {/* <div className=" font-bold  text-center items-center text-red-500">
              {" "}
              📙
              <br />
              일기.
            </div>
            <div className=" font-bold text-center items-center  text-amber-500 ">
              {" "}
              📔
              <br />
              글.
            </div>
            <div className=" font-bold text-center items-center  text-amber-900 dark:text-stone-300">
              📝
              <br /> 책.
            </div>
            <div className=" font-bold  text-center items-center text-amber-400">
              💡
              <br />
              영감.
            </div>
            <div className=" font-bold  text-center items-center text-orange-400">
              🎨
              <br />
              나눔.
            </div> */}
            <div className="   text-center items-center text-orange-400">
              🎨
              <br />과
            </div>
            <div className="  text-center items-center text-amber-900 dark:text-stone-200 ">
              🌳
              <br /> 사유
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
          {Object.keys(recordPosts)?.map((archiveTitle, index) => (
            <AllRecordsArchiveItem
              key={index}
              archiveTitle={archiveTitle}
              recordPosts={recordPosts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
