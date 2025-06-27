import React from "react";
import { Button } from "../../../components/ui";
import { PrintIcon } from "./CVPreviewIcons";

interface PrintControlsProps {
  handlePrintPage: (pageId: string, pageName: string) => void;
}

export const PrintControls: React.FC<PrintControlsProps> = ({
  handlePrintPage,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 no-print">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center justify-center gap-2">
          <PrintIcon size={20} className="text-gray-700 dark:text-gray-300" />
          Opciones de Impresión
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => handlePrintPage("cv-page-1", "Página 1")}
            variant="secondary"
            size="md"
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
          >
            <PrintIcon size={16} className="text-blue-600" />
            <span>Imprimir Página 1</span>
          </Button>
          <Button
            onClick={() => handlePrintPage("cv-page-2", "Página 2")}
            variant="secondary"
            size="md"
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
          >
            <PrintIcon size={16} className="text-blue-600" />
            <span>Imprimir Página 2</span>
          </Button>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <p>
            💡 Tip: Usa &quot;Imprimir Página 1&quot; para el CV principal o
            &quot;Página 2&quot; para información adicional
          </p>
        </div>
      </div>
    </div>
  );
};
