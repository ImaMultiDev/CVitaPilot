"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Inicializar tema desde localStorage o sistema
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let initialTheme: Theme = "light";

    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    } else if (prefersDark) {
      initialTheme = "dark";
    }

    setThemeState(initialTheme);

    // Aplicar inmediatamente al DOM
    const html = document.documentElement;
    if (initialTheme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", initialTheme);
  }, []);

  // Aplicar tema al document cuando cambie
  useEffect(() => {
    if (mounted) {
      const html = document.documentElement;

      if (theme === "dark") {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
      }

      localStorage.setItem("theme", theme);

      // Debug: log para verificar que se aplica
      console.log(`🎨 Tema aplicado: ${theme}`, html.classList.toString());
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`Cambiando tema de ${theme} a ${newTheme}`);
    setThemeState(newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
