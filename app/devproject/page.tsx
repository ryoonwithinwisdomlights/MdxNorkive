import { getStaticNotionRecordsSortByDirTypeWithoutDateTitle } from "@/app/api/load-recordsData";
import NoRecordFound from "@/components/NoRecordFound";
import DevProjectIntro from "@/components/records/DevProjectIntro";
import DevprojectRecordsItem from "@/components/records/DevprojectRecordsItem";

export default async function Page() {
  const { props }: any =
    await getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
      from: "index",
      type: "Devproject",
    });
  const devProjectList: [] = props.archiveRecords;
  return (
    <div className="mb-10 pb-20 md:py-10 w-full py-3 flex flex-col min-h-full">
      <DevProjectIntro />
      <div className="flex flex-row justify-end">
        <div className="space-y-6 w-full px-2">
          {devProjectList ? (
            devProjectList?.map((item: any, index) => {
              return (
                <DevprojectRecordsItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              );
            })
          ) : (
            <NoRecordFound />
          )}
        </div>
      </div>
    </div>
  );
}
