"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface UserDropdownProps {
  className?: string;
}

export const UserDropdown: React.FC<UserDropdownProps> = React.memo(
  ({ className = "" }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    if (!session?.user) {
      return null;
    }

    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={toggleUserDropdown}
          className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white group max-w-[200px] sm:max-w-none"
          disabled={isLoggingOut}
        >
          {/* Eliminamos el UserAvatar y el círculo */}
          <span className="font-medium text-sm truncate">
            {session.user.name || session.user.email?.split("@")[0]}
          </span>
          <ConfiguredIcon
            name="chevron-down"
            size={16}
            className={`transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isUserDropdownOpen && (
          <div
            className="absolute right-0 mt-3 w-72 sm:w-80 max-w-[calc(100vw-2rem)] backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 z-[110] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
            }}
          >
            {/* Header del dropdown */}
            <div className="p-6 bg-white/10 backdrop-blur-sm border-b border-white/20 text-white">
              <div className="flex items-center space-x-4">
                {/* Eliminamos el UserAvatar grande */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg truncate">
                    {session.user.name || "Usuario"}
                  </p>
                  <p className="text-white/80 text-sm truncate">
                    {session.user.email}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium bg-green-500/20 text-green-100 px-2 py-1 rounded-full border border-green-400/50 shadow-lg shadow-green-400/50 backdrop-blur-sm">
                        En línea
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Opciones del menú */}
            <div className="p-2">
              <Link
                href="/settings"
                onClick={() => setIsUserDropdownOpen(false)}
                className="flex items-center space-x-3 w-full px-4 py-3 text-white hover:bg-white/15 rounded-2xl transition-all duration-200 group"
              >
                <ConfiguredIcon
                  name="settings"
                  size={20}
                  className="text-white/80 group-hover:text-white transition-colors"
                />
                <span className="font-medium">Configuración</span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-3 w-full px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-2xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ConfiguredIcon
                  name="log-out"
                  size={20}
                  className={`text-red-200 ${isLoggingOut ? "animate-spin" : ""} group-hover:text-white transition-colors`}
                />
                <span className="font-medium">
                  {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

UserDropdown.displayName = "UserDropdown";
