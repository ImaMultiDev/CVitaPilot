// src/app/page.tsx

import { getCurrentUser } from "@/auth";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/views/Home";

// Forzar renderizado dinámico porque usa autenticación
export const dynamic = "force-dynamic";

export default async function Page() {
  // Verificar que el usuario está autenticado
  const user = await getCurrentUser();

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return (
      <MainLayout showSidebar={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              🔐 Acceso Requerido
            </h2>
            <p className="text-gray-600 mb-4">
              Debes iniciar sesión para acceder a CVitaPilot.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-blue-800 mb-2">
                👋 ¡Bienvenido a CVitaPilot!
              </p>
              <p className="text-blue-700 text-sm">
                Inicia sesión para crear tu CV profesional optimizado para ATS.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showSidebar={true}>
      <HomePage />
    </MainLayout>
  );
}
