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
const instagramIcon = parseIcon("fab fa-instagram");
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
              className="transform hover:scale-125 duration-150 hover:text-stone-400"
              icon={gitHubicon}
            />
          )}
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
              className="transform hover:scale-125 duration-150 hover:text-stone-400"
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
              className="transform hover:scale-125 duration-150 hover:text-stone-400"
              icon={linkedInIcon}
            />
          )}
        </a>
      )}
      {BLOG.CONTACT_INSTAGRAM && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"instagram"}
          href={BLOG.CONTACT_INSTAGRAM}
        >
          {instagramIcon && (
            <FontAwesomeIcon
              className="transform hover:scale-125 duration-150 hover:text-stone-400"
              icon={instagramIcon}
            />
          )}
        </a>
      )}
      {BLOG.CONTACT_EMAIL && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"email"}
          href={`mailto:${BLOG.CONTACT_EMAIL}`}
        >
          {emailIcon && (
            <FontAwesomeIcon
              className="transform hover:scale-125 duration-150 hover:text-stone-400"
              icon={emailIcon}
            />
          )}
        </a>
      )}
    </div>
  );
};
export default SocialButton;
