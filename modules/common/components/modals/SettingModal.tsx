"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/modules/common/ui/dialog";
import { Label } from "@/modules/common/ui/label";
import { ModeToggle } from "@/modules/shared/ModeToggle";

const ThemeSettingModal = ({ setting }) => {
  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSettingModal;
