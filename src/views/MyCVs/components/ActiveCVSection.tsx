import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MyCVsIcons } from "@/components/ui";
import { CVMiniPreview } from "./CVMiniPreview";
import { getCVById } from "@/lib/actions/cv-actions";
import type { CVData } from "@/types/cv";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

interface ActiveCVSectionProps {
  activeCV: SavedCV;
  activeCVData?: CVData | null;
}

// Caché para datos de CVs
const cvDataCache = new Map<string, { data: CVData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const ActiveCVSection: React.FC<ActiveCVSectionProps> = ({
  activeCV,
  activeCVData: initialActiveCVData,
}) => {
  const router = useRouter();
  const [activeCVData, setActiveCVData] = useState<CVData | null>(
    initialActiveCVData || null
  );
  const [isLoading, setIsLoading] = useState(!initialActiveCVData);

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

  // Cargar datos del CV activo si no están disponibles
  useEffect(() => {
    const loadActiveCVData = async () => {
      if (!activeCVData && activeCV) {
        setIsLoading(true);
        const data = await getCVDataWithCache(activeCV.id);
        setActiveCVData(data);
        setIsLoading(false);
      }
    };

    loadActiveCVData();
  }, [activeCV, activeCVData, getCVDataWithCache]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mb-8 lg:w-1/2">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
        <MyCVsIcons.ActiveCVIcon
          size={24}
          className="text-yellow-600 dark:text-yellow-400"
        />
        CV Activo Actualmente
      </h2>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex items-start gap-4">
            {/* CV Preview Miniature */}
            <div className="hidden sm:block">
              {activeCVData ? (
                <CVMiniPreview cvData={activeCVData} />
              ) : isLoading ? (
                <div className="w-32 h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="w-32 h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="p-3 space-y-2 w-full">
                    <div className="h-2 bg-gray-400 dark:bg-gray-500 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-between w-full h-full">
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
              <div className="flex flex-col mt-10 sm:flex-row gap-3 justify-end w-full h-full">
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
          </div>
        </div>
      </Card>
    </div>
  );
};
