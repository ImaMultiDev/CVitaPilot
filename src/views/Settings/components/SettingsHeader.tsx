import React from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const SettingsHeader: React.FC = () => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800 rounded-2xl mb-4 sm:mb-6">
        <ConfiguredIcon
          name="settings"
          size={32}
          className="text-gray-600 dark:text-gray-400 sm:w-10 sm:h-10"
        />
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight px-4">
        Configuración
      </h1>

      <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
        Gestiona tu perfil, preferencias de cuenta y configuración de privacidad
        para una experiencia personalizada en CVitaPilot.
      </p>

      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Configuración instantánea</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Datos seguros</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Sincronización automática</span>
        </div>
      </div>
    </div>
  );
};
