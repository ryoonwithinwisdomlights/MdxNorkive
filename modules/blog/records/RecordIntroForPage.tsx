import React from "react";
import ProjectIntro from "./ProjectIntro";
import EngineeringIntro from "./EngineeringIntro";
import { BasicRecordPageProps } from "@/types";

const RecordIntroForPage = ({ type }: BasicRecordPageProps) => {
  return type === "Project" ? <ProjectIntro /> : <EngineeringIntro />;
};

export default RecordIntroForPage;
