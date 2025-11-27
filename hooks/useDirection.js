import { useState, useEffect } from "react";

export function useDirection() {
  const [dir, setDir] = useState(
    document.documentElement.getAttribute("dir") || "ltr"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newDir = document.documentElement.getAttribute("dir") || "ltr";
      if (newDir !== dir) setDir(newDir);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, [dir]);

  return dir;
}
