"use client";
import { BLOG } from "@/blog.config";

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

/**
 * Social contact button set
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  return (
    <div className="space-x-3 text-xl text-neutral-600 dark:text-neutral-400 flex-wrap flex justify-center ">
      {(BLOG.CONTACT_TWITTER as string).length > 0 && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"twitter"}
          href={BLOG.CONTACT_TWITTER}
        >
          <TwitterLogoIcon className="w-5 h-5    transform hover:scale-125 duration-500 hover:text-neutral-400" />
        </a>
      )}
      {(BLOG.CONTACT_LINKEDIN as string).length > 0 && (
        <a
          target="_blank"
          rel="noreferrer"
          href={BLOG.CONTACT_LINKEDIN}
          title={"linkedIn"}
        >
          <LinkedInLogoIcon className="w-5 h-5    transform hover:scale-125 duration-500 hover:text-neutral-400" />
        </a>
      )}
      {(BLOG.CONTACT_INSTAGRAM as string).length > 0 && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"instagram"}
          href={BLOG.CONTACT_INSTAGRAM}
        >
          <InstagramLogoIcon className="w-5 h-5    transform hover:scale-125 duration-500 hover:text-neutral-400" />
        </a>
      )}
      {(BLOG.CONTACT_EMAIL as string).length > 0 && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"email"}
          href={`mailto:${BLOG.CONTACT_EMAIL}`}
        >
          <EnvelopeClosedIcon className="w-5 h-5   transform hover:scale-125 duration-500 hover:text-neutral-400" />
        </a>
      )}
      {(BLOG.CONTACT_GITHUB as string).length > 0 && (
        <a
          target="_blank"
          rel="noreferrer"
          title={"github"}
          href={BLOG.CONTACT_GITHUB}
        >
          <GitHubLogoIcon className="w-5 h-5  transform hover:scale-125 duration-500 hover:text-neutral-400" />
        </a>
      )}
    </div>
  );
};
export default SocialButton;
