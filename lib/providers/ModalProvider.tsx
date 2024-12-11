"use client";

import { useEffect, useState } from "react";
import ThemeSettingModal from "@/components/modals/SettingModal";
import { Toaster } from "sonner";
import { useSetting } from "@/hooks/use-settings";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const setting = useSetting();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <>
      <Toaster position="bottom-right" />
    </>
  );
};
