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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 shadow-lg no-print">
      <div className="text-center">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center justify-center gap-2">
          <CVFormatIcon
            size={16}
            className="text-blue-600 dark:text-blue-400"
          />
          <span className="text-sm">Formato del CV</span>
        </h3>
        <div className="flex flex-col gap-2 mb-2">
          {/* Botón Formato Visual */}
          <button
            onClick={() => setCvFormat("visual")}
            className={`px-3 py-2 rounded-xl font-semibold transition-all duration-300 ${
              cvFormat === "visual"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-300"
                : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <VisualFormatIcon
                size={14}
                className={
                  cvFormat === "visual"
                    ? "text-white"
                    : "text-blue-600 dark:text-blue-400"
                }
              />
              <span className="text-sm">Formato Visual</span>
            </div>
            <div className="text-xs mt-1 opacity-80">
              Diseño atractivo con colores
            </div>
          </button>

          {/* Botón Formato ATS */}
          <button
            onClick={() => setCvFormat("ats")}
            className={`px-3 py-2 rounded-xl font-semibold transition-all duration-300 ${
              cvFormat === "ats"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25 ring-2 ring-green-300"
                : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-green-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <ATSFormatIcon
                size={14}
                className={
                  cvFormat === "ats"
                    ? "text-white"
                    : "text-green-600 dark:text-green-400"
                }
              />
              <span className="text-sm">Formato ATS</span>
            </div>
            <div className="text-xs mt-1 opacity-80">
              Optimizado para sistemas automáticos
            </div>
          </button>
        </div>

        {/* Estado del formato seleccionado - Compacto */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-xs text-gray-600 dark:text-gray-400">
          {cvFormat === "visual" ? (
            <div className="flex items-center gap-2">
              <VisualFormatIcon
                size={14}
                className="text-blue-600 dark:text-blue-400 flex-shrink-0"
              />
              <div>
                <strong className="text-blue-600 dark:text-blue-400">
                  ✅ Visual
                </strong>
                <span className="ml-1">- Diseño atractivo para humanos</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ATSFormatIcon
                size={14}
                className="text-green-600 dark:text-green-400 flex-shrink-0"
              />
              <div>
                <strong className="text-green-600 dark:text-green-400">
                  ✅ ATS
                </strong>
                <span className="ml-1">- Optimizado para sistemas</span>
              </div>
            </div>
          )}
        </div>

        {/* Indicador visual adicional */}
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div
            className={`w-2 h-2 rounded-full ${
              cvFormat === "visual" ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <span>Visual</span>
          <div className="w-6 h-px bg-gray-300 dark:bg-gray-600"></div>
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
