import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MyCVsIcons } from "@/components/ui";

export const EmptyState: React.FC = () => {
  const router = useRouter();

  return (
    <Card className="text-center py-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
      <MyCVsIcons.EmptyStateIcon
        size={64}
        className="text-gray-400 dark:text-gray-500 mx-auto mb-6"
      />
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        No tienes CVs guardados
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Comienza creando y guardando tu primer CV desde el editor para gestionar
        múltiples versiones
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
  );
};
