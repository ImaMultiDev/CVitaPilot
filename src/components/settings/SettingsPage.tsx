// src/components/settings/SettingsPage.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

export const SettingsPage: React.FC = () => {
  const { state, dispatch } = useCV();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleExportData = () => {
    const dataToExport = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      currentCV: state.currentCV,
      savedCVs: state.savedCVs,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cv-manager-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();

    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        if (importedData.currentCV) {
          // Aquí podrías añadir validación de datos
          confirm(
            "¿Deseas importar estos datos? Esto sobrescribirá tu información actual."
          ) && alert("Funcionalidad de importación en desarrollo");
        }
      } catch (error) {
        alert(
          "Error al importar el archivo. Asegúrate de que sea un archivo válido."
        );
      }
    };
    reader.readAsText(file);
    setIsImportModalOpen(false);
  };

  const handleResetData = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer."
      )
    ) {
      dispatch({ type: "RESET_CV" });
      alert("Datos reseteados correctamente");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">
          Gestiona tus datos y configuración de la aplicación
        </p>
      </div>

      {/* App Statistics */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Estadísticas de la Aplicación
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {state.savedCVs.length}
            </div>
            <div className="text-sm text-gray-600">CVs Guardados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {state.currentCV.skills.filter((s) => s.selected).length}
            </div>
            <div className="text-sm text-gray-600">Habilidades Activas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {state.currentCV.experiences.filter((e) => e.selected).length}
            </div>
            <div className="text-sm text-gray-600">Experiencias Activas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {state.savedCVs.reduce(
                (acc, cv) => acc + cv.deliveries.length,
                0
              )}
            </div>
            <div className="text-sm text-gray-600">Total Entregas</div>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Gestión de Datos
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Exportar Datos</h4>
              <p className="text-sm text-gray-600">
                Descarga una copia de seguridad de todos tus CVs y configuración
              </p>
            </div>
            <Button onClick={() => setIsExportModalOpen(true)}>
              📤 Exportar
            </Button>
          </div>

          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Importar Datos</h4>
              <p className="text-sm text-gray-600">
                Restaura una copia de seguridad desde un archivo
              </p>
            </div>
            <Button
              onClick={() => setIsImportModalOpen(true)}
              variant="secondary"
            >
              📥 Importar
            </Button>
          </div>

          <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Resetear Datos</h4>
              <p className="text-sm text-red-600">
                Elimina todos los datos y vuelve a la configuración inicial
              </p>
            </div>
            <Button onClick={handleResetData} variant="danger">
              🗑️ Resetear
            </Button>
          </div>
        </div>
      </Card>

      {/* App Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información de la Aplicación
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Versión</span>
            <Badge variant="info">1.0.0</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tecnologías</span>
            <div className="flex space-x-2">
              <Badge variant="default" size="sm">
                Next.js 15
              </Badge>
              <Badge variant="default" size="sm">
                React 19
              </Badge>
              <Badge variant="default" size="sm">
                Tailwind v4
              </Badge>
              <Badge variant="default" size="sm">
                TypeScript
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Desarrollador</span>
            <span className="text-gray-900 font-medium">
              Imanol Mugueta Unsain
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Repositorio</span>
            <a
              href="https://github.com/kodebidean"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </Card>

      {/* Tips and Help */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Consejos de Uso
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">💡</span>
            <span>
              Usa el sidebar para activar/desactivar rápidamente habilidades y
              experiencias según el puesto al que apliques.
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600">💡</span>
            <span>
              Guarda diferentes versiones de tu CV para distintos tipos de
              empresa (startup, corporativa, freelance, etc.).
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600">💡</span>
            <span>
              Registra todas las entregas para hacer seguimiento de tu búsqueda
              de empleo y analizar qué funciona mejor.
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600">💡</span>
            <span>
              Usa las tecnologías específicas en cada experiencia para mostrar
              tu stack técnico por proyecto.
            </span>
          </div>
        </div>
      </Card>

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Exportar Datos"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Se descargará un archivo JSON con todos tus CVs guardados,
            experiencias, habilidades y configuración.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">¿Qué se incluye?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• CV actual y todos los CVs guardados</li>
              <li>• Historial completo de entregas</li>
              <li>• Configuración de habilidades y competencias</li>
              <li>• Información personal y experiencias</li>
            </ul>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsExportModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleExportData}>📤 Descargar</Button>
          </div>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Importar Datos"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Selecciona un archivo de backup previamente exportado para restaurar
            tus datos.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">⚠️ Importante</h4>
            <p className="text-sm text-yellow-800">
              Esta acción sobrescribirá todos tus datos actuales. Asegúrate de
              tener una copia de seguridad antes de continuar.
            </p>
          </div>
          <input
            type="file"
            accept=".json"
            onChange={handleImportData}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsImportModalOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
