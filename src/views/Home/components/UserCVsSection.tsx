import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreateCVModal } from "@/components/ui";
import { HomeIcons } from "@/components/ui";
import { NewCV } from "@/components/ui/icons/NewCV";
import Image from "next/image";
import { getCVById } from "@/lib/actions/cv-actions";
import type { CVData } from "@/types/cv";
import { CVMiniPreview } from "@/views/MyCVs/components/CVMiniPreview";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
  thumbnail?: string | null;
}

interface UserCVsSectionProps {
  savedCVs: SavedCV[];
  onLoadCV: (cvId: string) => Promise<void>;
}

type CarouselItem =
  | { type: "create"; id: string }
  | { type: "cv"; data: SavedCV };

// Caché para datos de CVs
const cvDataCache = new Map<string, { data: CVData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const UserCVsSection: React.FC<UserCVsSectionProps> = ({
  savedCVs,
  onLoadCV,
}) => {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [_activeCVData, setActiveCVData] = useState<CVData | null>(null);
  const [cvDataMap, setCVDataMap] = useState<Record<string, CVData>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Carrusel: paginación de 4 en 4 (incluyendo "Crear Nuevo CV")
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const totalItems = savedCVs.length + 1; // +1 para "Crear Nuevo CV"
  const totalPages = Math.ceil(totalItems / pageSize);

  // Función para obtener datos de CV con caché
  const getCVDataWithCache = useCallback(
    async (cvId: string): Promise<CVData | null> => {
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

  // Cargar CV activo inmediatamente
  useEffect(() => {
    const loadActiveCV = async () => {
      const active = savedCVs.find((cv) => cv.isActive);
      if (active) {
        const cvData = await getCVDataWithCache(active.id);
        setActiveCVData(cvData);
      } else {
        setActiveCVData(null);
      }
      setIsInitialLoad(false);
    };

    if (savedCVs.length > 0) {
      loadActiveCV();
    } else {
      setIsInitialLoad(false);
    }
  }, [savedCVs, getCVDataWithCache]);

  // Cargar datos de CVs progresivamente
  useEffect(() => {
    if (isInitialLoad || savedCVs.length === 0) return;

    const loadCVsProgressively = async () => {
      // Ordenar CVs: activo primero, luego por fecha de actualización
      const sortedCVs = [...savedCVs].sort((a, b) => {
        if (a.isActive) return -1;
        if (b.isActive) return 1;
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });

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
  }, [savedCVs, cvDataMap, loadingStates, getCVDataWithCache, isInitialLoad]);

  if (savedCVs.length === 0) {
    return null;
  }

  // Crear array con todos los items (CVs + "Crear Nuevo CV")
  const allItems: CarouselItem[] = [
    { type: "create", id: "create-new" },
    ...savedCVs.map((cv) => ({ type: "cv" as const, data: cv })),
  ];

  // Obtener items de la página actual
  const pagedItems = allItems.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <>
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <HomeIcons.Folder
                size={36}
                className="text-blue-600 dark:text-blue-400"
              />
              Tus CVs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Gestiona y edita tus curriculums guardados
            </p>
          </div>

          {/* Grid con carrusel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pagedItems.map((item, _index) => {
              if (item.type === "create") {
                return (
                  <div
                    key="create-new"
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-black/20 relative"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <div className="p-6 text-center flex flex-col items-center justify-center h-full">
                      {/* SVG Folio en blanco */}
                      <div className="relative w-32 h-40 mx-auto mb-4 flex items-center justify-center">
                        <NewCV />
                        {/* Icono + solo en hover */}
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <span className="text-3xl text-purple-500 font-bold select-none">
                            +
                          </span>
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Crear Nuevo CV
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Comienza desde cero
                      </p>
                    </div>
                  </div>
                );
              }

              if (item.type !== "cv") return null;
              const cv = (item as { type: "cv"; data: SavedCV }).data;

              const isLoading = loadingStates[cv.id];
              const hasData = cvDataMap[cv.id];

              return (
                <div
                  key={cv.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-black/20 overflow-hidden"
                  onClick={async () => {
                    try {
                      await onLoadCV(cv.id);
                      router.push("/editor");
                    } catch (error) {
                      console.error("Error loading CV:", error);
                    }
                  }}
                >
                  <div className="p-6">
                    {/* CV Preview: muestra miniatura real si existe, si no placeholder */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-4 relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                      {hasData ? (
                        <div className="flex items-center justify-center w-full h-full">
                          <CVMiniPreview cvData={cvDataMap[cv.id]} />
                        </div>
                      ) : cv.thumbnail ? (
                        <Image
                          src={cv.thumbnail}
                          alt={`Miniatura de ${cv.name}`}
                          className="object-contain w-full h-full"
                          draggable={false}
                          loading="lazy"
                          priority
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

                      {/* Overlay con info */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm">
                          Editar CV
                        </span>
                      </div>

                      {/* Badge de CV activo */}
                      {cv.isActive && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="success" className="text-xs">
                            ACTIVO
                          </Badge>
                        </div>
                      )}

                      {/* Indicador de carga sutil */}
                      {isLoading && !hasData && (
                        <div className="absolute bottom-2 right-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>

                    {/* CV Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {cv.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(cv.updatedAt).toLocaleDateString()}
                      </p>
                      {cv.deliveryCount > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                          <HomeIcons.Document size={12} />
                          {cv.deliveryCount} entregas
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carrusel: navegación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                &larr; Anterior
              </Button>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Página {page + 1} de {totalPages}
              </span>
              <Button
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Siguiente &rarr;
              </Button>
            </div>
          )}

          {/* Ver todos los CVs (solo si hay más de 4) */}
          {savedCVs.length > 3 && (
            <div className="text-center mt-8">
              <Button
                onClick={() => router.push("/saved-cvs")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <HomeIcons.Folder size={20} />
                  Ver Todos los CVs ({savedCVs.length})
                </span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal para crear nuevo CV */}
      <CreateCVModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
