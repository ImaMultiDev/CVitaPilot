// src/components/dashboard/QuickActions.tsx

"use client";

import { useRouter } from "next/navigation";
import { useCV } from "@/contexts/CVContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cvUtils } from "@/utils/cvUtils";

export const QuickActions: React.FC = () => {
  const router = useRouter();
  const { state, saveCV } = useCV();

  const handleQuickSave = () => {
    const name = `CV ${new Date().toLocaleDateString()}`;
    saveCV(name);
    alert("CV guardado rápidamente");
  };

  const handleExportText = () => {
    const textVersion = cvUtils.generateTextVersion(state.currentCV);
    const blob = new Blob([textVersion], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `cv-${state.currentCV.personalInfo.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const validation = cvUtils.validateCV(state.currentCV);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Acciones Rápidas
      </h3>

      {/* CV Validation Status */}
      <div className="mb-6 p-3 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Estado del CV
          </span>
          <span
            className={`text-sm font-bold ${
              validation.completenessScore >= 80
                ? "text-green-600"
                : validation.completenessScore >= 60
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {validation.completenessScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              validation.completenessScore >= 80
                ? "bg-green-600"
                : validation.completenessScore >= 60
                ? "bg-orange-600"
                : "bg-red-600"
            }`}
            style={{ width: `${validation.completenessScore}%` }}
          />
        </div>
        {validation.issues.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 mb-1">Pendientes:</p>
            <ul className="text-xs text-red-600 space-y-1">
              {validation.issues.slice(0, 3).map((issue, index) => (
                <li key={index}>• {issue}</li>
              ))}
              {validation.issues.length > 3 && (
                <li>• +{validation.issues.length - 3} más...</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button onClick={() => router.push("/preview")} className="w-full">
          👁️ Ver Vista Previa
        </Button>

        <Button
          onClick={handleQuickSave}
          variant="secondary"
          className="w-full"
        >
          💾 Guardar CV Actual
        </Button>

        <Button
          onClick={() => router.push("/saved-cvs")}
          variant="secondary"
          className="w-full"
        >
          📄 Ver Mis CVs
        </Button>

        <Button onClick={handleExportText} variant="ghost" className="w-full">
          📝 Exportar como Texto
        </Button>
      </div>
    </Card>
  );
};
