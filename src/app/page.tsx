// src/app/page.tsx

import {
  getCurrentCV,
  initializeDefaultCV,
  getCurrentCVName,
} from "@/lib/actions/cv-actions";
import { CVEditorPrisma } from "@/views/CVEditor/CVEditorPrisma";
import { MainLayout } from "@/components/layout/MainLayout";

export default async function HomePage() {
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

  // Si aún no hay CV, mostrar error con instrucciones
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
  const currentCVName = await getCurrentCVName();

  return (
    <MainLayout showSidebar={true} cvData={currentCV}>
      <CVEditorPrisma initialData={currentCV} currentCVName={currentCVName} />
    </MainLayout>
  );
}
