"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

const mobileNavigation = [
  {
    name: "Home",
    href: "/",
    icon: "home",
  },
  {
    name: "Editor",
    href: "/editor",
    icon: "edit",
  },
  {
    name: "Mis CVs",
    href: "/saved-cvs",
    icon: "book-user",
  },
  {
    name: "Vista Previa",
    href: "/preview",
    icon: "eye",
  },
  {
    name: "Guía CV",
    href: "/guia-cv",
    icon: "documentation",
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: "settings",
  },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

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
            <ConfiguredIcon name={isOpen ? "x" : "menu"} size={32} />
          </div>
        </button>

        {/* Menú móvil */}
        {isOpen && (
          <>
            {/* Overlay - Solo desde donde termina el navbar */}
            <div
              className="md:hidden fixed left-0 right-0 top-16 bottom-0 bg-black/50 z-[500]"
              onClick={onClose}
            />

            {/* Panel del menú */}
            <div
              className="md:hidden fixed left-4 right-4 top-16 h-[70vh] backdrop-blur-xl border border-white/20 rounded-t-none rounded-b-3xl shadow-2xl z-[1000] overflow-hidden"
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
                            ? "text-white bg-white/20 border border-white/30"
                            : "text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30"
                        }
                        transform hover:scale-[1.02] active:scale-95
                      `}
                      >
                        <div className="flex items-center space-x-4">
                          <ConfiguredIcon name={item.icon} size={24} />
                          <span>{item.name}</span>
                        </div>
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
                          <ConfiguredIcon
                            name="logout"
                            size={24}
                            color="#f87171"
                            className={isLoggingOut ? "animate-spin" : ""}
                          />
                          <span>
                            {isLoggingOut
                              ? "Cerrando sesión..."
                              : "Cerrar sesión"}
                          </span>
                        </div>
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
