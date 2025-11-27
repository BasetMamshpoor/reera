import { useState, useEffect, useRef } from "react";

export default function usePersistentSession(
  key,
  initialValue = {},
  options = {}
) {
  const { debounceMs = 0 } = options;
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("Error reading from sessionStorage:", err);
      return initialValue;
    }
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !key) return;

    if (debounceMs > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
      }, debounceMs);
    } else {
      sessionStorage.setItem(key, JSON.stringify(state));
    }

    return () => clearTimeout(timeoutRef.current);
  }, [key, state, debounceMs]);

  const clear = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
    setState(initialValue);
  };

  return [state, setState, clear];
}
