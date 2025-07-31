import { usePathname } from "next/navigation";
import ProjectCardInfo from "./ProjectCardInfo";

const RecordCardInfo = ({ item, showPageCover }) => {
  const pathname = usePathname();
  const type = pathname.split("/")[1];

  return (
    <ProjectCardInfo
      page={item}
      showPageCover={showPageCover}
      showPreview={true}
      showSummary={true}
    />
  );
};

export default RecordCardInfo;
