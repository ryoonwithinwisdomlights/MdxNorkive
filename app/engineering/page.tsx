import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";
import BasicRecordPage from "@/components/records/BasicRecordPage";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Engineering",
    });

  const engineeringList: [] = props.archiveRecords;
  return (
    <BasicRecordPage pageType="Engineering" recordList={engineeringList} />
  );
}
