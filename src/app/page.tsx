// src/app/page.tsx

import { CVEditor } from "@/components/editor/CVEditor";
import { MainLayout } from "@/components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout showSidebar={true}>
      <CVEditor />
    </MainLayout>
  );
}
