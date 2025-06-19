// src/app/preview/page.tsx

import { MainLayout } from "@/components/layout/MainLayout";
import { CVPreviewPage } from "@/components/cv/CVPreviewPage";

export default function CVPreview() {
  return (
    <MainLayout>
      <CVPreviewPage />
    </MainLayout>
  );
}
