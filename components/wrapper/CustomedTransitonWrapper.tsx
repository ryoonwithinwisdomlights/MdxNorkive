"use client"; // 클라이언트 컴포넌트
import { useGlobal } from "@/lib/providers/globalProvider";
import { Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";

const CustomedTransitonWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { onLoading } = useGlobal({ from: "index" });
  const ref = useRef(null);
  // console.log(ref.current); // 렌더링 후 ref가 null인지 확인
  return (
    <Transition
      as={Fragment}
      show={!onLoading}
      appear={true}
      enter="transition ease-in-out duration-700 transform order-first"
      enterFrom="opacity-0 translate-y-16"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-16"
      unmount={false}
    >
      <div ref={ref} className="bg-white p-4">
        {children}
      </div>
    </Transition>
  );
};

export default CustomedTransitonWrapper;
