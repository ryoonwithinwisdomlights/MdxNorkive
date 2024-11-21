import BlogPostCard from './BlogPostCard'
import React, { useState } from 'react'
import Collapse from '@/components/Collapse'

/**
 * navigation list
 * @param posts
 * @param tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostItem = props => {
  const { group } = props
  const [isOpen, changeIsOpen] = useState(false)
  // const [isOpen, changeIsOpen] = useState(group?.selected)
  // 언제나 접어져있는 상태로 유지
  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  if (group?.category) {
    return (
      <>
        <div
          onClick={toggleOpenSubMenu}
          className="select-none flex justify-between text-sm font-sans cursor-pointer p-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-600"
          key={group?.category}
        >
          <span>{group?.category}</span>
          <div className="inline-flex items-center select-none pointer-events-none ">
            <i
              className={`px-2 fas fa-chevron-left transition-all duration-200 ${
                isOpen ? '-rotate-90' : ''
              }`}
            ></i>
          </div>
        </div>
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {group?.items?.map(post => (
            <div key={post.id} className="ml-3 border-l">
              <BlogPostCard className="text-sm ml-3" post={post} />
            </div>
          ))}
        </Collapse>
      </>
    )
  } else {
    return (
      <>
        {group?.items?.map(post => (
          <div key={post.id}>
            <BlogPostCard className="text-sm py-2" post={post} />
          </div>
        ))}
      </>
    )
  }
}

export default NavPostItem
