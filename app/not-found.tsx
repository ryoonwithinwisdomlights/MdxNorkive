"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/modules/shared/ui/button";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";

export default function NotFound() {
  const { locale } = useGeneralSiteSettings();
  return (
    <div className="h-screen flex flex-col items-center justify-center md:px-60 px-20 ">
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
      <h2 className="text-xl font-medium mb-6">
        {locale.COMMON.NO_RECORD_FOUND}
      </h2>
      <Button asChild>
        <Link href={"/"}> Go Back</Link>
      </Button>
    </div>
  );
}
