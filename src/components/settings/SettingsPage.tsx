// src/components/settings/SettingsPage.tsx

"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Información de la aplicación y consejos de uso
        </p>
      </div>

      {/* App Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Información de la Aplicación
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
              href="https://github.com/ImaMultiDev/cv-gestor"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </Card>

      {/* Tips and Help */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Consejos de Uso
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
        </div>
      </Card>
    </div>
  );
};
