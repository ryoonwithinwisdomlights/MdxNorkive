"use client";
import { useThemeStore } from "@/lib/stores";
import { InjectedOptionMenuProps } from "@/types/components/pageutils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Book, ChevronDownIcon } from "lucide-react";
import { memo } from "react";

const InjectedOptionMenu = memo(
  ({
    currentRecordType = "",
    allOptions,
    initString,
    handleRecordTypeChange,
  }: InjectedOptionMenuProps) => {
    const { locale } = useThemeStore();
    return (
      <Menu>
        <MenuButton
          className="w-40  inline-flex items-center justify-center
  gap-2 rounded-md bg-neutral-50 dark:bg-neutral-800 
  dark:border-neutral-100
  border border-neutral-200 
  px-3 py-1.5 text-sm font-semibold
    text-neutral-800 dark:text-white shadow-inner shadow-white/10 

    data-focus:outline-white
     data-hover:bg-neutral-100
     data-hover:dark:bg-neutral-700
     "
        >
          {currentRecordType !== ""
            ? currentRecordType
            : initString
            ? initString
            : locale.COMMON.ALL}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="w-52 rounded-xl border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 p-1 text-sm/6 text-neutral-900 dark:text-white shadow-lg"
        >
          {allOptions.map((item) => (
            <MenuItem key={item.id}>
              <button
                onClick={() => handleRecordTypeChange(item.option)}
                className="group flex w-full items-center gap-2 rounded-lg px-3 
              py-1.5 data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700"
              >
                <Book className="size-4 text-neutral-500 dark:text-neutral-400" />
                {item.title}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    );
  }
);

InjectedOptionMenu.displayName = "InjectedOptionMenu";

export default InjectedOptionMenu;
