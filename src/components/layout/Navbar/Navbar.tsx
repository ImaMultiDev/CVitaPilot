"use client";

// src/components/layout/Navbar.tsx

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  NavigationItems,
  UserDropdown,
  MobileMenu,
  NavbarSkeleton,
  ThemeToggleWrapper,
} from "./components";

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Función para obtener el logo correcto según el tema
  const getLogoSrc = (size: string = "64x64") => {
    return theme === "dark" ? `/logo_dark_${size}.png` : `/logo_${size}.png`;
  };

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Precargar logos para transiciones más suaves
  useEffect(() => {
    const preloadLogo = (targetTheme: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href =
        targetTheme === "dark" ? "/logo_dark_64x64.png" : "/logo_64x64.png";
      document.head.appendChild(link);
    };

    // Precargar logo del tema opuesto para transiciones instantáneas
    preloadLogo(theme === "dark" ? "light" : "dark");
  }, [theme]);

  // Si la sesión está cargando, mostrar skeleton moderno
  if (status === "loading") {
    return <NavbarSkeleton />;
  }

  // Si no hay sesión, no mostrar navbar
  if (!session) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 text-white brightness-110 right-0 z-[1001] transition-all duration-500 ${
          isScrolled
            ? "transform translate-y-0 shadow-2xl"
            : "transform translate-y-0"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(240, 147, 251, 0.95) 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          backdropFilter: isScrolled ? "blur(25px)" : "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isScrolled
            ? "0 10px 40px rgba(102, 126, 234, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
            : "0 8px 32px rgba(102, 126, 234, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Contenido principal del navbar */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-3 group transition-transform duration-300 hover:brightness-125"
              >
                <div className="relative px-2 w-auto h-auto items-center justify-center flex rounded-2xl bg-white/20 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,10,0.5)] overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,0,10,0.5)] active:scale-95 active:shadow-[0_0_5px_rgba(0,0,10,0.5)] transition-all duration-300">
                  <Image
                    src={getLogoSrc("64x64")}
                    alt="CVitaPilot Logo"
                    width={56}
                    height={56}
                    className="rounded-2xl transition-all duration-500 group-hover:brightness-125"
                    priority
                    key={`logo-${theme}`} // Force re-render cuando cambia el tema
                  />
                  <div className="hidden mx-2 sm:block ">
                    <h1 className="text-xl font-bold text-white drop-shadow-lg">
                      CVitaPilot
                    </h1>
                    <p className="text-xs text-white/80 font-medium">
                      Crea tu CV perfecto
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </div>

            {/* Navegación principal - Solo desktop */}
            <div className="hidden lg:flex">
              <NavigationItems />
            </div>
            {/* Botón móvil - Solo mobile */}
            <div className="flex lg:hidden">
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onToggle={toggleMobileMenu}
                onClose={closeMobileMenu}
              />
            </div>
            {/* Controles de usuario */}
            <div className="flex items-center space-x-3">
              {/* Toggle de tema */}
              <ThemeToggleWrapper />

              {/* Dropdown de usuario */}
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </nav>
    </>
  );
};
