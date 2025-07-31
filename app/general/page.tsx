"use client";
import GeneralRecordPage from "@/modules/blog/records/GeneralRecordPage";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

export default function Page() {
  return (
    <GeneralRecordTypePageWrapper>
      <GeneralRecordPage />
      <RightSlidingDrawer />
    </GeneralRecordTypePageWrapper>
  );
}
