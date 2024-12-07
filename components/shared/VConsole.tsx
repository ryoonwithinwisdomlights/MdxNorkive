"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { useEffect, useRef, useState } from "react";
import vConsole from "vconsole";

interface VConsoleOptions {
  target?: string | HTMLElement;
  defaultPlugins?: ("system" | "network" | "element" | "storage")[];
  theme?: "" | "dark" | "light";
  disableLogScrolling?: boolean;
  pluginOrder?: string[];
  onReady?: () => void;
  onClearLog?: () => void;
}

const config: VConsoleOptions = {
  onReady: () => {
    const button = document.querySelector(".vc-switch") as HTMLElement;
    button.style.position = "fixed";
    button.style.bottom = "200px";
  },
};

const VConsole = () => {
  const { currentTime } = useGlobal({});
  const clickCountRef = useRef<number>(0); // The number of clicks
  const lastClickTimeRef = useRef<number>(0); // Last click timestamp
  const timerRef = useRef<NodeJS.Timeout>(); // timer reference

  const loadVConsoleHandler = () => {
    return new vConsole(config);
  };

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
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
      if (currentTime !== 0) {
        if (
          currentTime - lastClickTimeRef.current < 1000 &&
          clickCountRef.current + 1 === 8
        ) {
          loadVConsoleHandler();
          clickCountRef.current = 0; // reset counter
          clearTimeout(timerRef.current); // clear timer
          window.removeEventListener("click", clickListener);
        } else {
          // If the condition is not met, reset the timestamp and counter
          lastClickTimeRef.current = currentTime;
          clickCountRef.current += 1;
          // If the counter is not 0, set the timer
          if (clickCountRef.current > 0) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              clickCountRef.current = 0;
            }, 1000);
          }
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
