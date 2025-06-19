// src/app/saved-cvs/page.tsx

import { MainLayout } from "@/components/layout/MainLayout";
import { SavedCVsPage } from "@/components/saved";
import { CVAnalytics } from "@/components/analytics/CVAnalytics";

export default function SavedCVs() {
  return (
    <MainLayout>
      <div className="p-6">
        <CVAnalytics />
        <SavedCVsPage />
      </div>
    </MainLayout>
  );
}
