"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/modules/common/ui/button";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";

export default function ErrorComponent(): JSX.Element {
  const { locale } = useGeneralSiteSettings();
  return (
    <div className="h-screen md:w-3/5 pl-40 flex flex-col items-center justify-center  ">
      <Image
        src="/images/error.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/images/error-dark.png"
        height={300}
        width={300}
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium mb-6">
        {locale.COMMON.INVALID_RECORD}
      </h2>
      <Button asChild>
        <Link href={"/"}>{locale.SITE.BACK}</Link>
      </Button>
    </div>
  );
}
