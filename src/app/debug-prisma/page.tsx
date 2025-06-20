import {
  getCurrentCV,
  cleanupDuplicateCVs,
  getSavedCVs,
} from "@/lib/actions/cv-actions";
import { MainLayout } from "@/components/layout/MainLayout";
import { DebugPrismaClient } from "@/components/debug/DebugPrismaClient";

export default async function DebugPrismaPage() {
  const currentCV = await getCurrentCV();
  const savedCVs = await getSavedCVs();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          🔧 Debug Prisma - CV Manager
        </h1>

        <DebugPrismaClient currentCV={currentCV} savedCVs={savedCVs} />
      </div>
    </MainLayout>
  );
}
