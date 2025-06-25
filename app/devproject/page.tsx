import { getNotionRecordsByType } from "@/lib/data/load-recordsData";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";

export default async function Page() {
  const { props }: any = await getNotionRecordsByType({
    from: "index",
    type: "Devproject",
    dateSort: false,
  });
  const devProjectList: [] = props.archiveRecords;
  return <BasicRecordPage pageType="Devproject" recordList={devProjectList} />;
}
