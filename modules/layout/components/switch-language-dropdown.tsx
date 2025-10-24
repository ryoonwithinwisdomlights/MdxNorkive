import { useThemeStore } from "@/lib/stores";
import { dictionaries } from "@/lib/utils/lang";
import { Button } from "@/modules/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/shared/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";

export default function SwitchLanguage() {
  const { changeLang } = useThemeStore();
  const dicList = Object.keys(dictionaries);

  return (
    <div className="relative inline-block text-left ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-8 w-14 
           hover:bg-neutral-300 bg-neutral-200  dark:bg-neutral-800
           dark:hover:bg-neutral-700"
          >
            <LanguagesIcon className="h-4 w-4 text-neutral-800 dark:text-white " />

            <span className="sr-only">""</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border border-neutral-200 dark:border-neutral-700  bg-white dark:bg-neutral-900"
        >
          {dicList?.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="hover:bg-neutral-200  dark:hover:bg-neutral-700  justify-center"
              onClick={() => {
                changeLang(item);
              }}
            >
              {/* {item} */}
              {/* {dictionaries[item].LANGUAGE} */}
              {dictionaries[item as keyof typeof dictionaries].LANGUAGE}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
