import { BLOG } from "@/blog.config";
import Busuanzi from "@/modules/shared/Busuanzi";
import DebugPanel from "@/modules/shared/DebugPanel";
import DisableCopy from "@/modules/shared/DisableCopy";
import VConsoleTs from "@/modules/shared/VConsoleTs";
import React from "react";

type Props = {};

const AuxiliaryBlogComponent = (props: Props) => {
  return (
    <div>
      {!BLOG.isProd && <DebugPanel />}
      {!BLOG.CAN_COPY && <DisableCopy />}
      {BLOG.ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      <VConsoleTs />
    </div>
  );
};

export default AuxiliaryBlogComponent;
