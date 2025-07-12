"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

const navigation = [
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
];

export function NavigationItems() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-base hover:bg-blue-100/60 dark:hover:bg-blue-900/30 group ${
            pathname === item.href
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200"
          }`}
        >
          <ConfiguredIcon
            name={item.icon}
            size={20}
            className="transition-colors duration-300"
          />
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
