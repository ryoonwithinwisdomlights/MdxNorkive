import React from "react";
import DevProjectIntro from "./DevProjectIntro";
import EngineeringIntro from "./EngineeringIntro";
import { BasicRecordPageProps } from "@/types";

const RecordIntroForPage = ({ type }: BasicRecordPageProps) => {
  return type === "Project" ? <DevProjectIntro /> : <EngineeringIntro />;
};

export default RecordIntroForPage;
