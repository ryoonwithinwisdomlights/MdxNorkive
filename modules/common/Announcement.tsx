// "use client";

// import { useNav } from "@/lib/context/NavInfoProvider";

// // 공지사항전용
// const Announcement = () => {
//   const { notice } = useNav({ from: "index" });
//   if (notice?.blockMap) {
//     return (
//       notice.status === "Published" && (
//         <div className="justify-center">
//           <section id="announcement-wrapper" className="rounded-xl px-2 py-4">
//             {
//               <div id="announcement-content ">
//                 {/* <NotionPage record={notice} /> */}
//               </div>
//             }
//           </section>
//         </div>
//       )
//     );
//   } else {
//     return <></>;
//   }
// };
// export default Announcement;
