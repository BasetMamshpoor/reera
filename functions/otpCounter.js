import { useState, useEffect, useCallback } from "react";

export const useCountdown = (initialDuration) => {
  const [countdown, setCountdown] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);

  // Format time to MM:SS
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const startCountdown = useCallback((duration) => {
    if (duration !== undefined) {
      setCountdown(duration);
    }
    setIsActive(true);
  }, []);

  const stopCountdown = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetCountdown = useCallback(
    (duration) => {
      setCountdown(duration ?? initialDuration);
      setIsActive(true);
    },
    [initialDuration]
  );

  // Countdown timer effect
  useEffect(() => {
    let timer = null;

    if (isActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, countdown]);

  return {
    countdown,
    isActive,
    startCountdown,
    stopCountdown,
    resetCountdown,
    formattedTime: formatTime(countdown),
  };
};
