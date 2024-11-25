import React, { ReactNode } from "react";
import { Transition } from "@headlessui/react";
import { useGlobal } from "@/lib/providers/globalProvider";
const CustomedTransiton = ({ children }: { children: React.ReactNode }) => {
  const { onLoading } = useGlobal();
  return (
    <Transition
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
      {children}
    </Transition>
  );
};

export default CustomedTransiton;
