// src/app/saved-cvs/page.tsx - VERSIÓN SIMPLIFICADA CON PRISMA

import { MainLayout } from "@/components/layout/MainLayout";
import { MyCVsPage } from "@/views/MyCVs";

export default function MyCVsPageRoute() {
  return (
    <MainLayout>
      <MyCVsPage />
    </MainLayout>
  );
}
