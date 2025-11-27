"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme}
      richColors
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl font-medium shadow-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800",
          title: "text-base",
          description: "text-sm text-gray-600 dark:text-gray-300",
          actionButton:
            "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-md",
          cancelButton:
            "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md",
          success: "bg-green-500 text-white dark:bg-green-600 border-green-600",
          error: "bg-red-500 text-white dark:bg-red-600 border-red-600",
          info: "bg-blue-500 text-white dark:bg-blue-600 border-blue-600",
          warning:
            "bg-yellow-400 text-black dark:bg-yellow-500 border-yellow-600",
        },
      }}
    />
  );
}
