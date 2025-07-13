import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CreateCVModal } from "@/components/ui";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const EmptyState: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Card className="text-center py-16 bg-white dark:bg-gray-800 backdrop-blur-sm border-white/20 dark:border-gray-700">
        <ConfiguredIcon
          name="folder-open"
          size={64}
          className="text-gray-400 dark:text-gray-500 mx-auto mb-6"
        />
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          No tienes CVs guardados
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Comienza creando tu primer CV desde cero para gestionar múltiples
          versiones adaptadas a diferentes empresas
        </p>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <ConfiguredIcon name="plus" size={20} />
            Crear Nuevo CV
          </span>
        </Button>
      </Card>

      {/* Modal para crear nuevo CV */}
      <CreateCVModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
