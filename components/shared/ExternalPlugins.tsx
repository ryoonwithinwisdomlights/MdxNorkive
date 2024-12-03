"use client";
/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
// import { useGlobal } from "@/lib/providers/globalProvider";
import dynamic from "next/dynamic";

// const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
//   ssr: false
// })

// const Analytics = dynamic(
//   () =>
//     import('@vercel/analytics/react').then(async m => {
//       return m.Analytics
//     }),
//   { ssr: false }
// )

// const Busuanzi = dynamic(() => import("@/components/shared/Busuanzi"), {
//   ssr: false,
// });
const VConsole = dynamic(() => import("@/components/shared/VConsole"), {
  ssr: false,
});
const CustomContextMenu = dynamic(
  () => import("@/components/shared/CustomContextMenu"),
  { ssr: false }
);
const DisableCopy = dynamic(() => import("@/components/shared/DisableCopy"), {
  ssr: false,
});

// const { latestPosts } = useGlobal({ from: "index" });
const ExternalPlugin = (props: any) => {
  return (
    <>
      {/* {BLOG.ANALYTICS_VERCEL && <Analytics />} */}
      {/* {typeof BLOG.ANALYTICS_BUSUANZI_ENABLE === "string" &&
        JSON.parse(BLOG.ANALYTICS_BUSUANZI_ENABLE) && <Busuanzi />} */}
      {typeof BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU === "string" &&
        JSON.parse(BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU) && (
          <CustomContextMenu {...props} />
        )}
      {typeof BLOG.CAN_COPY === "string" && !JSON.parse(BLOG.CAN_COPY) && (
        <DisableCopy />
      )}
      <VConsole />
    </>
  );
};

export default ExternalPlugin;
