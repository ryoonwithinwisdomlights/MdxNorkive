/* eslint-disable no-unused-vars */
import { BLOG } from '@/blog.config'
import Link from 'next/link'

export default function InspirationItem({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle}>
      <div id={archiveTitle} className=" pb-4 text-2xl dark:text-neutral-300">
        {archiveTitle}
      </div>
      <ul>
        {archivePosts[archiveTitle]?.map(post => (
          <li
            key={post.id}
            className="border-l-2 p-2 text-xs md:text-base items-center  hover:scale-x-105
             hover:border-neutral-500 dark:hover:border-yellow-300 dark:border-neutral-400 border-neutral-300  transform duration-500"
          >
            <div id={post?.publishDay}>
              <span className="text-neutral-400 dark:text-neutral-100 dark:hover:text-yellow-300">
                {post.date?.start_date}
              </span>{' '}
              &nbsp;
              <Link
                passHref
                href={`${BLOG.SUB_PATH}/${post.slug}`}
                className="dark:text-neutral-400  dark:hover:text-yellow-300 overflow-x-hidden hover:underline cursor-pointer "
              >
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
