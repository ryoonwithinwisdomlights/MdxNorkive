import React from "react";
import DevProjectIntro from "./DevProjectIntro";
import EngineeringIntro from "./EngineeringIntro";
import { BasicRecordPageType } from "@/lib/models";

const RecordIntroForPage = ({ pageType }: BasicRecordPageType) => {
  return pageType === "Devproject" ? <DevProjectIntro /> : <EngineeringIntro />;
};

export default RecordIntroForPage;
