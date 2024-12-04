// Import your Client Component
import { getStaticNotionRecordsSortByDirType } from "./api/load-recordsData";
import HomePage from "./HomePage";

// async function getPosts() {
//   const res = await fetch('https://...')
//   const posts = await res.json()
//   return posts
// }

export default async function Page() {
  // Fetch data directly in a Server Component
  //   const recentPosts = await getPosts()
  const { props }: any = await getStaticNotionRecordsSortByDirType({
    from: "index",
    type: "Post",
  });
  // Forward fetched data to your Client Component

  console.log("props.recordPosts: ", props.recordPosts);
  return props.recordPosts ? (
    <HomePage recordPosts={props.recordPosts} />
  ) : (
    <div></div>
  );
}
