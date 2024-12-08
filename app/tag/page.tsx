import EngineeringRecordsItem from "@/components/records/EngineeringRecordsItem";
import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "../api/load-recordsData";
import TagList from "@/components/records/TagList";

export default async function Page() {
  return <TagList />;
}
