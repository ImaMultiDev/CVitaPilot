"use client";

import { useTheme } from "@/contexts";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                 hover:bg-gray-50 dark:hover:bg-gray-700 
                 transition-colors duration-200 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                 dark:focus:ring-offset-gray-800"
      title={
        theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"
      }
    >
      <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
};
