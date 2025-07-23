"use client";
import GeneralRecordPage from "@/modules/blog/records/GeneralRecordPage";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

export default function Page() {
  const props = null;
  return (
    <GeneralRecordTypePageWrapper>
      {/* <GeneralRecordPage /> */}
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
