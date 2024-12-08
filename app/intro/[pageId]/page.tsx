// [slug] 동적 세그먼트를 채우기 위한 `params` 목록을 반환합니다.
import { BLOG } from "@/blog.config";
import SingleRecords from "@/components/records/SingleRecords";
import { getPostBlocks } from "@/lib/notion/notion";
import { getGlobalData } from "@/lib/notion/getNotionData";

export async function generateStaticParams() {
  // 예제 데이터 - 실제로는 API 호출 등을 통해 데이터를 가져올 수 있음
  const records = [
    { pageId: "341eb5c0337801da209c34c90bc3377" },
    { pageId: "another-page-id" },
  ];
  return records.map((record) => ({
    pageId: record.pageId,
  }));
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { pageId } = await params;

  if (!pageId) {
    return <div>Invalid pageId ID</div>;
  }

  const props = await getGlobalData({
    type: "SubMenuPage",
    pageId: BLOG.NOTION_PAGE_ID,
    from: "SubMenuPage",
  });

  // console.log("IntroPage:", props.introPage);
  // Find article in list
  props.post = props?.allPages?.find((item) => {
    return item.id === pageId;
  });

  // Unable to retrieve article
  if (!props?.post) {
    props.post = null;
    return <div>Invalid IntoPagId</div>;
  }
  // Article content loading
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, "Page", 3);
  }

  // Recommended related article processing
  // const allPosts = props?.allPages?.filter(
  //   (page) =>
  //     page.type !== "CONFIG" &&
  //     page.type !== "Menu" &&
  //     page.type !== "Notice" &&
  //     page.type !== "Record" &&
  //     page.status === "Published" &&
  //     page.type !== "Page" &&
  //     page.type === "SubMenu"
  // );

  // if (allPosts && allPosts.length > 0) {
  //   const index = allPosts.indexOf(props.post);
  //   props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0];
  //   props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0];
  // } else {
  //   props.prev = null;
  //   props.next = null;
  //   props.recommendPosts = [];
  // }

  return (
    <div className="w-full h-full">
      <SingleRecords props={props} />
    </div>
  );
}

interface Post {
  id: string;
  type: string;
  tags?: string[];
}
