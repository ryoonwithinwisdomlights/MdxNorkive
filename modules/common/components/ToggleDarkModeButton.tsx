import { useEffect, useState } from "react";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { Switch } from "@headlessui/react";
import { MoonStarIcon, CloudSunIcon } from "lucide-react";

const ToggleDarkModeButton = () => {
  const { isDarkMode, handleChangeDarkMode } = useGeneralSiteSettings();
  const [mounted, setMounted] = useState(false);

  //Hydration-safemounted 체크로 클라이언트 전용 처리

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-14 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <Switch
      checked={isDarkMode}
      onChange={handleChangeDarkMode}
      className="relative inline-flex h-8 w-14 items-center rounded-sm
       transition-colors duration-300 focus:outline-none bg-neutral-200 dark:bg-neutral-600"
    >
      <span
        className={`absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-sm bg-white shadow-md transform transition duration-300 ease-in-out ${
          isDarkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <MoonStarIcon className="h-4 w-4 text-neutral-800" />
        ) : (
          <CloudSunIcon className="h-4 w-4 text-neutral-800" />
        )}
      </span>
    </Switch>
  );
};

export default ToggleDarkModeButton;
