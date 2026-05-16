import { useRef, useState } from "react";

export const useIdleDetection = () => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    // Clear any existing timeout so only one runs at a time
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start a fresh 15-minute countdown. marks idle when starts and action restarts it
    timerRef.current = setTimeout(
      () => {
        setIsIdle(true);
      },
      15 * 60 * 1000,
    );
  };

  return { isIdle, setIsIdle, resetTimer };
};
