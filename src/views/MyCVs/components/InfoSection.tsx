import React from "react";
import { Card } from "@/components/ui/Card";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const InfoSection: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 backdrop-blur-sm">
      <div className="flex flex-col items-start gap-4">
        <ConfiguredIcon
          name="badge-question-mark"
          size={32}
          className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
        />
        <div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 text-lg">
            ¿Cómo funciona el sistema de CVs?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <ConfiguredIcon
                  name="check-circle"
                  size={16}
                  className="mt-0.5 text-green-600 dark:text-green-400"
                />
                <div>
                  <strong>Activar:</strong> Carga el CV seleccionado como activo
                  para editar
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ConfiguredIcon
                  name="trash"
                  size={16}
                  className="mt-0.5 text-red-600 dark:text-red-400"
                />
                <div>
                  <strong>Eliminar:</strong> Borra permanentemente la versión
                  guardada
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <ConfiguredIcon
                  name="files"
                  size={16}
                  className="mt-0.5 text-blue-600 dark:text-blue-400"
                />
                <div>
                  <strong>Guardar nuevas versiones:</strong> Usa el botón en el
                  editor
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ConfiguredIcon
                  name="send"
                  size={16}
                  className="mt-0.5 text-purple-600 dark:text-purple-400"
                />
                <div>
                  <strong>Entregas:</strong> Contador de veces que has enviado
                  el CV
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
