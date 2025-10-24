import { useSettingsStore } from "@/lib/stores";
import { Settings2Icon } from "lucide-react";
import React from "react";

const SettingButton = () => {
  const { toggleSettings } = useSettingsStore();
  return (
    <button data-tooltip={"Settings"} onClick={toggleSettings}>
      <Settings2Icon className="w-6 h-6" />
    </button>
  );
};

export default SettingButton;
