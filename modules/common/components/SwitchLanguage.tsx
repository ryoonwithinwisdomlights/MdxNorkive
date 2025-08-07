import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { dictionaries } from "@/lib/utils/lang";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";

export default function SwitchLanguage() {
  const { changeLang } = useGeneralSiteSettings();
  const dicList = Object.keys(dictionaries);

  return (
    <div className="relative inline-block text-left ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-14 transform hover:scale-110 duration-500 hover:bg-neutral-100/50 bg-neutral-100 dark:bg-neutral-600">
            <LanguagesIcon className="h-4 w-4 text-neutral-800 dark:text-white " />

            <span className="sr-only">""</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="  border border-neutral-200 dark:border-neutral-700  bg-white dark:bg-neutral-900"
        >
          {dicList?.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="hover:bg-neutral-100  dark:hover:bg-neutral-600  justify-center"
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
