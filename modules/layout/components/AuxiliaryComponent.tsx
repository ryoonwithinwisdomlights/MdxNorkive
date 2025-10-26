"use client";
import { lazy, useEffect, useState } from "react";
import { BLOG } from "@/blog.config";
import { ANALYTICS_CONFIG } from "@/config/analytics.config";

import DebugPanel from "@/modules/shared/DebugPanel";
import DisableCopy from "@/modules/shared/DisableCopy";

const GoogleAnalytics = lazy(() => import("@/modules/shared/GoogleAnalytics"));
const VConsoleTs = lazy(() => import("@/modules/shared/VConsoleTs"));
const Busuanzi = lazy(() => import("@/modules/shared/Busuanzi"));
const AuxiliaryBlogComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {BLOG.DEBUG && <DebugPanel />}
      {!BLOG.CAN_COPY && <DisableCopy />}
      {ANALYTICS_CONFIG.ANALYTICS_BUSUANZI_ENABLE && isMounted && <Busuanzi />}
      {/* {ANALYTICS_CONFIG.ANALYTICS_VERCEL && <Analytics />} */}
      {ANALYTICS_CONFIG.ANAYLTICS_GOOGLE_ID && (
        <GoogleAnalytics
          ANALYTICS_GOOGLE_ID={ANALYTICS_CONFIG.ANAYLTICS_GOOGLE_ID as string}
        />
      )}
      <VConsoleTs />
    </>
  );
};

export default AuxiliaryBlogComponent;
