import { BLOG } from '@/blog.config'
import BlogPostCard from './BlogPostCard'
import NavPostListEmpty from './NavPostListEmpty'
import PaginationSimple from './PaginationSimple'
/**
 * Article list pagination table
 * @param page current page
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount }) => {
  const totalPage = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)

  if (!posts || posts.length === 0) {
    return <NavPostListEmpty />
  }
  const historGoBack = () => {
    window.history.back()
  }
  return (
    <div className="w-full justify-center gap-2">
      <div
        onClick={historGoBack}
        className="text-center w-2/5 mt-4 mb-10  duration-200 p-2 hover:border-orange-200 border-b-2 hover:font-bold "
      >
        ← 뒤로가기
      </div>
      <div id="posts-wrapper">
        {/* Article list */}
        {posts?.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* <div className="my-10 flex justify-between font-medium text-black dark:text-neutral-100 space-x-2">
        <Button
          onClick={historGoBack}
          className="text-center w-full duration-200 px-4 py-2 hover:border-yellow-500 border-b-2 hover:font-bold "
        >
          ← 뒤로가기
        </Button>
      </div> */}
      <PaginationSimple page={page} totalPage={totalPage} />
    </div>
  )
}

export default BlogPostListPage
