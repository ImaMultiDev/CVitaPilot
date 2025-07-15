"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { SettingsPage } from "@/views/Settings";
import { TutorialOverlay } from "@/components/TutorialOverlay";

export default function Settings() {
  return (
    <MainLayout>
      <SettingsPage />
      <TutorialOverlay />
    </MainLayout>
  );
}
