import {
  getNotionRecordsByType,
  getNotionRecordsByTypeWithoutDateTitle,
} from "@/lib/data/load-recordsData";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";

export default async function Page() {
  const { props }: any = await getNotionRecordsByType({
    from: "index",
    type: "Engineering",
    dateSort: false,
  });

  const engineeringList: [] = props.archiveRecords;
  return (
    <BasicRecordPage pageType="Engineering" recordList={engineeringList} />
  );
}
