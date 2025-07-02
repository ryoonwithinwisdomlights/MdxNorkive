"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/modules/common/ui/button";

export default function ErrorComponent(): JSX.Element {
  return (
    <div className="h-screen flex flex-col items-center justify-center ">
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
      <h2 className="text-xl font-medium mb-6">Something went wrong!</h2>
      <Button asChild>
        <Link href={"/"}> Go Back</Link>
      </Button>
    </div>
  );
}
