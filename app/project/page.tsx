"use client";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
export default function Page() {
  return (
    <GeneralRecordTypePageWrapper>
      <BasicRecordPage />
      <RightSlidingDrawer />
    </GeneralRecordTypePageWrapper>
  );
}
