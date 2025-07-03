"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarIcons } from "@/components/ui";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: "Home",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    name: "Editor",
    href: "/editor",
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

interface NavigationItemsProps {
  className?: string;
}

// Helper function para obtener clases de estado activo súper visible
const getActiveClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    "from-indigo-400 to-indigo-600":
      "border-3 border-indigo-500 shadow-xl shadow-indigo-500/70 bg-indigo-50/90 dark:bg-indigo-950/50 ring-2 ring-indigo-300/50 dark:ring-indigo-400/30",
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

export const NavigationItems: React.FC<NavigationItemsProps> = React.memo(
  ({ className = "" }) => {
    const pathname = usePathname();

    return (
      <div className={`hidden md:flex items-center gap-6 ${className}`}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
              group relative px-6 py-3 rounded-2xl font-semibold text-sm
              transition-all duration-300 ease-out min-w-32
              ${
                isActive
                  ? `text-gray-900 dark:text-white ${getActiveClasses(
                      item.color
                    )}`
                  : "text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
              }
              transform hover:brightness-125 transition ease-in active:scale-95 
            `}
            >
              <div className="flex items-center space-x-2">
                {React.createElement(
                  NavbarIcons[item.icon as keyof typeof NavbarIcons],
                  {
                    className: "w-4 h-4",
                  }
                )}
                <span>{item.name}</span>
              </div>

              {/* Gradient overlay para estado activo */}
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-20 blur-sm`}
                />
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          );
        })}
      </div>
    );
  }
);

NavigationItems.displayName = "NavigationItems";
