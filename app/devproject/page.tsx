import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Devproject",
    });
  const devProjectList: [] = props.archiveRecords;
  return <BasicRecordPage pageType="Devproject" recordList={devProjectList} />;
}
