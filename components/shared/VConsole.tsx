"use client";
import { loadExternalResource } from "@/lib/utils";
import { useEffect, useRef } from "react";
import vConsole from "vconsole";
// import { VConsoleOptions } from "vconsole/dist/vconsole.min.js";
//  interface VConsoleConfig {

// }
interface VConsoleOptions {
  target?: string | HTMLElement;
  defaultPlugins?: ("system" | "network" | "element" | "storage")[];
  theme?: "" | "dark" | "light";
  disableLogScrolling?: boolean;
  pluginOrder?: string[];
  onReady?: () => void;
  onClearLog?: () => void;
}
const VConsole = () => {
  const clickCountRef = useRef(0); // The number of clicks
  const lastClickTimeRef = useRef<number>(); // Last click timestamp
  const timerRef = useRef<NodeJS.Timeout>(); // timer reference
  const config: VConsoleOptions = {
    onReady: () => {
      const button = document.querySelector(".vc-switch") as HTMLElement;
      button.style.position = "fixed";
      button.style.bottom = "200px";
    },
  };

  const loadVConsole = () => {
    return new vConsole(config);
  };
  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      const now = Date.now();
      // Only listen to click events within 100x100 pixels in the center of the window
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const range = 50;
      const inRange =
        event.clientX >= centerX - range &&
        event.clientX <= centerX + range &&
        event.clientY >= centerY - range &&
        event.clientY <= centerY + range;

      if (!inRange) {
        return;
      }

      // If you click 8 times in a row within 1 second
      if (
        now - lastClickTimeRef.current < 1000 &&
        clickCountRef.current + 1 === 8
      ) {
        loadVConsole();
        clickCountRef.current = 0; // reset counter
        clearTimeout(timerRef.current); // clear timer
        window.removeEventListener("click", clickListener);
      } else {
        // If the condition is not met, reset the timestamp and counter
        lastClickTimeRef.current = now;
        clickCountRef.current += 1;
        // If the counter is not 0, set the timer
        if (clickCountRef.current > 0) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
          }, 1000);
        }
      }
    };
    // Listen for window click events
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("click", clickListener);
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
};

export default VConsole;
