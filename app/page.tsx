// Import your Client Component
import { getStaticPropsForRecords } from "./api/load-recordsData";
import HomePage from "./main-page";

// async function getPosts() {
//   const res = await fetch('https://...')
//   const posts = await res.json()
//   return posts
// }

export default async function Page() {
  // Fetch data directly in a Server Component
  //   const recentPosts = await getPosts()
  const { props }: any = await getStaticPropsForRecords({ from: "archive" });
  // Forward fetched data to your Client Component
  return <HomePage archivePosts={props.archivePosts} />;
}
