"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import SwitchLanguage from "@/modules/shared/SwitchLanguage";
import ToggleDarkModeButton from "@/modules/shared/ToggleDarkModeButton";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const SettingModal = () => {
  const { setting, handleSettings, locale } = useGeneralSiteSettings();

  return (
    <Dialog open={setting} onOpenChange={handleSettings}>
      <DialogContent className="max-w-md w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
            {locale.SITE.SETTINGS}
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1 text-neutral-800 dark:text-neutral-200">
            <Label>{locale.SITE.DISPLAY_LIGHT}</Label>
          </div>
          <ToggleDarkModeButton />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1 text-neutral-800 dark:text-neutral-200">
            <Label>{locale.SITE.LOCALE}</Label>
          </div>
          <SwitchLanguage />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
