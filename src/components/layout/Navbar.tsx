// src/components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navigation = [
  { name: "Editor", href: "/", icon: "✏️" },
  { name: "Mis CVs", href: "/saved-cvs", icon: "📄" },
  { name: "Vista Previa", href: "/preview", icon: "👁️" },
  { name: "Guía CV", href: "/guia-cv", icon: "📚" },
  { name: "Configuración", href: "/settings", icon: "⚙️" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session, status } = useSession();

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
        // Fallback - redirigir manualmente
        window.location.href = "/auth/login";
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  // Si la sesión está cargando, mostrar skeleton
  if (status === "loading") {
    return (
      <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="border-3 border-gray-200 rounded-xl p-1 animate-pulse">
                <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Si no hay sesión, no mostrar navbar (usuario está en login)
  if (!session) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="border-3 border-gray-900 rounded-xl p-1 dark:bg-blue-200">
                <Image
                  src="/logo_192X64.png"
                  alt="CVitaPilot"
                  width={96}
                  height={32}
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}

            {/* Separador */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

            {/* Información del usuario */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {(session.user?.name || session.user?.email || "U")
                    ?.charAt(0)
                    .toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                {session.user?.name || session.user?.email || "Usuario"}
              </span>
            </div>

            {/* Botón de logout */}
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="secondary"
              size="sm"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {isLoggingOut ? "..." : "🚪 Salir"}
            </Button>

            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
