"use client";

import SettingModal from "@/modules/common/components/modals/SettingModal";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <>
      <SettingModal />
      <Toaster
        // className="bg-white dark:bg-neutral-800"
        position="bottom-right"
        // style={{
        //   backgroundColor: "black",
        //   color: "white",
        //   border: "1px solid white",
        //   borderRadius: "10px",
        //   padding: "10px",
        // }}
      />
    </>
  );
};
