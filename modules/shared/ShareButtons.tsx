"use client";
import { BLOG } from "@/blog.config";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { useCopyButton } from "@/lib/hooks/use-copy-button";
import { Check, Mail, Share } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { toast } from "sonner";
import LoadingCover from "./LoadingCover";
import { PageData } from "fumadocs-core/source";

const ShareButtons = ({ data, url }: { data: PageData; url: string }) => {
  const services = BLOG.RECORD_SHARE_SERVICE.split(",");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [titleWithSiteInfo, setTitleWithSiteInfo] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { locale } = useGeneralSiteSettings();
  const { SHARE, URL_COPIED } = locale.COMMON;

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    const fullUrl = `${window.location.origin}${url}`;
    const title = data.title + " | " + BLOG.TITLE;
    const bodyText =
      data.title + " | " + BLOG.TITLE + " " + fullUrl + " " + data?.description;

    setShareUrl(fullUrl);
    setTitleWithSiteInfo(title);
    setBody(bodyText);
  }, [data, url]);

  const [isChecked, onCopy] = useCopyButton(() => {
    void navigator.clipboard.writeText(shareUrl);
  });

  const handleEmailShare = () => {
    const subject = encodeURIComponent(titleWithSiteInfo);
    const bodyText = encodeURIComponent(`${body}\n\n${shareUrl}`);
    const mailtoLink = `mailto:?subject=${subject}&body=${bodyText}`;

    // 이메일 클라이언트가 열리지 않는 경우를 대비한 fallback
    try {
      window.location.href = mailtoLink;
    } catch (error) {
      // 이메일 클라이언트가 없는 경우 링크를 클립보드에 복사
      navigator.clipboard.writeText(mailtoLink);
      toast.success("이메일 링크가 클립보드에 복사되었습니다.");
    }
  };

  // shareUrl이 설정되지 않았으면 로딩 상태 표시
  if (!shareUrl) {
    return <LoadingCover />;
  }

  return (
    <div className="flex w-full md:justify-end">
      {services.map((singleService) => {
        switch (singleService) {
          case "facebook":
            return (
              <FacebookShareButton
                key={singleService}
                url={shareUrl}
                className="mx-1 text-neutral-50"
              >
                <FacebookIcon size={32} round iconFillColor="white" />
              </FacebookShareButton>
            );
          case "email":
            return (
              <button
                key={singleService}
                type="button"
                aria-label="이메일로 공유"
                onClick={handleEmailShare}
                className="mx-1 text-neutral-50 cursor-pointer"
              >
                <div className="w-8 h-8 bg-neutral-500 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-white" />
                </div>
              </button>
            );
          case "twitter":
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
          case "linkedin":
            return (
              <LinkedinShareButton
                key={singleService}
                url={shareUrl}
                className="mx-1"
              >
                <LinkedinIcon size={32} round iconFillColor="white" />
              </LinkedinShareButton>
            );
          case "link":
            return (
              <button
                type="button"
                aria-label={singleService}
                onClick={onCopy}
                key={singleService}
                className="cursor-pointer bg-neutral-500 text-white rounded-xl mx-1 flex flex-row gap-2 items-center px-2"
              >
                <span className="text-xs">
                  {isChecked ? URL_COPIED : SHARE}
                </span>
                {isChecked ? (
                  <Check className="size-3" />
                ) : (
                  <Share className="size-3" />
                )}
              </button>
            );
          default:
            return (
              <button
                type="button"
                aria-label={singleService}
                onClick={onCopy}
                key={"default"}
                className="cursor-pointer bg-neutral-500 text-white rounded-xl mx-1 flex flex-row gap-2 items-center px-2"
              >
                <span className="text-xs">
                  {isChecked ? URL_COPIED : SHARE}
                </span>
                {isChecked ? (
                  <Check className="size-3" />
                ) : (
                  <Share className="size-3" />
                )}
              </button>
            );
        }
      })}
    </div>
  );
};

export default ShareButtons;
