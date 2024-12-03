import { BLOG } from '@/blog.config'
import React from 'react'

/**
 * Social contact button set
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  return (
    <div className="space-x-3 text-xl text-neutral-600 dark:text-neutral-400 flex-wrap flex justify-center ">
      {BLOG.CONTACT_GITHUB && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'github'}
          href={BLOG.CONTACT_GITHUB}
        >
          <i className="fab fa-github transform hover:scale-125 duration-150 hover:text-yellow-400" />
        </a>
      )}
      {BLOG.CONTACT_TWITTER && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'twitter'}
          href={BLOG.CONTACT_TWITTER}
        >
          <i className="fab fa-twitter transform hover:scale-125 duration-150 hover:text-yellow-400" />
        </a>
      )}
      {BLOG.CONTACT_LINKEDIN && (
        <a
          target="_blank"
          rel="noreferrer"
          href={BLOG.CONTACT_LINKEDIN}
          title={'linkedIn'}
        >
          <i className="transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-yellow-400 hover:text-yellow-600" />
        </a>
      )}
      {/* {BLOG.CONTACT_INSTAGRAM && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'instagram'}
          href={BLOG.CONTACT_INSTAGRAM}
        >
          <i className="fab fa-instagram transform hover:scale-125 duration-150 hover:text-yellow-600" />
        </a>
      )} */}
      {BLOG.CONTACT_EMAIL && (
        <a
          target="_blank"
          rel="noreferrer"
          title={'email'}
          href={`mailto:${BLOG.CONTACT_EMAIL}`}
        >
          <i className="fas fa-envelope transform hover:scale-125 duration-150 hover:text-yellow-400" />
        </a>
      )}
      {/* {JSON.parse(BLOG.ENABLE_RSS) && (
        <a target="_blank" rel="noreferrer" title={'RSS'} href={'/feed'}>
          <i className="fas fa-rss transform hover:scale-125 duration-150 hover:text-yellow-600" />
        </a>
      )} */}
    </div>
  )
}
export default SocialButton
