// src/app/saved-cvs/page.tsx - VERSIÓN SIMPLIFICADA CON PRISMA

import { MainLayout } from "@/components/layout/MainLayout";
import { SavedCVsPage } from "@/components/saved/SavedCVsPage";

export default function SavedCVsPageRoute() {
  return (
    <MainLayout>
      <SavedCVsPage />
    </MainLayout>
  );
}
