import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";

export default async function Page() {
  const result: any = await getRecordPageListDataByType({
    from: "index",
    type: "Project",
    dateSort: false,
  });
  const devProjectList: [] = result.archiveRecords;
  return <BasicRecordPage type="Project" recordList={devProjectList} />;
}
