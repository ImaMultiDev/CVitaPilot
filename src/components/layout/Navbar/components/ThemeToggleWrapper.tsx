"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export function ThemeToggleWrapper() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? (
        <ConfiguredIcon name="sun" size={22} color="#fbbf24" />
      ) : (
        <ConfiguredIcon name="moon" size={22} color="#374151" />
      )}
    </button>
  );
}
