// src/app/preview/page.tsx - VERSIÓN PRISMA

import {
  getCurrentCV,
  initializeDefaultCV,
  getCurrentCVName,
} from "@/lib/actions/cv-actions";
import { CVPreviewPrisma } from "@/views/CVPreview/CVPreviewPrisma";
import { MainLayout } from "@/components/layout/MainLayout";
import { TutorialOverlay } from "@/components/TutorialOverlay";

// Forzar renderizado dinámico porque usa autenticación
export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  // Intentar obtener el CV actual
  let currentCV = await getCurrentCV();

  // Si no hay CV, inicializar con datos por defecto
  if (!currentCV) {
    console.log("No CV found, initializing default CV...");
    try {
      await initializeDefaultCV();
      currentCV = await getCurrentCV();
    } catch (error) {
      console.error("Error initializing CV:", error);
    }
  }

  // Si aún no hay CV, mostrar error
  if (!currentCV) {
    return (
      <MainLayout showSidebar={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              ⚠️ Base de Datos No Configurada
            </h2>
            <p className="text-gray-600 mb-4">
              Las tablas de Prisma no existen en PostgreSQL.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
              <p className="font-semibold text-yellow-800 mb-2">
                🔧 Ejecuta estos comandos:
              </p>
              <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm">
                npx prisma generate
                <br />
                npx prisma db push
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Después recarga la página
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Obtener el nombre del CV actual
  const currentCVNameResult = await getCurrentCVName();
  const currentCVName: string | undefined = currentCVNameResult ?? undefined;

  return (
    <MainLayout showSidebar={false}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
        <CVPreviewPrisma cvData={currentCV} currentCVName={currentCVName} />
      </div>
      <TutorialOverlay />
    </MainLayout>
  );
}
