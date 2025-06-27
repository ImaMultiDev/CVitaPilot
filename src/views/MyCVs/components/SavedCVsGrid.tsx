import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MyCVsIcons } from "@/components/ui";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

interface SavedCVsGridProps {
  savedCVs: SavedCV[];
  onLoadCV: (cvId: string, cvName: string) => void;
  onDeleteCV: (cvId: string, cvName: string) => void;
}

export const SavedCVsGrid: React.FC<SavedCVsGridProps> = ({
  savedCVs,
  onLoadCV,
  onDeleteCV,
}) => {
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

  const inactiveCVs = savedCVs.filter((cv) => !cv.isActive);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inactiveCVs
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
                          onLoadCV(savedCV.id, savedCV.name);
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
                          onDeleteCV(savedCV.id, savedCV.name);
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
  );
};
