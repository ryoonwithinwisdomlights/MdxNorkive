import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/stores";
import { Switch } from "@headlessui/react";
import { MoonStarIcon, CloudSunIcon } from "lucide-react";

const ToggleDarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, isInitialized, initialize } =
    useThemeStore();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    setMounted(true);
    // 이미 초기화되지 않은 경우에만 초기화
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  // 마운트되지 않은 상태에서는 로딩 표시
  if (!mounted || !isInitialized) {
    return (
      <div className="h-8 w-14 rounded-full bg-neutral-200 animate-pulse" />
    );
  }

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      className="relative inline-flex h-8 w-14 items-center rounded-sm
       transition-colors duration-300 focus:outline-none bg-neutral-200 dark:bg-neutral-800 
       dark:hover:bg-neutral-700 hover:bg-neutral-300"
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
