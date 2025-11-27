import { useEffect } from "react";

/**
 * Custom hook that debounces the execution of a function
 * @param {Function} fn - The function to debounce
 * @param {number} waitTime - The debounce delay in milliseconds
 * @param {Array} deps - Dependencies array that triggers the effect
 */
export function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    // Set a timeout to execute the function after the delay
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(t);
    };
  }, deps);
}
