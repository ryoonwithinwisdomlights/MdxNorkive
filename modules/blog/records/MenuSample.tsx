"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  BoxSelectIcon,
  ChevronDownIcon,
  PencilIcon,
  SquareStackIcon,
  TrashIcon,
} from "lucide-react";

const MenuSample = () => {
  return (
    <div className="w-52 text-right relative">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-neutral-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-neutral-700 data-open:bg-neutral-700">
          Options
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          anchor="bottom"
          className="w-52 rounded-xl border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 p-1 text-sm/6 text-neutral-900 dark:text-white shadow-lg"
        >
          <MenuItem>
            <a className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700">
              <PencilIcon className="size-4 text-neutral-500 dark:text-neutral-400" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-neutral-400 group-data-focus:inline">
                ⌘E
              </kbd>
            </a>
          </MenuItem>
          <MenuItem>
            <a className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700">
              <SquareStackIcon className="size-4 text-neutral-500 dark:text-neutral-400" />
              Duplicate
              <kbd className="ml-auto hidden font-sans text-xs text-neutral-400 group-data-focus:inline">
                ⌘D
              </kbd>
            </a>
          </MenuItem>
          <div className="my-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          <MenuItem>
            <a className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700">
              <BoxSelectIcon className="size-4 text-neutral-500 dark:text-neutral-400" />
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-neutral-400 group-data-focus:inline">
                ⌘A
              </kbd>
            </a>
          </MenuItem>
          <MenuItem>
            <a className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700">
              <TrashIcon className="size-4 text-neutral-500 dark:text-neutral-400" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-neutral-400 group-data-focus:inline">
                ⌘D
              </kbd>
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default MenuSample;
