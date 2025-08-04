import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { Settings2Icon } from "lucide-react";
import React from "react";

type Props = {};

const SettingButton = (props: Props) => {
  const { handleSettings } = useGeneralSiteSettings();
  return (
    <button data-tooltip={"Settings"} onClick={handleSettings}>
      <Settings2Icon className="w-6 h-6    " />
    </button>
  );
};

export default SettingButton;
