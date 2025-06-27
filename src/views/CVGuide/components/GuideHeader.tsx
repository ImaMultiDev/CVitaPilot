import React from "react";
import { GuideIcon } from "@/components/ui/icons/CVGuideIcons";

export const GuideHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl mb-6">
        <GuideIcon size={40} className="text-blue-600 dark:text-blue-400" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        Guía Completa del CV Perfecto
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Todo lo que necesitas saber para crear un CV que destaque, superar los
        sistemas ATS, escribir cartas de presentación efectivas y dominar tu
        búsqueda de empleo.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Actualizado 2024-2025</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Basado en investigación profesional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Métodos comprobados</span>
        </div>
      </div>
    </div>
  );
};
