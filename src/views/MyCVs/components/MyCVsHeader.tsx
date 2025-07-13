import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CreateCVModal } from "@/components/ui";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface MyCVsHeaderProps {
  totalCVs: number;
}

export const MyCVsHeader: React.FC<MyCVsHeaderProps> = ({ totalCVs }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
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
              <ConfiguredIcon
                name="bar-chart"
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalCVs}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  CVs guardados
                </div>
              </div>
            </div>
          </div>

          {/* Botón crear nuevo */}
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <ConfiguredIcon name="plus" size={20} />
              Crear Nuevo CV
            </span>
          </Button>
        </div>
      </div>

      {/* Modal para crear nuevo CV */}
      <CreateCVModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
