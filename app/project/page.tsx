"use client";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import { getPages } from "@/lib/source";
import NotFound from "@/app/not-found";
export default function Page() {
  // const pages = getPages();

  // if (!pages) NotFound();
  // console.log("pages::", pages);
  return (
    <GeneralRecordTypePageWrapper>
      <RightSlidingDrawer />
      <BasicRecordPage />
    </GeneralRecordTypePageWrapper>
  );
}
