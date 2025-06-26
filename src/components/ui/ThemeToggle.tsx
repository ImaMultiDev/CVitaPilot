"use client";

import { useTheme } from "@/contexts";
import { NavbarIcons } from "./icons/NavbarIcons";

interface ThemeToggleProps {
  variant?: "navbar" | "mobile";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "navbar",
}) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === "mobile") {
    return (
      <button
        onClick={toggleTheme}
        className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500
                   text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500
                   transition-all duration-300 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                   focus:ring-offset-white dark:focus:ring-offset-gray-800 group"
        title={
          theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"
        }
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Sol */}
          <div
            className={`absolute transition-all duration-500 transform ${
              theme === "light"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-180 scale-75"
            }`}
          >
            <NavbarIcons.LightMode
              size={24}
              className="text-yellow-500 dark:text-yellow-400"
            />
          </div>

          {/* Luna */}
          <div
            className={`absolute transition-all duration-500 transform ${
              theme === "dark"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-180 scale-75"
            }`}
          >
            <NavbarIcons.DarkMode
              size={24}
              className="text-indigo-400 dark:text-indigo-300"
            />
          </div>
        </div>
      </button>
    );
  }

  // Variant navbar (default)
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-white/20 hover:bg-white/30 
                 text-white border border-white/30 hover:border-white/50
                 transition-all duration-300 focus:outline-none 
                 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 
                 focus:ring-offset-transparent group"
      title={
        theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"
      }
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sol */}
        <div
          className={`absolute transition-all duration-500 transform ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-180 scale-75"
          }`}
        >
          <NavbarIcons.LightMode
            size={20}
            className="text-white drop-shadow-lg"
          />
        </div>

        {/* Luna */}
        <div
          className={`absolute transition-all duration-500 transform ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-180 scale-75"
          }`}
        >
          <NavbarIcons.DarkMode
            size={20}
            className="text-white drop-shadow-lg"
          />
        </div>
      </div>

      {/* Efecto de hover */}
      <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
};
