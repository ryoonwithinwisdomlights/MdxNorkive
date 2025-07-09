"use client";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

// export const revalidate = 600;
// 10분 지난 뒤 누군가 방문하면 백그라운드 regenerate
export default function Page() {
  const props = null;
  return (
    <GeneralRecordTypePageWrapper>
      <ArchiveIntro />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
