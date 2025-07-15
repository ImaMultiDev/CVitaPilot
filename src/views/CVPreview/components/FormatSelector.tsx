import React from "react";
import { VisualFormatIcon, ATSFormatIcon } from "./CVPreviewIcons";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { CVFormat } from "@/types/cv";

interface FormatSelectorProps {
  cvFormat: CVFormat;
  setCvFormat: (format: CVFormat) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  cvFormat,
  setCvFormat,
}) => {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center justify-center gap-2">
          <VisualFormatIcon className="text-blue-600 dark:text-blue-400" />
          <span>Selecciona el Formato</span>
        </h4>
      </div>

      {/* Botones de formato */}
      <div className="grid grid-cols-3 gap-3">
        {/* Formato Visual */}
        <button
          onClick={() => setCvFormat("visual")}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            cvFormat === "visual"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-600"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <VisualFormatIcon className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium">Visual</span>
          </div>
        </button>

        {/* Formato ATS */}
        <button
          onClick={() => setCvFormat("ats")}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            cvFormat === "ats"
              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-green-300 dark:hover:border-green-600"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <ATSFormatIcon className="text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium">ATS</span>
          </div>
        </button>

        {/* Formato Europass */}
        <button
          onClick={() => setCvFormat("europass")}
          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
            cvFormat === "europass"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-500"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <ConfiguredIcon
              name="globe"
              className="text-blue-600 dark:text-blue-400"
            />
            <span className="text-xs font-medium">Europass</span>
          </div>
        </button>
      </div>

      {/* Información del formato seleccionado */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-xs text-gray-600 dark:text-gray-400">
        {cvFormat === "visual" ? (
          <div className="flex items-center gap-2">
            <VisualFormatIcon className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <strong className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <ConfiguredIcon name="check" className="w-3 h-3" />
                Visual
              </strong>
              <span className="ml-1">- Diseño atractivo para humanos</span>
            </div>
          </div>
        ) : cvFormat === "europass" ? (
          <div className="flex items-center gap-2">
            <ConfiguredIcon
              name="globe"
              className="text-blue-600 dark:text-blue-400 flex-shrink-0"
            />
            <div>
              <strong className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <ConfiguredIcon name="check" className="w-3 h-3" />
                Europass
              </strong>
              <span className="ml-1">- Formato europeo estándar</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ATSFormatIcon className="text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <strong className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <ConfiguredIcon name="check" className="w-3 h-3" />
                ATS
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
        <span>Europass</span>
        <div
          className={`w-2 h-2 rounded-full ${
            cvFormat === "europass" ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>
        <div className="w-6 h-px bg-gray-300 dark:bg-gray-600"></div>
        <span>ATS</span>
        <div
          className={`w-2 h-2 rounded-full ${
            cvFormat === "ats" ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );
};
