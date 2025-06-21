// src/components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui";
import Image from "next/image";

const navigation = [
  { name: "Editor", href: "/", icon: "✏️" },
  { name: "Mis CVs", href: "/saved-cvs", icon: "📄" },
  { name: "Vista Previa", href: "/preview", icon: "👁️" },
  { name: "Guía CV", href: "/guia-cv", icon: "📚" },
  { name: "Configuración", href: "/settings", icon: "⚙️" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo_192x64.png"
                alt="CVitaPilot"
                width={96}
                height={32}
              />
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
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
