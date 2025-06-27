import React from "react";
import {
  VisualFormatIcon,
  ATSFormatIcon,
  CVFormatIcon,
} from "./CVPreviewIcons";

type CVFormat = "visual" | "ats";

interface FormatSelectorProps {
  cvFormat: CVFormat;
  setCvFormat: (format: CVFormat) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  cvFormat,
  setCvFormat,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-lg no-print">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
          <CVFormatIcon
            size={20}
            className="text-blue-600 dark:text-blue-400"
          />
          <span className="text-sm sm:text-base">Formato del CV</span>
        </h3>
        <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Botón Formato Visual */}
          <button
            onClick={() => setCvFormat("visual")}
            className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              cvFormat === "visual"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-300"
                : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <VisualFormatIcon
                size={18}
                className={
                  cvFormat === "visual"
                    ? "text-white"
                    : "text-blue-600 dark:text-blue-400"
                }
              />
              <span className="text-sm sm:text-base">Formato Visual</span>
            </div>
            <div className="text-xs sm:text-sm mt-1 opacity-80">
              Diseño atractivo con colores
            </div>
          </button>

          {/* Botón Formato ATS */}
          <button
            onClick={() => setCvFormat("ats")}
            className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              cvFormat === "ats"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25 ring-2 ring-green-300"
                : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-green-300"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <ATSFormatIcon
                size={18}
                className={
                  cvFormat === "ats"
                    ? "text-white"
                    : "text-green-600 dark:text-green-400"
                }
              />
              <span className="text-sm sm:text-base">Formato ATS</span>
            </div>
            <div className="text-xs sm:text-sm mt-1 opacity-80">
              Optimizado para sistemas automáticos
            </div>
          </button>
        </div>

        {/* Descripción del formato seleccionado */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {cvFormat === "visual" ? (
            <div className="flex items-start gap-2 sm:gap-3">
              <VisualFormatIcon
                size={16}
                className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
              />
              <div className="text-left">
                <strong className="text-blue-600 dark:text-blue-400 block mb-1 text-xs sm:text-sm">
                  Formato Visual Seleccionado
                </strong>
                <span className="text-xs sm:text-sm">
                  Diseño moderno con colores y estilos atractivos, perfecto para
                  impresionar a reclutadores humanos. Incluye diseño de dos
                  columnas con sidebar colorido y elementos visuales llamativos.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 sm:gap-3">
              <ATSFormatIcon
                size={16}
                className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
              />
              <div className="text-left">
                <strong className="text-green-600 dark:text-green-400 block mb-1 text-xs sm:text-sm">
                  Formato ATS Seleccionado
                </strong>
                <span className="text-xs sm:text-sm">
                  Diseño simple y estructurado que garantiza que los sistemas
                  automáticos (ATS) lean correctamente toda tu información. Sin
                  colores ni elementos complejos que puedan confundir a las
                  máquinas.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Indicador visual adicional */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div
            className={`w-2 h-2 rounded-full ${
              cvFormat === "visual" ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <span>Visual</span>
          <div className="w-6 sm:w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span>ATS</span>
          <div
            className={`w-2 h-2 rounded-full ${
              cvFormat === "ats" ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
