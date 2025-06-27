import React from "react";
import { useRouter } from "next/navigation";
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

interface ActiveCVSectionProps {
  activeCV: SavedCV;
}

export const ActiveCVSection: React.FC<ActiveCVSectionProps> = ({
  activeCV,
}) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mb-8">
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
    </div>
  );
};
