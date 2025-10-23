"use client";
import Image from "next/image";
import Link from "next/link";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { Button } from "@/modules/shared/ui/button";

export default function ErrorComponent() {
  const { locale } = useGeneralSiteSettings();
  return (
    <div className="h-screen md:w-3/5 pl-40 flex flex-col items-center justify-center  ">
      <Image
        src="/images/error.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:hidden"
        loading="lazy" // 레이지 로딩
      />
      <Image
        src="/images/error-dark.png"
        height={300}
        width={300}
        alt="Error"
        className="hidden dark:block"
        loading="lazy" // 레이지 로딩
      />
      <h1 className="text-xl font-medium mb-6">
        {locale.ERROR.ERROR_OCCURRED}
      </h1>
      <h2 className="text-xl font-medium mb-6">
        {locale.ERROR.INVALID_RECORD}
      </h2>
      <Button asChild>
        <Link href={"/"}>{locale.SITE.BACK}</Link>
      </Button>
    </div>
  );
}
