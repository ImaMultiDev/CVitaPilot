import React from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <ConfiguredIcon
              name="loader"
              size={48}
              className="text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-spin"
            />
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              Cargando CVs guardados...
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Obteniendo tus curriculums desde la base de datos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
