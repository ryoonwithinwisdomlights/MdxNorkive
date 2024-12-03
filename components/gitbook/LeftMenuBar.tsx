"use client";
import Link from "next/link";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faHome);
export default function LeftMenuBar() {
  return (
    <div className="w-20  border-r hidden lg:block pt-12">
      <section>
        <Link href="/" legacyBehavior>
          <div className="text-center cursor-pointer  hover:text-black">
            <FontAwesomeIcon className="text-neutral-500" icon={faHome} />
          </div>
        </Link>
      </section>
    </div>
  );
}
