import React from 'react'
import { BLOG } from '@/blog.config'

const Footer = ({ siteInfo }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightDate = (function () {
    if (Number.isInteger(BLOG.SINCE) && BLOG.SINCE < currentYear) {
      return BLOG.SINCE + '-' + currentYear
    }
    return currentYear
  })() // 바로실행함수

  return (
    <footer className="z-20 py-2 bg:white justify-center text-center w-full text-sm relative">
      <hr className="pb-2" />

      <div className="flex justify-center">
        <div>
          {/* <i className="mx-1 animate-pulse fas fa-heart" />{' '} */}
          <a
            href={BLOG.LINK}
            className="underline font-bold text-neutral-500 dark:text-neutral-300 "
          >
            {BLOG.AUTHOR}
          </a>
          .<br />
        </div>
        © {`${copyrightDate}`}
      </div>
    </footer>
  )
}

export default Footer
