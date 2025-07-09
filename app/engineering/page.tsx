"use client";
import { getAllRecordPageListByType } from "@/lib/notion/controller";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default function Page() {
  const props = null;
  return (
    <GeneralRecordTypePageWrapper>
      <BasicRecordPage />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
