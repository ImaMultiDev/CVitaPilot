"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MyCVsIcons } from "@/components/ui";
import { getSavedCVs, loadCV, deleteSavedCV } from "@/lib/actions/cv-actions";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

export const MyCVsPage: React.FC = () => {
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        router.push("/editor");
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysAgo = (dateString: string) => {
    const days = Math.floor(
      (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    return `Hace ${days} días`;
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <MyCVsIcons.LoadingDocsIcon
                size={48}
                className="text-blue-600 dark:text-blue-400 mx-auto mb-4"
              />
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                Cargando CVs guardados...
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Obteniendo tus curriculums desde la base de datos
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Mis CVs Guardados
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Gestiona y selecciona tus curriculums guardados
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Estadísticas */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 dark:border-gray-700/20 shadow-lg">
              <div className="flex items-center gap-3">
                <MyCVsIcons.CountIcon
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {savedCVs.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    CVs guardados
                  </div>
                </div>
              </div>
            </div>

            {/* Botón crear nuevo */}
            <Button
              onClick={() => router.push("/editor")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <MyCVsIcons.EditCVIcon size={20} />
                Crear Nuevo CV
              </span>
            </Button>
          </div>
        </div>

        {/* Estado vacío */}
        {savedCVs.length === 0 ? (
          <Card className="text-center py-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <MyCVsIcons.EmptyStateIcon
              size={64}
              className="text-gray-400 dark:text-gray-500 mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No tienes CVs guardados
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Comienza creando y guardando tu primer CV desde el editor para
              gestionar múltiples versiones
            </p>
            <Button
              onClick={() => router.push("/editor")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <MyCVsIcons.EditCVIcon size={20} />
                Ir al Editor
              </span>
            </Button>
          </Card>
        ) : (
          <>
            {/* CV Activo Destacado */}
            {savedCVs.find((cv) => cv.isActive) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <MyCVsIcons.ActiveCVIcon
                    size={24}
                    className="text-yellow-600 dark:text-yellow-400"
                  />
                  CV Activo Actualmente
                </h2>

                {savedCVs
                  .filter((cv) => cv.isActive)
                  .map((activeCV) => (
                    <Card
                      key={activeCV.id}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div className="flex items-start gap-4">
                          {/* CV Preview Miniature */}
                          <div className="hidden sm:block w-16 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-lg border-2 border-green-300 dark:border-green-600 shadow-md flex-shrink-0 relative overflow-hidden">
                            <div className="p-2 space-y-1">
                              <div className="h-1 bg-green-600 dark:bg-green-300 rounded w-3/4"></div>
                              <div className="h-0.5 bg-green-500 dark:bg-green-400 rounded w-1/2"></div>
                              <div className="h-0.5 bg-green-500 dark:bg-green-400 rounded w-2/3"></div>
                              <div className="mt-2 space-y-0.5">
                                <div className="h-0.5 bg-green-400 dark:bg-green-500 rounded"></div>
                                <div className="h-0.5 bg-green-400 dark:bg-green-500 rounded w-4/5"></div>
                                <div className="h-0.5 bg-green-400 dark:bg-green-500 rounded w-3/5"></div>
                              </div>
                            </div>

                            {/* Active indicator */}
                            <div className="absolute top-1 right-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-1">
                              {activeCV.name}
                            </h3>
                            <p className="text-green-700 dark:text-green-400 mb-2">
                              Este CV se está usando actualmente en el editor
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-green-600 dark:text-green-400">
                              <span className="flex items-center gap-1">
                                <MyCVsIcons.CalendarIcon size={16} />
                                Creado: {formatDate(activeCV.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MyCVsIcons.EditCVIcon size={16} />
                                Actualizado: {formatDate(activeCV.updatedAt)}
                              </span>
                              {activeCV.deliveryCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <MyCVsIcons.DeliveryIcon size={16} />
                                  {activeCV.deliveryCount} entregas
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <Badge variant="success" className="shadow-md">
                            ACTIVO
                          </Badge>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => router.push("/editor")}
                            className="shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            <span className="flex items-center gap-2">
                              <MyCVsIcons.EditCVIcon size={16} />
                              Ir al Editor
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}

            {/* Lista de CVs Guardados */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <MyCVsIcons.SavedCVIcon
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
                Versiones Guardadas (
                {savedCVs.filter((cv) => !cv.isActive).length})
              </h2>

              {savedCVs.filter((cv) => !cv.isActive).length === 0 ? (
                <Card className="text-center py-12 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200/20 dark:border-gray-700/20">
                  <MyCVsIcons.SavedCVIcon
                    size={48}
                    className="text-gray-400 dark:text-gray-500 mx-auto mb-4"
                  />
                  <div className="text-gray-600 dark:text-gray-400 mb-2">
                    No hay versiones adicionales guardadas
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    Guarda nuevas versiones desde el editor usando
                    &ldquo;Guardar CV&rdquo;
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 overflow-hidden"
                      >
                        {/* CV Preview Miniature */}
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 mb-4 relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                          <div className="p-4 space-y-2">
                            <div className="h-2 bg-gray-400 dark:bg-gray-500 rounded w-3/4"></div>
                            <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                            <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                            <div className="mt-4 space-y-1">
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                            </div>
                            <div className="mt-4 space-y-1">
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                            </div>
                          </div>

                          {/* Overlay con botones */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLoadCV(savedCV.id, savedCV.name);
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                              >
                                <span className="flex items-center gap-1">
                                  <MyCVsIcons.ActiveCVIcon size={14} />
                                  Activar
                                </span>
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCV(savedCV.id, savedCV.name);
                                }}
                                className="shadow-lg"
                              >
                                <span className="flex items-center gap-1">
                                  <MyCVsIcons.DeleteCVIcon size={14} />
                                  Eliminar
                                </span>
                              </Button>
                            </div>
                          </div>

                          {/* Delivery count badge */}
                          {savedCV.deliveryCount > 0 && (
                            <div className="absolute top-2 right-2">
                              <Badge
                                variant="info"
                                className="text-xs flex items-center gap-1"
                              >
                                <MyCVsIcons.DeliveryIcon size={12} />
                                {savedCV.deliveryCount}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* CV Info */}
                        <div className="px-4 pb-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
                            {savedCV.name}
                          </h3>

                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <MyCVsIcons.CalendarIcon
                                size={14}
                                className="text-gray-500"
                              />
                              <span>{formatDate(savedCV.updatedAt)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <MyCVsIcons.CountIcon
                                size={14}
                                className="text-gray-500"
                              />
                              <span>{getDaysAgo(savedCV.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </div>

            {/* Info Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 backdrop-blur-sm">
              <div className="flex flex-col items-start gap-4">
                <MyCVsIcons.InfoIcon
                  size={32}
                  className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 text-lg">
                    ¿Cómo funciona el sistema de CVs?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
                    <div className="flex items-start gap-2">
                      <MyCVsIcons.ActiveCVIcon
                        size={16}
                        className="mt-0.5 text-green-600 dark:text-green-400"
                      />
                      <div>
                        <strong>Activar:</strong> Carga el CV seleccionado como
                        activo para editar
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MyCVsIcons.DeleteCVIcon
                          size={16}
                          className="mt-0.5 text-red-600 dark:text-red-400"
                        />
                        <div>
                          <strong>Eliminar:</strong> Borra permanentemente la
                          versión guardada
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MyCVsIcons.SavedCVIcon
                          size={16}
                          className="mt-0.5 text-blue-600 dark:text-blue-400"
                        />
                        <div>
                          <strong>Guardar nuevas versiones:</strong> Usa el
                          botón en el editor
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MyCVsIcons.DeliveryIcon
                          size={16}
                          className="mt-0.5 text-purple-600 dark:text-purple-400"
                        />
                        <div>
                          <strong>Entregas:</strong> Contador de veces que has
                          enviado el CV
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};
