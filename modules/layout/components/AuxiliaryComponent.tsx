"use client";
import { BLOG } from "@/blog.config";
import { ANALYTICS_CONFIG } from "@/config/analytics.config";
import Busuanzi from "@/modules/shared/Busuanzi";
import DebugPanel from "@/modules/shared/DebugPanel";
import DisableCopy from "@/modules/shared/DisableCopy";
import GoogleAnalytics from "@/modules/shared/GoogleAnalytics";
import VConsoleTs from "@/modules/shared/VConsoleTs";
import { useEffect, useState } from "react";

// const Analytics = dynamic(
//   () =>
//     import("@vercel/analytics/react").then((m) => {
//       return m.Analytics;
//     }),
//   { ssr: false }
// );
const AuxiliaryBlogComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {!BLOG.isProd && <DebugPanel />}
      {!BLOG.CAN_COPY && <DisableCopy />}
      {ANALYTICS_CONFIG.ANALYTICS_BUSUANZI_ENABLE && isMounted && <Busuanzi />}
      {/* {ANALYTICS_CONFIG.ANALYTICS_VERCEL && <Analytics />} */}
      {ANALYTICS_CONFIG.ANAYLTICS_GOOGLE_ID && (
        <GoogleAnalytics
          ANALYTICS_GOOGLE_ID={ANALYTICS_CONFIG.ANAYLTICS_GOOGLE_ID as string}
        />
      )}
      <VConsoleTs />
    </div>
  );
};

export default AuxiliaryBlogComponent;
