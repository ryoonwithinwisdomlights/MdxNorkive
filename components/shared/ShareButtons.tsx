"use client";
import { BLOG } from "@/blog.config";
import { useGlobal } from "@/lib/providers/globalProvider";
import copy from "copy-to-clipboard";

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
  WorkplaceShareButton,
} from "react-share";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 사전에 사용할 아이콘 추가
library.add(faLink);
/**
 * @author https://github.com/txs
 * @param {*} param0
 * @returns
 */
const ShareButtons = ({ shareUrl, title, body, image }) => {
  const services = BLOG.RECORDS_SHARE_SERVICES.split(",");
  const titleWithSiteInfo = title + " | " + BLOG.TITLE;
  const { locale } = useGlobal({ from: "index" });

  const copyUrl = () => {
    copy(shareUrl);
    alert(locale.COMMON.URL_COPIED);
  };

  return (
    <>
      {services.map((singleService) => {
        if (singleService === "facebook") {
          return (
            <FacebookShareButton
              key={singleService}
              url={shareUrl}
              className="mx-1 text-gray-50"
            >
              <FacebookIcon size={32} round iconFillColor="white" />
            </FacebookShareButton>
          );
        }
        if (singleService === "reddit") {
          return (
            <RedditShareButton
              key={singleService}
              url={shareUrl}
              title={titleWithSiteInfo}
              windowWidth={660}
              windowHeight={460}
              className="mx-1"
            >
              <RedditIcon size={32} round iconFillColor="white" />
            </RedditShareButton>
          );
        }
        if (singleService === "email") {
          return (
            <EmailShareButton
              key={singleService}
              url={shareUrl}
              subject={titleWithSiteInfo}
              body={body}
              className="mx-1  text-neutral-50"
            >
              <EmailIcon size={32} round iconFillColor="white" />
            </EmailShareButton>
          );
        }
        if (singleService === "twitter") {
          return (
            <TwitterShareButton
              key={singleService}
              url={shareUrl}
              title={titleWithSiteInfo}
              className="mx-1"
            >
              <TwitterIcon size={32} round iconFillColor="white" />
            </TwitterShareButton>
          );
        }
        if (singleService === "linkedin") {
          return (
            <LinkedinShareButton
              key={singleService}
              url={shareUrl}
              className="mx-1"
            >
              <LinkedinIcon size={32} round iconFillColor="white" />
            </LinkedinShareButton>
          );
        }
        if (singleService === "link") {
          return (
            <button
              aria-label={singleService}
              key={singleService}
              className="cursor-pointer bg-neutral-500 text-white rounded-full mx-1"
            >
              <div onClick={copyUrl}>
                <FontAwesomeIcon className="w-8 text-white" icon={faLink} />
              </div>
            </button>
          );
        }
        return <></>;
      })}
    </>
  );
};

export default ShareButtons;
