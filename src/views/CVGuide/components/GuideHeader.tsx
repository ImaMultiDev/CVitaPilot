import React from "react";
import { GuideIcon } from "@/components/ui/icons/CVGuideIcons";

export const GuideHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 px-2 sm:px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl mb-4 sm:mb-6">
        <GuideIcon
          size={32}
          className="text-blue-600 dark:text-blue-400 sm:w-10 sm:h-10"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight px-2">
        Guía Completa del CV Perfecto
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6">
        Todo lo que necesitas saber para crear un CV que destaque, superar los
        sistemas ATS, escribir cartas de presentación efectivas y dominar tu
        búsqueda de empleo.
      </p>

      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Actualizado 2024-2025</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="hidden sm:inline">
            Basado en investigación profesional
          </span>
          <span className="sm:hidden">Investigación profesional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Métodos comprobados</span>
        </div>
      </div>
    </div>
  );
};
