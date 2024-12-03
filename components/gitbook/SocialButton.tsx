"use client";
import { BLOG } from "@/blog.config";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { parseIcon } from "@/lib/utils/utils";

// 사전에 사용할 아이콘 추가
library.add(faBullhorn);

const gitHubicon = parseIcon("fab fa-github");
const twittericon = parseIcon("fab fa-twitter");
const linkedInIcon = parseIcon("fab fa-linkedin");
const emailIcon = parseIcon("fas fa-envelope");
//fas fa-envelope
//fab fa-linkedin
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
          title={"github"}
          href={BLOG.CONTACT_GITHUB}
        >
          {gitHubicon && (
            <FontAwesomeIcon
              className="transform hover:scale-125 duration-150 hover:text-yellow-400"
              icon={gitHubicon}
            />
          )}
          {/* <i className="fab fa-github transform hover:scale-125 duration-150 hover:text-yellow-400" /> */}
        </a>
      )}
      {BLOG.CONTACT_TWITTER && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"twitter"}
          href={BLOG.CONTACT_TWITTER}
        >
          {twittericon && (
            <FontAwesomeIcon
              className="transform hover:scale-125 duration-150 hover:text-yellow-400"
              icon={twittericon}
            />
          )}
        </a>
      )}
      {BLOG.CONTACT_LINKEDIN && (
        <a
          target="_blank"
          rel="noreferrer"
          href={BLOG.CONTACT_LINKEDIN}
          title={"linkedIn"}
        >
          {linkedInIcon && (
            <FontAwesomeIcon
              className="transform hover:scale-125 duration-150 hover:text-yellow-400"
              icon={linkedInIcon}
            />
          )}
          {/* <i className="transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-yellow-400 hover:text-yellow-600" /> */}
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
          title={"email"}
          href={`mailto:${BLOG.CONTACT_EMAIL}`}
        >
          {emailIcon && (
            <FontAwesomeIcon
              className="transform hover:scale-125 duration-150 hover:text-yellow-400"
              icon={emailIcon}
            />
          )}
          {/* <i className="fas fa-envelope transform hover:scale-125 duration-150 hover:text-yellow-400" /> */}
        </a>
      )}
      {/* {JSON.parse(BLOG.ENABLE_RSS) && (
        <a target="_blank" rel="noreferrer" title={'RSS'} href={'/feed'}>
          <i className="fas fa-rss transform hover:scale-125 duration-150 hover:text-yellow-600" />
        </a>
      )} */}
    </div>
  );
};
export default SocialButton;
