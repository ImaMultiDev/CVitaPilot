// src/app/preview/page.tsx

import { getCurrentCV, getCurrentCVName } from "@/lib/actions/cv-actions";
import { CVPreviewPrisma } from "@/views/CVPreview/CVPreviewPrisma";
import { MainLayout } from "@/components/layout/MainLayout";
import { getCurrentUser } from "@/auth";

// Forzar renderizado dinámico porque usa autenticación
export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  // Verificar que el usuario está autenticado
  const user = await getCurrentUser();

  if (!user) {
    return (
      <MainLayout showSidebar={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              🔐 Acceso Requerido
            </h2>
            <p className="text-gray-600 mb-4">
              Debes iniciar sesión para acceder a la vista previa.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Intentar obtener el CV actual
  const currentCV = await getCurrentCV();

  // Si no hay CV, mostrar error
  if (!currentCV) {
    return (
      <MainLayout showSidebar={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              ⚠️ No hay CV disponible
            </h2>
            <p className="text-gray-600 mb-4">
              Primero debes crear un CV en el editor.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Obtener el nombre del CV actual
  const currentCVName = await getCurrentCVName();

  return (
    <MainLayout showSidebar={false}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
        <CVPreviewPrisma
          cvData={currentCV}
          currentCVName={currentCVName ?? undefined}
        />
      </div>
    </MainLayout>
  );
}
