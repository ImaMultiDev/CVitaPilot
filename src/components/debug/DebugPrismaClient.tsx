"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cleanupDuplicateCVs } from "@/lib/actions/cv-actions";
import { CVData } from "@/types/cv";

interface SavedCVInfo {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

interface DebugPrismaClientProps {
  currentCV: CVData | null;
  savedCVs: SavedCVInfo[];
}

export const DebugPrismaClient: React.FC<DebugPrismaClientProps> = ({
  currentCV,
  savedCVs,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCleanupDuplicates = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = await cleanupDuplicateCVs();
      if (result.success) {
        setMessage(`✅ ${result.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Estado Actual */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">📊 Estado Actual</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">CV Activo:</h3>
            {currentCV ? (
              <div className="text-sm space-y-1">
                <p>
                  <strong>Nombre:</strong> {currentCV.personalInfo.name}
                </p>
                <p>
                  <strong>Posición:</strong> {currentCV.personalInfo.position}
                </p>
                <p>
                  <strong>Skills:</strong> {currentCV.skills.length}
                </p>
                <p>
                  <strong>Experiencias:</strong> {currentCV.experiences.length}
                </p>
                <p>
                  <strong>Educación:</strong> {currentCV.education.length}
                </p>
                <p>
                  <strong>Competencias:</strong> {currentCV.competences.length}
                </p>
              </div>
            ) : (
              <p className="text-red-600">❌ No hay CV activo</p>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">CVs Guardados:</h3>
            <p className="text-lg font-bold">{savedCVs.length} CVs</p>
            {savedCVs.length > 0 && (
              <div className="text-sm space-y-1 mt-2">
                {savedCVs.map((cv) => (
                  <div key={cv.id} className="flex justify-between">
                    <span>{cv.name}</span>
                    <span
                      className={
                        cv.isActive ? "text-green-600" : "text-gray-500"
                      }
                    >
                      {cv.isActive ? "ACTIVO" : "Guardado"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Herramientas de Limpieza */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          🧹 Herramientas de Limpieza
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Limpiar CVs Duplicados</h3>
            <p className="text-sm text-gray-600 mb-3">
              Elimina CVs duplicados con el mismo nombre, manteniendo el más
              reciente.
            </p>
            <Button
              onClick={handleCleanupDuplicates}
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? "🔄 Limpiando..." : "🧹 Limpiar Duplicados"}
            </Button>
          </div>

          {message && (
            <div
              className={`p-3 rounded ${
                message.includes("✅")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </Card>

      {/* Información de Debug */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">🔍 Información de Debug</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Experiencias Seleccionadas:</h3>
            {currentCV &&
            currentCV.experiences.filter((exp) => exp.selected).length > 0 ? (
              <div className="space-y-2">
                {currentCV.experiences
                  .filter((exp) => exp.selected)
                  .map((exp) => (
                    <div
                      key={exp.id}
                      className="text-sm border-l-4 border-blue-200 pl-3"
                    >
                      <p>
                        <strong>{exp.position}</strong> en {exp.company}
                      </p>
                      <p className="text-gray-600">
                        {exp.contractType} • {exp.workSchedule} •{" "}
                        {exp.workModality}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay experiencias seleccionadas</p>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Educación Seleccionada:</h3>
            {currentCV &&
            currentCV.education.filter((edu) => edu.selected).length > 0 ? (
              <div className="space-y-2">
                {currentCV.education
                  .filter((edu) => edu.selected)
                  .map((edu) => (
                    <div
                      key={edu.id}
                      className="text-sm border-l-4 border-green-200 pl-3"
                    >
                      <p>
                        <strong>{edu.title}</strong>
                      </p>
                      <p className="text-gray-600">
                        {edu.institution} ({edu.startYear} - {edu.endYear})
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay educación seleccionada</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
