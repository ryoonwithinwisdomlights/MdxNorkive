import { BLOG } from '@/blog.config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug
  // console.log('post::', post)
  return (
    <div
      key={post.id}
      className={`${className} py-1 cursor-pointer px-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-500  ${
        currentSelected ? 'bg-yellow-50 text-yellow-500' : ''
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <Link href={`${BLOG.SUB_PATH}/${post.slug}`} passHref>
          <span className="text-xs pr-1">{post.pageIcon} </span>
          {/* {' '}
          {post.title.length > 25
            ? post.title.substr(0, 25) + '...'
            : post.title} */}
          {post.title}
        </Link>
      </div>
    </div>
  )
}

export default BlogPostCard
