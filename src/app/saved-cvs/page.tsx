// src/app/saved-cvs/page.tsx - VERSIÓN SIMPLIFICADA CON PRISMA

import { MainLayout } from "@/components/layout/MainLayout";
import { MyCVsPage } from "@/views/MyCVs";
import { TutorialOverlay } from "@/components/TutorialOverlay";

// Forzar renderizado dinámico porque usa funciones de autenticación
export const dynamic = "force-dynamic";

export default function MyCVsPageRoute() {
  return (
    <MainLayout>
      <MyCVsPage />
      <TutorialOverlay />
    </MainLayout>
  );
}
