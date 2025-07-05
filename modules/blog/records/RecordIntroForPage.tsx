import { CardInfoPageDivProps } from "@/types";
import EngineeringIntro from "./EngineeringIntro";
import ProjectIntro from "./ProjectIntro";

const RecordIntroForPage = ({ type }: CardInfoPageDivProps) => {
  return (
    <div className="mb-4  mr-4 flex flex-col justify-end">
      {type === "Project" ? <ProjectIntro /> : <EngineeringIntro />}
    </div>
  );
};

export default RecordIntroForPage;
