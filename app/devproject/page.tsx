import { getNotionRecordsByType } from "@/lib/data/actions/pages/page-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";

export default async function Page() {
  const { props }: any = await getNotionRecordsByType({
    from: "index",
    type: "Project",
    dateSort: false,
  });
  const devProjectList: [] = props.archiveRecords;
  return <BasicRecordPage type="Project" recordList={devProjectList} />;
}
