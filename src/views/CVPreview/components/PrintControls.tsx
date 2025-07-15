import React from "react";
import { Button } from "../../../components/ui";
import { PrintIcon } from "./CVPreviewIcons";
import { pdfUtils } from "../../../utils/pdfUtils";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { usePDFOptimization } from "../../../hooks/usePDFOptimization";
import { CVData } from "@/types/cv";

interface PrintControlsProps {
  cvData?: CVData;
  currentFormat?: string;
}

export const PrintControls: React.FC<PrintControlsProps> = ({
  cvData,
  currentFormat = "visual",
}) => {
  const { withPDFOptimization } = usePDFOptimization();

  const handleExportPDF = async () => {
    try {
      if (cvData) {
        // Usar exportación inteligente
        await pdfUtils.exportCVIntelligent(cvData, currentFormat);
      } else {
        // Fallback a exportación simple
        await withPDFOptimization("cv-container", async () => {
          await pdfUtils.exportToPDF("cv-container", {
            filename: `CV_${currentFormat}.pdf`,
            quality: 1.0,
            orientation: "portrait",
          });
        });
      }
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 no-print">
      <div className="text-center">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 flex items-center justify-center gap-2">
          <PrintIcon className="text-gray-700 dark:text-gray-300" />
          <span className="text-sm sm:text-base">Exportar PDF</span>
        </h4>

        {/* Botón principal - Exportar PDF */}
        <div className="mb-4">
          <Button
            onClick={handleExportPDF}
            variant="primary"
            size="md"
            className="flex items-center gap-2 hover:bg-blue-600 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 font-medium w-full"
          >
            <span>Exportar CV como PDF</span>
          </Button>
        </div>

        {/* Información del formato actual */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
            <ConfiguredIcon name="info" className="w-4 h-4" />
            Información de Exportación
          </h5>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p>
              • <strong>Formato actual:</strong> {currentFormat.toUpperCase()}
            </p>
            <p>
              • <strong>Calidad:</strong> Alta resolución optimizada
            </p>
            <p>
              • <strong>Páginas:</strong> Automático (1-2 páginas según
              contenido)
            </p>
            <p>
              • <strong>Formato:</strong> A4 estándar profesional
            </p>
          </div>
        </div>

        {/* Consejos adicionales */}
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <h5 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
            <ConfiguredIcon name="lightbulb" className="w-4 h-4" />
            Consejos
          </h5>
          <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <p>
              • El PDF se optimiza automáticamente para el formato seleccionado
            </p>
            <p>• Se incluyen todas las secciones activas del CV</p>
            <p>• Compatible con sistemas ATS y presentaciones profesionales</p>
          </div>
        </div>
      </div>
    </div>
  );
};
