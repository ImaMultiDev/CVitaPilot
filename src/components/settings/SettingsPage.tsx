// src/components/settings/SettingsPage.tsx

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  cleanupDuplicateCVs,
  forceRevalidation,
} from "@/lib/actions/cv-actions";
import { useRouter } from "next/navigation";

export const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCleanupDuplicates = async () => {
    if (
      !confirm(
        "¿Estás seguro de que quieres limpiar los CVs duplicados? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await cleanupDuplicateCVs();
      if (result.success) {
        alert(result.message || "CVs duplicados limpiados exitosamente");
        await forceRevalidation();
        router.refresh();
      } else {
        alert("Error al limpiar CVs duplicados: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error inesperado al limpiar CVs duplicados");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceRevalidation = async () => {
    setIsLoading(true);
    try {
      await forceRevalidation();
      router.refresh();
      alert(
        "Cache actualizada exitosamente. Los cambios deberían reflejarse ahora."
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar cache");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Información de la aplicación y herramientas de administración
        </p>
      </div>

      {/* Utilidades de Administración */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🛠️ Utilidades de Administración
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Herramientas para resolver problemas comunes en producción
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Actualizar Vista Previa
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Si los cambios en los toggles no se reflejan en la vista previa
              </p>
            </div>
            <Button
              onClick={handleForceRevalidation}
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? "Actualizando..." : "🔄 Actualizar Cache"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Limpiar CVs Duplicados
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Elimina CVs duplicados manteniendo solo la versión más reciente
              </p>
            </div>
            <Button
              onClick={handleCleanupDuplicates}
              disabled={isLoading}
              variant="secondary"
              size="sm"
            >
              {isLoading ? "Limpiando..." : "🧹 Limpiar Duplicados"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Recargar Página Completa
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fuerza una recarga completa de la página (último recurso)
              </p>
            </div>
            <Button
              onClick={handleRefreshPage}
              disabled={isLoading}
              variant="secondary"
              size="sm"
            >
              🔄 Recargar Página
            </Button>
          </div>
        </div>
      </Card>

      {/* App Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📱 Información de la Aplicación
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Versión</span>
            <Badge variant="info">1.0.0</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              Tecnologías
            </span>
            <div className="flex space-x-2">
              <Badge variant="default" size="sm">
                Next.js 15
              </Badge>
              <Badge variant="default" size="sm">
                React 19
              </Badge>
              <Badge variant="default" size="sm">
                Tailwind v4
              </Badge>
              <Badge variant="default" size="sm">
                TypeScript
              </Badge>
              <Badge variant="default" size="sm">
                Prisma
              </Badge>
              <Badge variant="default" size="sm">
                PostgreSQL
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              Desarrollador
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              Imanol Mugueta Unsain
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              Repositorio
            </span>
            <a
              href="https://github.com/ImaMultiDev/CVitaPilot"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Dominio</span>
            <a
              href="https://cvitapilot.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              cvitapilot.com
            </a>
          </div>
        </div>
      </Card>

      {/* Tips and Help */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Consejos de Uso
        </h3>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400">💡</span>
            <span>
              Usa el sidebar para activar/desactivar rápidamente habilidades y
              experiencias según el puesto al que apliques.
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400">💡</span>
            <span>
              Guarda diferentes versiones de tu CV para distintos tipos de
              empresa (startup, corporativa, freelance, etc.).
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 dark:text-orange-400">💡</span>
            <span>
              Usa las tecnologías específicas en cada experiencia para mostrar
              tu stack técnico por proyecto.
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600 dark:text-purple-400">💡</span>
            <span>
              Si los cambios no se reflejan inmediatamente, usa las utilidades
              de administración para actualizar la cache.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
