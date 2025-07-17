// src/app/saved-cvs/page.tsx - VERSIÓN SIMPLIFICADA CON PRISMA

import { MainLayout } from "@/components/layout/MainLayout";
import { MyCVsPage } from "@/views/MyCVs";

// Forzar renderizado dinámico porque usa funciones de autenticación
export const dynamic = "force-dynamic";

export default function SavedCVs() {
  return (
    <MainLayout>
      <MyCVsPage />
    </MainLayout>
  );
}
