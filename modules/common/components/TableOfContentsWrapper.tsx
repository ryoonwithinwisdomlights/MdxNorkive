"use server";
import {
  getRecordPageDataById,
  setPrevNextRecommendInRecordPage,
} from "@/lib/data/actions/pages/page-action";
import TableOfContentsClientWrapper from "./TableOfContentsClientWrapper";

type Props = { pageId: string };

const TableOfContentsWrapper = async ({ pageId }: Props) => {
  try {
    const recordMap = await getRecordPageDataById({ pageId });
    const record = await setPrevNextRecommendInRecordPage(recordMap);
    const toc = record?.tableOfContents;

    if (!toc || toc.length === 0) return null;

    return (
      <TableOfContentsClientWrapper
        record={JSON.parse(JSON.stringify(record))}
      />
    );
  } catch (error) {
    console.error("TableOfContentsWrapper Error:", error);
    return null;
  }
};

export default TableOfContentsWrapper;
