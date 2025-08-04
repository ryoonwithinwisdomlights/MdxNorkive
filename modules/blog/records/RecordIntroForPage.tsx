import { CardInfoPageDivProps } from "@/types";
import EngineeringIntro from "./EngineeringIntro";
import ProjectIntro from "./ProjectIntro";
import { usePathname } from "next/navigation";

const RecordIntroForPage = () => {
  const pathname = usePathname();
  const type = pathname.split("/")[1];
  return (
    <div className="flex flex-col justify-center">
      {type === "project" ? <ProjectIntro /> : <EngineeringIntro />}
    </div>
  );
};

export default RecordIntroForPage;
