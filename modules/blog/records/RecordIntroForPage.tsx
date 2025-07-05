import React from "react";
import ProjectIntro from "./ProjectIntro";
import EngineeringIntro from "./EngineeringIntro";
import { BasicRecordPageProps } from "@/types";

const RecordIntroForPage = ({ type }: BasicRecordPageProps) => {
  return (
    <div className="mb-4  mr-4 flex flex-col justify-end">
      {type === "Project" ? <ProjectIntro /> : <EngineeringIntro />}
    </div>
  );
};

export default RecordIntroForPage;
