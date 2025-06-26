// src/components/layout/Navbar.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle, NavbarIcons } from "@/components/ui";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";

const navigation = [
  {
    name: "Editor",
    href: "/",
    icon: "Editor",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Mis CVs",
    href: "/saved-cvs",
    icon: "Files",
    color: "from-green-400 to-green-600",
  },
  {
    name: "Vista Previa",
    href: "/preview",
    icon: "Preview",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Guía CV",
    href: "/guia-cv",
    icon: "Guide",
    color: "from-orange-400 to-orange-600",
  },
] as const;

// Solo para mobile - incluye configuración
const mobileNavigation = [
  {
    name: "Editor",
    href: "/",
    icon: "Editor",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Mis CVs",
    href: "/saved-cvs",
    icon: "Files",
    color: "from-green-400 to-green-600",
  },
  {
    name: "Vista Previa",
    href: "/preview",
    icon: "Preview",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Guía CV",
    href: "/guia-cv",
    icon: "Guide",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: "Settings",
    color: "from-gray-400 to-gray-600",
  },
] as const;

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme: _theme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Helper function para obtener clases de estado activo súper visible
  const getActiveClasses = (color: string) => {
    // Mapear colores a clases con máxima visibilidad
    const colorMap: { [key: string]: string } = {
      "from-blue-400 to-blue-600":
        "border-3 border-blue-500 shadow-xl shadow-blue-500/70 bg-blue-50/90 dark:bg-blue-950/50 ring-2 ring-blue-300/50 dark:ring-blue-400/30",
      "from-green-400 to-green-600":
        "border-3 border-green-500 shadow-xl shadow-green-500/70 bg-green-50/90 dark:bg-green-950/50 ring-2 ring-green-300/50 dark:ring-green-400/30",
      "from-purple-400 to-purple-600":
        "border-3 border-purple-500 shadow-xl shadow-purple-500/70 bg-purple-50/90 dark:bg-purple-950/50 ring-2 ring-purple-300/50 dark:ring-purple-400/30",
      "from-orange-400 to-orange-600":
        "border-3 border-orange-500 shadow-xl shadow-orange-500/70 bg-orange-50/90 dark:bg-orange-950/50 ring-2 ring-orange-300/50 dark:ring-orange-400/30",
      "from-gray-400 to-gray-600":
        "border-3 border-gray-500 shadow-xl shadow-gray-500/70 bg-gray-50/90 dark:bg-gray-950/50 ring-2 ring-gray-300/50 dark:ring-gray-400/30",
    };

    return (
      colorMap[color] ||
      "border-3 border-blue-500 shadow-xl shadow-blue-500/70 bg-blue-50/90 dark:bg-blue-950/50 ring-2 ring-blue-300/50 dark:ring-blue-400/30"
    );
  };

  const handleLogout = async () => {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      setIsLoggingOut(true);
      try {
        await signOut({
          callbackUrl: "/auth/login",
          redirect: true,
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        window.location.href = "/auth/login";
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserDropdownOpen]);

  // Si la sesión está cargando, mostrar skeleton moderno
  if (status === "loading") {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 shadow-2xl shadow-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-40 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm"></div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-24 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm"></div>
              <div className="w-32 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Si no hay sesión, no mostrar navbar
  if (!session) {
    return null;
  }

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0 8px 32px rgba(102, 126, 234, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-4 group relative"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

                {/* Logo container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl transform rotate-2 group-hover:rotate-6 transition-transform duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl p-3 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 transform group-hover:scale-110">
                    <Image
                      src="/logo_128x128.png"
                      alt="CVitaPilot"
                      width={48}
                      height={48}
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Navigation - Desktop (sin configuración) */}
            <div className="hidden md:flex items-center gap-4">
              {navigation.map((item, _index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative px-5 py-3 rounded-2xl ease-linear transition-transform duration-300 text-sm shadow-xl font-semibold ${
                      isActive
                        ? "bg-white/25 shadow-2xl backdrop-blur-sm border border-white/20"
                        : "hover:bg-white/15 hover:scale-105"
                    }`}
                    style={{
                      color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.85)")
                    }
                  >
                    {/* Gradient background for active item */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-2xl animate-pulse`}
                      ></div>
                    )}

                    <div className="flex items-center space-x-3 relative z-10">
                      <div
                        className={`p-1.5 rounded-lg bg-gradient-to-r ${item.color} shadow-lg transition-transform duration-300`}
                      >
                        {React.createElement(NavbarIcons[item.icon], {
                          size: 16,
                          className: "text-white",
                        })}
                      </div>
                      <span
                        className="drop-shadow-sm"
                        style={{ color: "#ffffff" }}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle - Visible en todos los tamaños */}
              <div className="block">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                  <ThemeToggle />
                </div>
              </div>

              {/* User Dropdown - Desktop & Tablet */}
              <div className="hidden sm:block relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 hover:bg-white/25 transition-all duration-500 shadow-lg hover:shadow-2xl group"
                >
                  <div className="relative">
                    {/* Avatar glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-50 blur transition-all duration-500"></div>

                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)",
                      }}
                    >
                      <span
                        className="text-base font-bold drop-shadow-lg"
                        style={{ color: "#ffffff" }}
                      >
                        {(session.user?.name || session.user?.email || "U")
                          ?.charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg">
                      <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="hidden md:block text-left">
                    <p
                      className="text-sm font-semibold drop-shadow-sm transition-colors duration-300"
                      style={{ color: "#ffffff" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#dbeafe")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#ffffff")
                      }
                    >
                      {session.user?.name || "Usuario"}
                    </p>
                    <p
                      className="text-xs transition-colors duration-300 truncate max-w-[120px]"
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255, 255, 255, 0.9)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255, 255, 255, 0.8)")
                      }
                    >
                      {session.user?.email}
                    </p>
                  </div>

                  <div
                    className="transition-colors duration-300"
                    style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    <svg
                      className={`w-5 h-5 transition-all duration-500 ${
                        isUserDropdownOpen ? "rotate-180 scale-110" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu con fondo del navbar */}
                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-3 w-72 rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
                    }}
                  >
                    {/* User Info Header */}
                    <div className="p-6 bg-white/10 backdrop-blur-sm border-b border-white/20">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/50"
                            style={{
                              background:
                                "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)",
                            }}
                          >
                            <span
                              className="text-xl font-bold drop-shadow-lg"
                              style={{ color: "#ffffff" }}
                            >
                              {(
                                session.user?.name ||
                                session.user?.email ||
                                "U"
                              )
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className="text-base font-semibold truncate"
                            style={{ color: "#ffffff" }}
                          >
                            {session.user?.name || "Usuario"}
                          </p>
                          <p
                            className="text-sm truncate"
                            style={{ color: "rgba(255, 255, 255, 0.8)" }}
                          >
                            {session.user?.email}
                          </p>
                          <div
                            className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100/20 border border-green-400/30"
                            style={{ color: "#dcfce7" }}
                          >
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                            En línea
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Options */}
                    <div className="py-3">
                      {/* Settings */}
                      <Link
                        href="/settings"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-4 p-3 hover:shadow-xl text-sm hover:bg-white/10 transition-all duration-300 group"
                        style={{ color: "#ffffff" }}
                      >
                        <div className="p-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl transition-transform duration-300 shadow-lg">
                          {React.createElement(NavbarIcons.Settings, {
                            size: 16,
                            className: "text-white",
                          })}
                        </div>
                        <span className="font-medium">Configuración</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>

                      {/* Logout - Botón rojo */}
                      <div className="px-6 py-3">
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            handleLogout();
                          }}
                          disabled={isLoggingOut}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-2xl transition-all duration-300 disabled:opacity-50 group shadow-lg hover:shadow-xl cursor-pointer"
                          style={{ color: "#ffffff" }}
                        >
                          <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            {isLoggingOut ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              React.createElement(NavbarIcons.Logout, {
                                size: 16,
                                className: "text-white",
                              })
                            )}
                          </div>
                          <span className="font-semibold">
                            {isLoggingOut
                              ? "Cerrando sesión..."
                              : "Cerrar Sesión"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 hover:bg-white/25 transition-all duration-500 shadow-lg hover:shadow-xl group"
                aria-label="Toggle mobile menu"
              >
                <div className="w-7 h-7 flex flex-col justify-center items-center space-y-1.5">
                  <div
                    className={`w-6 h-0.5 transition-all duration-500 shadow-sm ${
                      isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                    style={{ backgroundColor: "#ffffff" }}
                  ></div>
                  <div
                    className={`w-6 h-0.5 transition-all duration-500 shadow-sm ${
                      isMobileMenuOpen ? "opacity-0 scale-0" : ""
                    }`}
                    style={{ backgroundColor: "#ffffff" }}
                  ></div>
                  <div
                    className={`w-6 h-0.5 transition-all duration-500 shadow-sm ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                    style={{ backgroundColor: "#ffffff" }}
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 md:hidden animate-in fade-in duration-500"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute top-20 right-4 left-4 bottom-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-in slide-in-from-top-4 duration-600 flex flex-col"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxHeight: "calc(100vh - 6rem)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Navigation - incluye configuración */}
            <div
              className="flex-1 overflow-y-auto p-6 space-y-3 mobile-menu-scroll"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#667eea #e2e8f0",
              }}
            >
              {mobileNavigation.map((item, _index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`block w-full p-5 rounded-2xl transition-all duration-500 group relative ${
                      isActive
                        ? `text-gray-900 dark:text-white font-bold ${getActiveClasses(
                            item.color
                          )}`
                        : "bg-gray-50/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200/70 dark:border-gray-600/70 hover:border-gray-300/80 dark:hover:border-gray-500/80"
                    }`}
                  >
                    {/* Barra lateral colorida para elemento activo */}
                    {isActive && (
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${
                          item.color.includes("blue")
                            ? "bg-blue-500"
                            : item.color.includes("green")
                            ? "bg-green-500"
                            : item.color.includes("purple")
                            ? "bg-purple-500"
                            : item.color.includes("orange")
                            ? "bg-orange-500"
                            : "bg-gray-500"
                        } shadow-lg animate-pulse`}
                      />
                    )}

                    <div className="flex items-center space-x-4 relative">
                      <div
                        className={`p-3 rounded-xl shadow-lg ${
                          isActive
                            ? `bg-gradient-to-r ${item.color} scale-110`
                            : `bg-gradient-to-r ${item.color}`
                        } group-hover:scale-110 transition-all duration-300`}
                      >
                        {React.createElement(NavbarIcons[item.icon], {
                          size: 20,
                          className: "drop-shadow-sm text-white",
                        })}
                      </div>
                      <span
                        className={`text-lg ${
                          isActive ? "font-bold" : "font-semibold"
                        }`}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="ml-auto flex items-center space-x-2">
                          <div className="w-2 h-2 bg-current rounded-full shadow-lg animate-ping"></div>
                          <div className="w-2 h-2 bg-current rounded-full shadow-lg"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="flex-shrink-0 border-t border-gray-200/50 dark:border-gray-700/50 p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-purple-900/20">
              <button
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
                disabled={isLoggingOut}
                className="w-full p-5 rounded-2xl font-semibold text-lg transition-all duration-500
                          bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center space-x-4
                          hover:scale-[1.02] hover:shadow-xl shadow-red-200 dark:shadow-red-900/50
                          border border-red-400/50 dark:border-red-400/30
                          text-white"
              >
                <div className="p-2 bg-white/20 rounded-xl">
                  {isLoggingOut ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    React.createElement(NavbarIcons.Logout, {
                      size: 20,
                      className: "text-white",
                    })
                  )}
                </div>
                <span>
                  {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
