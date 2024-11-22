import { BLOG } from '@/blog.config'
import { useGlobal } from '@/lib/global'
import copy from 'copy-to-clipboard'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WorkplaceIcon,
  WorkplaceShareButton
} from 'react-share'

/**
 * @author https://github.com/txs
 * @param {*} param0
 * @returns
 */
const ShareButtons = ({ shareUrl, title, body, image }) => {
  const services = BLOG.POSTS_SHARE_SERVICES.split(',')
  const titleWithSiteInfo = title + ' | ' + BLOG.TITLE
  const { locale } = useGlobal()

  const copyUrl = () => {
    copy(shareUrl)
    alert(locale.COMMON.URL_COPIED)
  }

  return (
    <>
      {services.map(singleService => {
        if (singleService === 'facebook') {
          return (
            <FacebookShareButton
              key={singleService}
              url={shareUrl}
              className="mx-1"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          )
        }
        if (singleService === 'messenger') {
          return (
            <FacebookMessengerShareButton
              key={singleService}
              url={shareUrl}
              appId={BLOG.FACEBOOK_APP_ID}
              className="mx-1"
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          )
        }
        if (singleService === 'reddit') {
          return (
            <RedditShareButton
              key={singleService}
              url={shareUrl}
              title={titleWithSiteInfo}
              windowWidth={660}
              windowHeight={460}
              className="mx-1"
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          )
        }
        if (singleService === 'email') {
          return (
            <EmailShareButton
              key={singleService}
              url={shareUrl}
              subject={titleWithSiteInfo}
              body={body}
              className="mx-1"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          )
        }
        if (singleService === 'twitter') {
          return (
            <TwitterShareButton
              key={singleService}
              url={shareUrl}
              title={titleWithSiteInfo}
              className="mx-1"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          )
        }
        if (singleService === 'linkedin') {
          return (
            <LinkedinShareButton
              key={singleService}
              url={shareUrl}
              className="mx-1"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          )
        }
        if (singleService === 'workplace') {
          return (
            <WorkplaceShareButton
              key={singleService}
              url={shareUrl}
              quote={titleWithSiteInfo}
              className="mx-1"
            >
              <WorkplaceIcon size={32} round />
            </WorkplaceShareButton>
          )
        }
        if (singleService === 'pocket') {
          return (
            <PocketShareButton
              key={singleService}
              url={shareUrl}
              title={titleWithSiteInfo}
              className="mx-1"
            >
              <PocketIcon size={32} round />
            </PocketShareButton>
          )
        }
        if (singleService === 'instapaper') {
          return (
            <InstapaperShareButton
              key={singleService}
              url={shareUrl}
              title={titleWithSiteInfo}
              className="mx-1"
            >
              <InstapaperIcon size={32} round />
            </InstapaperShareButton>
          )
        }
        if (singleService === 'link') {
          return (
            <button
              aria-label={singleService}
              key={singleService}
              className="cursor-pointer bg-yellow-500 text-white rounded-full mx-1"
            >
              <div alt={locale.COMMON.URL_COPIED} onClick={copyUrl}>
                <i className="fas fa-link w-8" />
              </div>
            </button>
          )
        }
        return <></>
      })}
    </>
  )
}

export default ShareButtons
