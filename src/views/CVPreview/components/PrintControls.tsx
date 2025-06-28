import React from "react";
import { Button } from "../../../components/ui";
import { PrintIcon } from "./CVPreviewIcons";
import { printCVPage, printAllCVPages } from "../../../utils/printUtils";

export const PrintControls: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 no-print">
      <div className="text-center">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 flex items-center justify-center gap-2">
          <PrintIcon size={18} className="text-gray-700 dark:text-gray-300" />
          <span className="text-sm sm:text-base">Opciones de Impresión</span>
        </h4>

        {/* Botón principal - Imprimir CV completo */}
        <div className="mb-3">
          <Button
            onClick={() => printAllCVPages()}
            variant="primary"
            size="md"
            className="flex items-center gap-2 hover:bg-blue-600 text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 font-medium"
          >
            <PrintIcon size={16} className="text-white" />
            <span>Imprimir CV Completo</span>
          </Button>
        </div>

        {/* Botones individuales */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
          <Button
            onClick={() => printCVPage("cv-page-1", "Página 1")}
            variant="secondary"
            size="md"
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
          >
            <PrintIcon size={14} className="text-blue-600" />
            <span>Solo Página 1</span>
          </Button>
          <Button
            onClick={() => printCVPage("cv-page-2", "Página 2")}
            variant="secondary"
            size="md"
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
          >
            <PrintIcon size={14} className="text-blue-600" />
            <span>Solo Página 2</span>
          </Button>
        </div>

        <div className="mt-3 sm:mt-4 space-y-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>
              ✅ <strong>Optimizado para DIN A4:</strong> Impresión perfecta sin
              elementos de interfaz
            </p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-2">
            <p>
              💡 <strong>Recomendado:</strong> Usa &quot;CV Completo&quot; para
              obtener ambas páginas en una sola impresión
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
