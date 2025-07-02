import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { LanguagesIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/modules/common/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { dictionaries, getFilteredDictionaryListKey } from "@/lib/utils/lang";
export default function SwitchLanguage() {
  const { locale, changeLang } = useGeneralSiteSettings();
  const dicList = Object.keys(dictionaries);

  return (
    <div className="relative inline-block text-left">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-14  hover:bg-neutral-300 bg-neutral-200 dark:bg-neutral-600"
          >
            <LanguagesIcon className="h-4 w-4 text-neutral-800 dark:text-white " />

            <span className="sr-only">""</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {dicList?.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="hover:bg-neutral-200  dark:hover:bg-neutral-600  justify-center"
              onClick={() => {
                changeLang(item);
              }}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
