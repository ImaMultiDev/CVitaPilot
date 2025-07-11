import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MyCVsIcons } from "@/components/ui";
import { CVMiniPreview } from "./CVMiniPreview";
import { getCVById } from "@/lib/actions/cv-actions";
import Image from "next/image";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
  thumbnail?: string; // Added for thumbnail
}

interface SavedCVsGridProps {
  savedCVs: SavedCV[];
  onLoadCV: (cvId: string, cvName: string) => void;
  onDeleteCV: (cvId: string, cvName: string) => void;
  cvDataMap?: Record<string, import("@/types/cv").CVData>;
}

// Caché para datos de CVs
const cvDataCache = new Map<
  string,
  { data: import("@/types/cv").CVData; timestamp: number }
>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const SavedCVsGrid: React.FC<SavedCVsGridProps> = ({
  savedCVs,
  onLoadCV,
  onDeleteCV,
  cvDataMap: initialCVDataMap = {},
}) => {
  const [cvDataMap, setCVDataMap] = useState(initialCVDataMap);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Carrusel: paginación de 4 en 4
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const inactiveCVs = savedCVs.filter((cv) => !cv.isActive);
  const totalPages = Math.ceil(inactiveCVs.length / pageSize);
  const pagedCVs = inactiveCVs.slice(page * pageSize, (page + 1) * pageSize);

  // Función para obtener datos de CV con caché
  const getCVDataWithCache = useCallback(
    async (cvId: string): Promise<import("@/types/cv").CVData | null> => {
      const now = Date.now();
      const cached = cvDataCache.get(cvId);

      // Si hay caché válido, usarlo
      if (cached && now - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }

      try {
        const data = await getCVById(cvId);
        if (data) {
          cvDataCache.set(cvId, { data, timestamp: now });
        }
        return data;
      } catch (error) {
        console.error(`Error loading CV data for ${cvId}:`, error);
        return null;
      }
    },
    []
  );

  // Cargar datos de CVs progresivamente
  useEffect(() => {
    if (isInitialLoad || inactiveCVs.length === 0) {
      setIsInitialLoad(false);
      return;
    }

    const loadCVsProgressively = async () => {
      // Ordenar CVs por fecha de actualización (más recientes primero)
      const sortedCVs = [...inactiveCVs].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      // Cargar datos progresivamente
      for (const cv of sortedCVs) {
        if (!cvDataMap[cv.id] && !loadingStates[cv.id]) {
          setLoadingStates((prev) => ({ ...prev, [cv.id]: true }));

          const data = await getCVDataWithCache(cv.id);
          if (data) {
            setCVDataMap((prev) => ({ ...prev, [cv.id]: data }));
          }

          setLoadingStates((prev) => ({ ...prev, [cv.id]: false }));

          // Pequeña pausa para no saturar
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    };

    loadCVsProgressively();
  }, [
    inactiveCVs,
    cvDataMap,
    loadingStates,
    getCVDataWithCache,
    isInitialLoad,
  ]);

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

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <MyCVsIcons.SavedCVIcon
          size={24}
          className="text-blue-600 dark:text-blue-400"
        />
        Versiones Guardadas ({inactiveCVs.length})
      </h2>

      {inactiveCVs.length === 0 ? (
        <Card className="text-center py-12 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200/20 dark:border-gray-700/20">
          <MyCVsIcons.SavedCVIcon
            size={48}
            className="text-gray-400 dark:text-gray-500 mx-auto mb-4"
          />
          <div className="text-gray-600 dark:text-gray-400 mb-2">
            No hay versiones adicionales guardadas
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            Guarda nuevas versiones desde el editor usando &ldquo;Guardar
            CV&rdquo;
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 w-4/5 lg:w-full mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pagedCVs.map((savedCV) => {
              const isLoading = loadingStates[savedCV.id];
              const hasData = cvDataMap[savedCV.id];

              return (
                <Card
                  key={savedCV.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 overflow-hidden"
                >
                  {/* CV Preview Miniature */}
                  <div className="flex items-center justify-center aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 mb-4 relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                    {hasData ? (
                      <CVMiniPreview cvData={cvDataMap[savedCV.id]} />
                    ) : savedCV.thumbnail ? (
                      <Image
                        src={savedCV.thumbnail}
                        alt={`Miniatura de ${savedCV.name}`}
                        className="object-contain w-full h-full"
                        draggable={false}
                        loading="lazy"
                        width={32}
                        height={48}
                      />
                    ) : (
                      <div className="p-3 space-y-2 w-full">
                        <div className="h-2 bg-gray-400 dark:bg-gray-500 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        <div className="mt-3 space-y-1">
                          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
                        </div>
                      </div>
                    )}

                    {/* Indicador de carga sutil */}
                    {isLoading && !hasData && (
                      <div className="absolute bottom-2 right-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

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
                  {/* Botones de acción */}
                  <div className="flex justify-between items-center px-2 pb-4">
                    <Button
                      size="sm"
                      onClick={() => onLoadCV(savedCV.id, savedCV.name)}
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
                      onClick={() => onDeleteCV(savedCV.id, savedCV.name)}
                      className="shadow-lg"
                    >
                      <span className="flex items-center gap-1">
                        <MyCVsIcons.DeleteCVIcon size={14} />
                        Eliminar
                      </span>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          {/* Carrusel: navegación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                &larr; Anterior
              </Button>
              <span className="text-gray-700 dark:text-gray-300">
                Página {page + 1} de {totalPages}
              </span>
              <Button
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
              >
                Siguiente &rarr;
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
