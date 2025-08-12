"use client";
import { loadExternalResource } from "@/lib/utils/general";
import { useEffect, useRef, useLayoutEffect, useState } from "react";

/**
 * VConsoleTs Component
 *
 * A hidden debugging tool that loads vConsole for mobile development.
 * Activates when user clicks 8 times consecutively within 1 second in the center area.
 *
 * Features:
 * - Dynamically loads vConsole library for mobile debugging
 * - Hidden activation pattern prevents accidental activation
 * - Provides developer tools in mobile environment
 * - Auto-resets counter if 8 clicks aren't completed within 1 second
 * - Only works in center 100x100 pixel area of the screen
 *
 * Use case: Mobile development, production debugging, remote user support
 */
const VConsoleTs = () => {
  const [currentTime, setTime] = useState<number>();
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    const now = Date.now();
    setTime(now);
  }, []);
  const clickCountRef = useRef<number>(0); // Click counter
  const lastClickTimeRef = useRef<number>(0); // Last click timestamp
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer reference using NodeJS.Timeout type to store timer references that work in both Node.js and browser environments

  /**
   * Loads vConsole library dynamically from CDN
   * Creates and initializes vConsole instance for mobile debugging
   */
  const loadVConsole = async (): Promise<void> => {
    try {
      const url = await loadExternalResource(
        "https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js",
        "js"
      );
      if (!url) {
        return;
      }
      const VConsole = (window as any).VConsole; // VConsole is not available on window object, so using (window as any).VConsole to bypass TypeScript type checking
      const vConsole = new VConsole();
      return vConsole;
    } catch (error) {
      console.error("Failed to load vConsole:", error);
    }
  };

  /**
   * This code works by detecting 8 consecutive click events in the browser
   * to load vConsole. Each click event must occur within a 100x100 pixel
   * range from the center of the screen.
   *
   * Activation Logic:
   * - Detects clicks in center 100x100 pixel area
   * - Counts consecutive clicks within 1 second
   * - Activates vConsole after 8 successful clicks
   * - Auto-resets counter if timing requirement not met
   */
  useEffect(() => {
    if (currentTime) {
      const clickListener = (event: MouseEvent) => {
        //   const now = Date.now();
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

        if (
          currentTime - lastClickTimeRef.current < 1000 &&
          clickCountRef.current + 1 === 8
        ) {
          loadVConsole();
          clickCountRef.current = 0; // Reset counter
          if (timerRef.current) {
            clearTimeout(timerRef.current); // Clear timer
          }
          window.removeEventListener("click", clickListener);
        } else {
          lastClickTimeRef.current = currentTime;
          clickCountRef.current += 1;

          if (clickCountRef.current > 0) {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
              clickCountRef.current = 0;
            }, 1000);
          }
        }
      };

      window.addEventListener("click", clickListener);
      return () => {
        window.removeEventListener("click", clickListener);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, []);

  return null;
};

export default VConsoleTs;
