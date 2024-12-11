//global store by using zustand to track whether we have clicked on this or not.
import { Dispatch, SetStateAction, useState } from "react";

interface SettingStore {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const useSetting = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return {
    isOpen: isOpen,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  };
};
