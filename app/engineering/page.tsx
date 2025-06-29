import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
    type: "Engineering",
    dateSort: false,
  });

  const engineeringList: [] = props.archiveRecords;
  return <BasicRecordPage type="Engineering" recordList={engineeringList} />;
}
