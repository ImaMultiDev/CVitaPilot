// src/components/cv/CVPreviewPage.tsx

"use client";

import { Button } from "@/components/ui/Button";
import { CVPreview } from "./CVPreview";
import { useCV } from "@/contexts/CVContext";

export const CVPreviewPage: React.FC = () => {
  const { state, saveCV } = useCV();

  const handleSaveCV = () => {
    const name = prompt("Nombre para este CV:");
    if (name) {
      saveCV(name);
      alert("CV guardado correctamente");
    }
  };

  const handleExportPDF = () => {
    // Esta funcionalidad se implementará más adelante
    alert("Funcionalidad de exportar PDF próximamente");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Vista Previa del CV
            </h1>
            <p className="text-gray-600">
              Revisa tu curriculum antes de guardarlo o exportarlo
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleExportPDF}>
              📄 Exportar PDF
            </Button>
            <Button onClick={handleSaveCV}>💾 Guardar CV</Button>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="py-8">
        <CVPreview />
      </div>
    </div>
  );
};
