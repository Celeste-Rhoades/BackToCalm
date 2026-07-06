import { useRef, useState, useEffect } from "react";

export const useIdleDetection = ({ enabled }: { enabled: boolean }) => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    // Clear any existing timeout so only one runs at a time
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start a fresh countdown — marks idle when timer expires
    timerRef.current = setTimeout(
      () => {
        setIsIdle(true);
      },
      15 * 60 * 1000,
    );
  };

  // Start timer on mount, clean up on unmount to prevent memory leaks
  useEffect(() => {
    if (enabled) {
      resetTimer();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [enabled]);

  return { isIdle, setIsIdle, resetTimer };
};
