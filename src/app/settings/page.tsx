// src/app/settings/page.tsx

import { MainLayout } from "@/components/layout/MainLayout";
import { SettingsPage } from "@/views/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración",
  description: "Configuración y utilidades de CVitaPilot",
};

export default function Settings() {
  return (
    <MainLayout>
      <SettingsPage />
    </MainLayout>
  );
}
