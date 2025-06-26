"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { NavbarIcons } from "@/components/ui";

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

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

// Helper function para obtener clases de estado activo súper visible
const getActiveClasses = (color: string) => {
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

export const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ isOpen, onToggle, onClose }) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
      setIsLoggingOut(true);
      try {
        await signOut({ redirect: true, callbackUrl: "/auth/login" });
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        setIsLoggingOut(false);
        onClose(); // Cerrar el menú
      }
    };

    return (
      <>
        {/* Botón hamburguesa */}
        <button
          onClick={onToggle}
          className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-white"
          aria-label={
            isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
          }
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </div>
        </button>

        {/* Menú móvil */}
        {isOpen && (
          <>
            {/* Overlay - Solo desde donde termina el navbar */}
            <div
              className="md:hidden fixed left-0 right-0 top-20 bottom-0 bg-black/50 z-[500]"
              onClick={onClose}
            />

            {/* Panel del menú */}
            <div
              className="md:hidden fixed left-4 right-4 top-24 h-[70vh] backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-[1000] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
              }}
            >
              {/* Contenedor con scroll */}
              <div className="h-full overflow-y-auto overflow-x-hidden mobile-menu-scroll">
                <div className="p-6 space-y-3">
                  {mobileNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={`
                        group relative flex items-center space-x-4 px-6 py-4 rounded-2xl font-semibold text-lg
                        transition-all duration-300 ease-out
                        ${
                          isActive
                            ? `text-white ${getActiveClasses(item.color)}`
                            : "text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30"
                        }
                        transform hover:scale-[1.02] active:scale-95
                      `}
                      >
                        <div className="flex items-center space-x-4">
                          {React.createElement(
                            NavbarIcons[item.icon as keyof typeof NavbarIcons],
                            {
                              className: "w-6 h-6",
                            }
                          )}
                          <span>{item.name}</span>
                        </div>

                        {/* Gradient overlay para estado activo */}
                        {isActive && (
                          <div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-10 blur-sm`}
                          />
                        )}

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    );
                  })}

                  {/* Información del usuario y Logout */}
                  {session?.user && (
                    <div className="pt-4 border-t border-white/20 space-y-3">
                      {/* Información del usuario */}
                      <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {session.user.name?.charAt(0).toUpperCase() ||
                                session.user.email?.charAt(0).toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">
                              {session.user.name || "Usuario"}
                            </p>
                            <p className="text-white/70 text-xs truncate">
                              {session.user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Botón de logout */}
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="group relative flex items-center space-x-4 w-full px-6 py-4 rounded-2xl font-semibold text-lg text-red-200 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center space-x-4">
                          {React.createElement(NavbarIcons.Logout, {
                            className: `w-6 h-6 ${
                              isLoggingOut ? "animate-spin" : ""
                            }`,
                          })}
                          <span>
                            {isLoggingOut
                              ? "Cerrando sesión..."
                              : "Cerrar sesión"}
                          </span>
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
);

MobileMenu.displayName = "MobileMenu";
