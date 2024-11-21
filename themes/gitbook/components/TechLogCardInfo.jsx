import React from 'react'
import NotionPage from '@/components/NotionPage'
import Link from 'next/link'
import TagItemMini from './TagItemMini'
// import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/formatDate'

/**
 *  TechLog list text content
 * @param {*} param0
 * @returns
 */
export const TechLogCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary
}) => {
  // console.log(' TechLogCardInfo::', post)
  return (
    <div
      className={`flex flex-col justify-between lg:p-6 p-4  ${
        showPageCover && !showPreview ? 'md:w-7/12 w-full ' : 'w-full'
      }`}
    >
      <div>
        <Link
          href={`${siteConfig('SUB_PATH', '')}/${post.slug}`}
          passHref
          className={`line-clamp-2 replace cursor-pointer text-2xl ${
            showPreview ? 'text-center' : ''
          } leading-tight font-normal text-neutral-600  hover:text-[#ff6f00] `}
        >
          <span className="menu-link ">{post.title}</span>
        </Link>
        {/* Classification */}
        {post?.category && (
          <div
            className={`flex mt-2 items-center ${
              showPreview ? 'justify-center' : 'justify-start'
            } flex-wrap  text-neutral-400 `}
          >
            <Link
              href={`/category/${post.category}`}
              passHref
              className="cursor-pointer font-light text-sm menu-link hover:text-orange-300 transform"
            >
              <i className="mr-1 far fa-folder" />
              {post.category}
            </Link>
            <span className="text-xs">
              &nbsp;&nbsp;&nbsp;{' '}
              {post.password !== '' && (
                <i className="fa-solid fa-lock">&nbsp;비공개</i>
              )}
            </span>
          </div>
        )}
        {/* Summary */}
        {(!showPreview || showSummary) && !post.results && (
          <p className="line-clamp-2 replace my-3 text-neutral-700  dark:text-neutral-300 text-sm font-light leading-7">
            {post.summary}
          </p>
        )}
        {/* search results */}
        {post.results && (
          <p className="line-clamp-2 mt-4 text-neutral-700 dark:text-neutral-300 text-sm font-light leading-7">
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}
        {/* Preview */}
        {showPreview && (
          <div className="overflow-ellipsis truncate">
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div>
        {/* date label */}
        <div className="text-neutral-400 justify-between flex">
          {/* date */}
          <Link
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className="font-light menu-link cursor-pointer text-sm leading-4 mr-3"
          >
            <i className="far fa-calendar-alt mr-1" />
            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
            <div>
              {' '}
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
