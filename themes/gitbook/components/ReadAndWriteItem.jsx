/* eslint-disable no-unused-vars */
import { BLOG } from '@/blog.config'
import Link from 'next/link'

export default function ReadAndWriteItem({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle}>
      <div id={archiveTitle} className=" pb-4 text-2xl dark:text-neutral-300">
        {archiveTitle}
      </div>
      <ul>
        {archivePosts[archiveTitle]?.map(post => (
          <li
            key={post.id}
            className="border-l-2 p-1 text-xs md:text-base items-center transform duration-500  hover:scale-x-105 hover:border-neutral-500 dark:hover:border-neutral-300 dark:border-neutral-400 "
          >
            <div id={post?.publishDay}>
              <span className="text-neutral-400">{post.date?.start_date}</span>{' '}
              &nbsp;
              <Link
                passHref
                href={`${BLOG.SUB_PATH}/${post.slug}`}
                className="dark:text-neutral-400  dark:hover:text-neutral-300 overflow-x-hidden hover:underline cursor-pointer text-neutral-600"
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
