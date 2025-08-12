"use client";
import { useEffect, useState } from "react";
import { BLOG } from "@/blog.config";
import Busuanzi from "@/modules/shared/Busuanzi";
import DebugPanel from "@/modules/shared/DebugPanel";
import DisableCopy from "@/modules/shared/DisableCopy";
import VConsoleTs from "@/modules/shared/VConsoleTs";

const AuxiliaryBlogComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {!BLOG.isProd && <DebugPanel />}
      {!BLOG.CAN_COPY && <DisableCopy />}
      {BLOG.ANALYTICS_BUSUANZI_ENABLE && isMounted && <Busuanzi />}
      <VConsoleTs />
    </div>
  );
};

export default AuxiliaryBlogComponent;
