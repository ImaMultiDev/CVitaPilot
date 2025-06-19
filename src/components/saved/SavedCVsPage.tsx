// src/components/saved/SavedCVsPage.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getSavedCVs, loadCV, deleteSavedCV } from "@/lib/actions/cv-actions";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

export const SavedCVsPage: React.FC = () => {
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedCVs();
  }, []);

  const loadSavedCVs = async () => {
    try {
      setIsLoading(true);
      const cvs = await getSavedCVs();
      setSavedCVs(cvs);
    } catch (error) {
      console.error("Error loading saved CVs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadCV = async (cvId: string, cvName: string) => {
    if (confirm(`¿Cargar '${cvName}' como CV activo?`)) {
      try {
        await loadCV(cvId);
        alert("✅ CV cargado exitosamente. Ve al editor para verlo.");
        loadSavedCVs();
      } catch (error) {
        console.error("Error loading CV:", error);
        alert("❌ Error al cargar el CV");
      }
    }
  };

  const handleDeleteCV = async (cvId: string, cvName: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar '${cvName}'?`)) {
      try {
        await deleteSavedCV(cvId);
        alert("✅ CV eliminado exitosamente");
        loadSavedCVs();
      } catch (error) {
        console.error("Error deleting CV:", error);
        alert("❌ Error al eliminar el CV");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-gray-600">Cargando CVs guardados...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis CVs Guardados
          </h1>
          <p className="text-gray-600">
            Gestiona y selecciona tus curriculums guardados
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-lg">{savedCVs.length}</span> CVs
            guardados
          </div>
          <div className="text-xs text-gray-500">
            Versiones respaldadas en PostgreSQL
          </div>
        </div>
      </div>

      {savedCVs.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes CVs guardados
          </h3>
          <p className="text-gray-600 mb-6">
            Comienza creando y guardando tu primer CV desde el editor
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            🛠️ Ir al Editor
          </Button>
        </Card>
      ) : (
        <>
          {/* CV Activo Destacado */}
          {savedCVs.find((cv) => cv.isActive) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">⭐</span>
                CV Activo Actualmente
              </h2>
              {savedCVs
                .filter((cv) => cv.isActive)
                .map((activeCV) => (
                  <Card
                    key={activeCV.id}
                    className="bg-green-50 border-green-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">
                          {activeCV.name}
                        </h3>
                        <p className="text-sm text-green-600">
                          Este CV se está usando actualmente en el editor
                        </p>
                        <div className="text-xs text-green-500 mt-1">
                          📅 Creado:{" "}
                          {new Date(activeCV.createdAt).toLocaleDateString()}
                          {" • "}
                          ✏️ Actualizado:{" "}
                          {new Date(activeCV.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="success">ACTIVO</Badge>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => (window.location.href = "/")}
                        >
                          🛠️ Ir al Editor
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}

          {/* Lista de CVs Guardados */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">💾</span>
              Versiones Guardadas (
              {savedCVs.filter((cv) => !cv.isActive).length})
            </h2>

            {savedCVs.filter((cv) => !cv.isActive).length === 0 ? (
              <Card className="text-center py-8 bg-gray-50">
                <div className="text-gray-500">
                  No hay versiones adicionales guardadas
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Guarda nuevas versiones desde el editor usando "Guardar CV
                  como nueva versión"
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {savedCVs
                  .filter((cv) => !cv.isActive)
                  .sort(
                    (a, b) =>
                      new Date(b.updatedAt).getTime() -
                      new Date(a.updatedAt).getTime()
                  )
                  .map((savedCV) => (
                    <Card
                      key={savedCV.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {savedCV.name}
                          </h3>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                📅{" "}
                                {new Date(
                                  savedCV.createdAt
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                ✏️{" "}
                                {new Date(
                                  savedCV.updatedAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {savedCV.deliveryCount > 0 && (
                              <div className="flex items-center">
                                <span className="text-blue-600">
                                  📤 {savedCV.deliveryCount} entregas
                                  registradas
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-3">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              handleLoadCV(savedCV.id, savedCV.name)
                            }
                            className="text-xs"
                          >
                            ⭐ Activar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleDeleteCV(savedCV.id, savedCV.name)
                            }
                            className="text-xs"
                          >
                            🗑️ Eliminar
                          </Button>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          Guardado hace{" "}
                          {Math.floor(
                            (Date.now() -
                              new Date(savedCV.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          días
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 text-xl">💡</div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  ¿Cómo funciona?
                </h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>
                    • <strong>Activar:</strong> Carga el CV seleccionado como
                    activo para editar
                  </div>
                  <div>
                    • <strong>Eliminar:</strong> Borra permanentemente la
                    versión guardada
                  </div>
                  <div>
                    • <strong>Guardar nuevas versiones:</strong> Usa el botón en
                    el editor para crear copias
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
