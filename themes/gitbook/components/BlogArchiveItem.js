import { BLOG } from '@/blog.config'
import Link from 'next/link'

/**
 * Archive grouping

 * @param {*} param0
 * @returns
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  // console.log('archivePosts=========:', archivePosts)
  return (
    <div key={archiveTitle}>
      <div
        id={archiveTitle}
        className="pt-10  text-amber-400/50 font-semibold pb-4 text-2xl  "
      >
        {archiveTitle}
      </div>
      <ul>
        {archivePosts[archiveTitle]?.map(post => (
          <li
            key={post.id}
            className="border-l-4 border-amber-400/40  hover:border-amber-300 flex flex-row p-2 text-xs md:text-base items-center text-justify  hover:scale-x-105  dark:hover:border-amber-400 dark:border-amber-400/30 transform duration-500"
          >
            {/**   */}
            <div id={post?.publishDay}>
              <span className="text-amber-400/60 dark:hover:text-amber-300">
                {post.date?.start_date}
              </span>{' '}
              <span
                key={post.id}
                className="pl-2 pr-3 text-xs text-justify lh "
              >
                {post.pageIcon}
              </span>
              <Link
                passHref
                href={`${BLOG.SUB_PATH}/${post.slug}`}
                className="dark:text-neutral-400 hover:text-amber-400  dark:hover:text-amber-200 overflow-x-hidden hover:underline cursor-pointer text-neutral-600"
              >
                {post.title}{' '}
                <span className="text-xs">
                  {/* &nbsp;{post.password !== '' && '🔐'} */}
                  &nbsp;
                  {post.password !== '' && (
                    <i className="fa-solid fa-lock">&nbsp;비공개</i>
                  )}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
