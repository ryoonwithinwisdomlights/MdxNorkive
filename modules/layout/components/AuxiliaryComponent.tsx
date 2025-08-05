import { BLOG } from "@/blog.config";
import Busuanzi from "@/modules/common/components/shared/Busuanzi";
import DebugPanel from "@/modules/common/components/shared/DebugPanel";
import DisableCopy from "@/modules/common/components/shared/DisableCopy";
import VConsoleTs from "@/modules/common/components/shared/VConsoleTs";

type Props = {};

const AuxiliaryBlogComponent = (props: Props) => {
  return (
    <div>
      {!BLOG.isProd && <DebugPanel />}
      {!BLOG.CAN_COPY && <DisableCopy />}
      {BLOG.ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      {/* <MobileTOCButton /> */}
      <VConsoleTs />
    </div>
  );
};

export default AuxiliaryBlogComponent;
