"use client";
import { BLOG } from "@/blog.config";
import copy from "copy-to-clipboard";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { LinkIcon } from "lucide-react";
// 사전에 사용할 아이콘 추가
/**
 * @author https://github.com/txs
 * @param {*} param0
 * @returns
 */
const ShareButtons = ({ shareUrl, title, body, image }) => {
  const services = BLOG.RECORD_SHARE_SERVICE.split(",");
  const titleWithSiteInfo = title + " | " + BLOG.TITLE;
  const { locale } = useGeneralSiteSettings();

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
              className="mx-1 text-neutral-50"
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
                <LinkIcon className="p-1 w-8 text-white" />
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
